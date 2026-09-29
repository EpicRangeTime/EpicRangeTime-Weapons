using System.Reflection;
using HarmonyLib;
using JetBrains.Annotations;
using SPTarkov.Common.Models.Logging;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Generators.Ragfair;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Spt.Tables;

namespace EpicsAIO.Edits;

[Injectable(TypePriority = OnLoadOrder.Preload + 4), UsedImplicitly]
public class ForceFleaPresetGeneration(
    GlobalTable globalTable,
    ISptLogger<ForceFleaPresetGeneration> logger) : IOnLoad
{
    // Add PRESET IDs here, not the root item's template ID.
    // Use the preset's "_id" from db/CustomWeaponPresets/*.json.
    // Register each preset before this service runs (currently Preload + 4).
    private static readonly MongoId[] PresetIdsToInclude =
    [
        "6aab86e593a534505900000c", // ROMEO9t Black
        "6aab874593a5345059000010", // ROMEO9t FDE
        // Add more registered preset IDs above this line.
    ];

    private const string HarmonyId = "EpicsAIO.ForcedFleaPresets";
    private static List<Preset> _additionalPresets = [];

    public Task OnLoadAsync(CancellationToken cancellationToken)
    {
        // WTT registers the mod's presets at Preload + 3.
        _additionalPresets = [];
        foreach (var id in PresetIdsToInclude.Distinct())
        {
            if (globalTable.ItemPresets.TryGetValue(id, out var preset)
                && preset.Items.Count > 0)
            {
                _additionalPresets.Add(preset);
            }
            else
            {
                logger.Warning($"[EpicsAIO] Requested flea preset {id} is missing or empty; skipping it.");
            }
        }

        var target = AccessTools.DeclaredMethod(typeof(RagfairAssortGenerator), "GetPresetsToAdd")
            ?? throw new MissingMethodException(typeof(RagfairAssortGenerator).FullName, "GetPresetsToAdd");

        if (Harmony.GetPatchInfo(target)?.Owners.Contains(HarmonyId) != true)
        {
            var postfix = typeof(ForceFleaPresetGeneration).GetMethod(
                nameof(AddRequestedPresets), BindingFlags.Static | BindingFlags.NonPublic)!;
            new Harmony(HarmonyId).Patch(target, postfix: new HarmonyMethod(postfix));
        }

        return Task.CompletedTask;
    }

    private static void AddRequestedPresets(ref List<Preset> __result)
    {
        // Keep SPT/other mods' choices and avoid duplicates when all presets are enabled.
        var existingIds = __result.Select(preset => preset.Id).ToHashSet();
        __result = __result.Concat(_additionalPresets.Where(preset => existingIds.Add(preset.Id))).ToList();
    }
}