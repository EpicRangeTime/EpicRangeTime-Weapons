using JetBrains.Annotations;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Models.Spt.Tables;

namespace EpicsAIO.Traders;

[Injectable(TypePriority = OnLoadOrder.TraderRegistration - 1), UsedImplicitly]
public class TraderEdits(TradersTable tradersTable) : IOnLoad
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
        
        return Task.CompletedTask;
    }
}