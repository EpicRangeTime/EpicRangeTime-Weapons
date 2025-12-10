using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Servers;

namespace EpicsAIO.Utilities;

[Injectable(TypePriority = OnLoadOrder.PostDBModLoader + 4)]
public class BaseGameTraderEdits(DatabaseServer databaseServer) : IOnLoad
{
    public Task OnLoad()
    {
        var traders = databaseServer.GetTables().Traders;
        var peacekeeper = traders[new MongoId("5935c25fb3acc3127c3d8cd9")];
        var assort = peacekeeper.Assort;
        var items = assort.Items;
        foreach (var item in items.Where(item => item.Template == ItemTpl.IRONSIGHT_AR15_REAR_SIGHT_CARRY_HANDLE && item.SlotId == "mod_sight_rear"))
        {
            item.SlotId = "mod_scope";
        }
        return Task.CompletedTask;
    }
}