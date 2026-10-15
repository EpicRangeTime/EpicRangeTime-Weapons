using JetBrains.Annotations;
using SPTarkov.Common.Models.Logging;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common;
using SPTarkov.Server.Core.Models.Spt.Config;
using SPTarkov.Server.Core.Models.Spt.Tables;
using SPTarkov.Server.Core.Services.Items;

namespace EpicsAIO.Edits;

[Injectable(TypePriority = OnLoadOrder.TraderRegistration - 2), UsedImplicitly]
public class BaseGameLootEdits(
    GlobalTable globalTable,
    TemplateTable templateTable,
    ISptLogger<BaseGameLootEdits> logger,
    ItemConfig itemConfig,
    ItemFilterService itemFilterService,
    LocationTable locationTable,
    BotTable botTable,
    PmcConfig pmcConfig,
    AirdropConfig airdropConfig,
    InventoryConfig inventoryConfig) : IOnLoad
{
    public Task OnLoadAsync(CancellationToken cancellationToken)
    {
        if (RemovedLootTemplateIds.Count == 0) return Task.CompletedTask;

        // Update both configuration and the service's caches, which may already exist.
        itemConfig.Blacklist.UnionWith(RemovedLootTemplateIds);
        itemConfig.LootableItemBlacklist.UnionWith(RemovedLootTemplateIds);
        itemFilterService.AddItemToBlacklistCache(RemovedLootTemplateIds);
        itemFilterService.AddItemToLootableBlacklistCache(RemovedLootTemplateIds);

        RemoveOptionalPresetBranches();
        RemoveMapLoot();
        RemoveBotLootAndEquipment();
        RemoveGeneratedLoot();
        return Task.CompletedTask;
    }

    private void RemoveOptionalPresetBranches()
    {
        // Generated weapons can clone presets without checking every attachment.
        // Remove a blocked part through an optional ancestor slot, preserving a usable gun.
        foreach (var preset in globalTable.ItemPresets.Values)
        {
            var items = preset.Items;
            if (items is null) continue;
            var byId = items.GroupBy(item => item.Id.ToString())
                .ToDictionary(group => group.Key, group => group.First());
            var removedIds = new HashSet<string>();
            foreach (var item in items.Where(item => RemovedLootTemplateIds.Contains(item.Template)))
            {
                var branch = item;
                bool optionalBranchFound = false;
                var visited = new HashSet<string>();
                while (visited.Add(branch.Id.ToString()) && branch.ParentId is not null
                    && byId.TryGetValue(branch.ParentId, out var parent))
                {
                    var optional = templateTable.Items.TryGetValue(parent.Template, out var parentTemplate)
                        && parentTemplate.Properties?.Slots?
                            .FirstOrDefault(slot => slot.Name == branch.SlotId)?.Required == false;
                    if (optional)
                    {
                        removedIds.Add(branch.Id.ToString());
                        optionalBranchFound = true;
                        break;
                    }
                    branch = parent;
                }

                // A blocked root is already excluded by the global loot blacklist.
                // Required components need an explicit replacement, not a broken preset.
                if (!optionalBranchFound && item.ParentId is not null)
                    logger.Warning("[EpicsAIO] A loot-blacklisted component cannot be removed safely from preset "
                        + preset.Id + "; replace its required component manually: " + item.Template);
            }

            bool changed;
            do
            {
                changed = false;
                foreach (var item in items)
                    if (item.ParentId is not null && removedIds.Contains(item.ParentId))
                        changed |= removedIds.Add(item.Id.ToString());
            } while (changed);
            items.RemoveAll(item => removedIds.Contains(item.Id.ToString()));
        }
    }
    private void RemoveMapLoot()
    {
        foreach (var location in locationTable.GetDictionary().Values)
        {
            if (location is null) continue;

            // Transform each table when SPT reads it; do not eagerly load every map.
            location.LooseLoot?.AddTransformer(loot =>
            {
                if (loot is null) return loot;
                loot.Spawnpoints = FilterSpawnpoints(loot.Spawnpoints);
                loot.SpawnpointsForced = FilterSpawnpoints(loot.SpawnpointsForced);
                return loot;
            });

            location.StaticLoot?.AddTransformer(pools =>
            {
                if (pools is null) return pools;
                foreach (var pool in pools.Values)
                {
                    if (pool.ItemDistribution is not null)
                        pool.ItemDistribution = pool.ItemDistribution
                            .Where(item => !RemovedLootTemplateIds.Contains(item.Tpl)).ToArray();
                }
                return pools;
            });

            location.StaticContainers?.AddTransformer(containers =>
            {
                if (containers is null) return containers;
                if (containers.StaticForced is not null)
                    containers.StaticForced = containers.StaticForced
                        .Where(item => !RemovedLootTemplateIds.Contains(item.ItemTpl)).ToArray();
                if (containers.StaticWeapons is not null)
                    containers.StaticWeapons = containers.StaticWeapons
                        .Where(weapon => weapon.Items is null
                            || !weapon.Items.Any(item => RemovedLootTemplateIds.Contains(item.Template)))
                        .ToArray();
                return containers;
            });

            if (location.StaticAmmo is null) continue;
            foreach (var caliber in location.StaticAmmo.Keys.ToArray())
                location.StaticAmmo[caliber] = location.StaticAmmo[caliber]
                    .Where(ammo => !ammo.Tpl.HasValue
                        || !RemovedLootTemplateIds.Contains(ammo.Tpl.Value)).ToArray();
        }
    }

    private static Spawnpoint[] FilterSpawnpoints(IEnumerable<Spawnpoint>? spawnpoints)
    {
        if (spawnpoints is null) return [];
        return spawnpoints.Where(RemoveBlockedOptions).ToArray();
    }

    private static bool RemoveBlockedOptions(Spawnpoint spawnpoint)
    {
        var template = spawnpoint.Template;
        if (template?.Items is null) return true;
        var items = template.Items.ToArray();
        if (!items.Any(item => RemovedLootTemplateIds.Contains(item.Template))) return true;

        var byId = items.GroupBy(item => item.Id.ToString())
            .ToDictionary(group => group.Key, group => group.First());
        var removedRoots = new HashSet<string>();
        foreach (var item in items.Where(item => RemovedLootTemplateIds.Contains(item.Template)))
        {
            var root = item;
            var visited = new HashSet<string>();
            while (visited.Add(root.Id.ToString()) && root.ParentId is not null
                && byId.TryGetValue(root.ParentId, out var parent))
                root = parent;
            removedRoots.Add(root.Id.ToString());
        }

        // Remove the complete weapon/item option including child items
        var removedIds = new HashSet<string>(removedRoots);
        bool changed;
        do
        {
            changed = false;
            foreach (var item in items)
                if (item.ParentId is not null && removedIds.Contains(item.ParentId))
                    changed |= removedIds.Add(item.Id.ToString());
        } while (changed);

        var remaining = items.Where(item => !removedIds.Contains(item.Id.ToString())).ToArray();
        if (remaining.Length == 0) return false;

        var removedKeys = items.Where(item => removedRoots.Contains(item.Id.ToString())
                && !string.IsNullOrEmpty(item.ComposedKey))
            .Select(item => item.ComposedKey).ToHashSet();
        if (spawnpoint.ItemDistribution is not null && removedKeys.Count > 0)
        {
            spawnpoint.ItemDistribution = spawnpoint.ItemDistribution
                .Where(option => option.ComposedKey is null
                    || !removedKeys.Contains(option.ComposedKey.Key)).ToArray();
            if (!spawnpoint.ItemDistribution.Any()) return false;
        }

        template.Items = remaining;
        if (template.Root is not null && removedIds.Contains(template.Root))
            template.Root = (remaining.FirstOrDefault(item => string.IsNullOrEmpty(item.ParentId)
                || !byId.ContainsKey(item.ParentId)) ?? remaining[0]).Id.ToString();
        return true;
    }

    private void RemoveBotLootAndEquipment()
    {
        foreach (var bot in botTable.Types.Values)
        {
            var inventory = bot?.BotInventory;
            if (inventory is null) continue;
            foreach (var id in RemovedLootTemplateIds)
            {
                if (inventory.Equipment is not null)
                    foreach (var pool in inventory.Equipment.Values) pool.Remove(id);
                if (inventory.Ammo is not null)
                    foreach (var pool in inventory.Ammo.Values) pool.Remove(id);

                inventory.Items?.Backpack?.Remove(id);
                inventory.Items?.Pockets?.Remove(id);
                inventory.Items?.TacticalVest?.Remove(id);
                inventory.Items?.SecuredContainer?.Remove(id);
                inventory.Items?.SpecialLoot?.Remove(id);

                if (inventory.Mods is null) continue;
                inventory.Mods.Remove(id);
                foreach (var slots in inventory.Mods.Values)
                    foreach (var pool in slots.Values) pool.Remove(id);
            }
        }
    }

    private void RemoveGeneratedLoot()
    {
        pmcConfig.VestLoot.Blacklist.UnionWith(RemovedLootTemplateIds);
        pmcConfig.PocketLoot.Blacklist.UnionWith(RemovedLootTemplateIds);
        pmcConfig.BackpackLoot.Blacklist.UnionWith(RemovedLootTemplateIds);
        foreach (var id in RemovedLootTemplateIds)
        {
            if (!pmcConfig.GlobalLootBlacklist.Contains(id)) pmcConfig.GlobalLootBlacklist.Add(id);
            foreach (var loot in airdropConfig.Loot.Values)
            {
                if (!loot.ItemBlacklist.Contains(id)) loot.ItemBlacklist.Add(id);
                loot.ForcedLoot?.Remove(id);
            }
            foreach (var container in inventoryConfig.RandomLootContainers.Values)
                container.RewardTplPool?.Remove(id);
            inventoryConfig.SealedAirdropContainer.WeaponRewardWeight?.Remove(id);
        }
    }

    // Add more item template IDs here, one per line.
    private static readonly HashSet<MongoId> RemovedLootTemplateIds =
    [
        new("5c7d55f52e221644f31bff6a"), // Aimpoint LRP mount
    ];
}