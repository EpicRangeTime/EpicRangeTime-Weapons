using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Servers;

namespace EpicsAIO.Utilities;

[Injectable(TypePriority = OnLoadOrder.TraderRegistration - 1)]
public class TraderEdits(DatabaseServer databaseServer) : IOnLoad
{
    public Task OnLoad()
    {
        var traders = databaseServer.GetTables().Traders;
        foreach (var item in traders.Values.Select(trader => trader.Assort).Select(assort => assort.Items).SelectMany(items => items.Where(item => item.Template == ItemTpl.IRONSIGHT_AR15_REAR_SIGHT_CARRY_HANDLE && item.SlotId == "mod_sight_rear")))
        {
            item.SlotId = "mod_scope";
        }
        return Task.CompletedTask;
    }
}