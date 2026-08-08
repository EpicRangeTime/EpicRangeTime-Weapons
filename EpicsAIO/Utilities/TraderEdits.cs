using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Models.Spt.Tables;

namespace EpicsAIO.Utilities;

[Injectable(TypePriority = OnLoadOrder.TraderRegistration - 1)]
public class TraderEdits(TradersTable tradersTable) : IOnLoad
{
    public Task OnLoadAsync(CancellationToken cancellationToken)
    {
        foreach (var item in tradersTable.Values.Select(trader => trader.Assort).Select(assort => assort.Items).SelectMany(items => items.Where(item => item.Template == ItemTpl.IRONSIGHT_AR15_REAR_SIGHT_CARRY_HANDLE && item.SlotId == "mod_sight_rear")))
        {
            item.SlotId = "mod_scope";
        }
        return Task.CompletedTask;
    }
}
