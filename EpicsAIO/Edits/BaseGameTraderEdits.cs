using JetBrains.Annotations;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Models.Spt.Tables;

namespace EpicsAIO.Edits;

[Injectable(TypePriority = OnLoadOrder.TraderRegistration - 1), UsedImplicitly]
public class BaseGameTraderEdits(TradersTable tradersTable) : IOnLoad
{
    public Task OnLoadAsync(CancellationToken cancellationToken)
    {
        foreach (var trader in tradersTable.Values)
        {
            foreach (var item in trader.Assort.Items)
            {
                if (item.Template != ItemTpl.IRONSIGHT_AR15_REAR_SIGHT_CARRY_HANDLE) { continue; }

                if (item.SlotId != "mod_sight_rear") { continue; }

                item.SlotId = "mod_scope";
            }
        }
        
        RemoveUnwantedTraderOffers();
        
        return Task.CompletedTask;
    }

    private void RemoveTraderOffersContaining(MongoId templateId)
    {
        foreach (var trader in tradersTable.Values)
        {
            var assort = trader.Assort;
            if (assort?.Items is null) continue;

            var byId = assort.Items.ToDictionary(item => item.Id.ToString());
            var removeIds = new HashSet<string>();

            // Find the complete offer containing the unwanted item.
            // This also catches it installed on a weapon sold by the trader.
            foreach (var item in assort.Items.Where(item => item.Template == templateId))
            {
                var root = item;

                while (root.ParentId is not null
                       && byId.TryGetValue(root.ParentId, out var parent))
                {
                    root = parent;
                }

                removeIds.Add(root.Id.ToString());
            }

            // Include every attachment/container child of those offers.
            bool changed;
            do
            {
                changed = false;

                foreach (var item in assort.Items)
                {
                    if (item.ParentId is not null
                        && removeIds.Contains(item.ParentId))
                    {
                        changed |= removeIds.Add(item.Id.ToString());
                    }
                }
            } while (changed);

            var removedItems = assort.Items
                .Where(item => removeIds.Contains(item.Id.ToString()))
                .ToArray();

            foreach (var item in removedItems)
            {
                assort.BarterScheme.Remove(item.Id);
                assort.LoyalLevelItems.Remove(item.Id);

                // Remove any quest-unlock association for the deleted offer.
                if (trader.QuestAssort is not null)
                {
                    foreach (var questOffers in trader.QuestAssort.Values)
                        questOffers.Remove(item.Id);
                }
            }

            assort.Items.RemoveAll(item => removeIds.Contains(item.Id.ToString()));
        }
    }

    private void RemoveUnwantedTraderOffers()
    {
        // Add one call per item template ID you want removed from trader offers.
        RemoveTraderOffersContaining(new MongoId("5c7d55f52e221644f31bff6a"));
    }
}
