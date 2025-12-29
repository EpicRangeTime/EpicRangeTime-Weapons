using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Servers;

namespace EpicsAIO.Utilities;

[Injectable(TypePriority = OnLoadOrder.PostDBModLoader + 4)]
public class BaseGameGlobalsEdits(DatabaseServer databaseServer) : IOnLoad
{
    public Task OnLoad()
    {
        var globals = databaseServer.GetTables().Globals;
        var itemPresets = globals.ItemPresets;
        if (!itemPresets.TryGetValue(new MongoId("5af08cf886f774223c269184"), out var preset)) return Task.CompletedTask;
        foreach (var item in preset.Items.Where(item => item.SlotId == "mod_sight_rear" && item.Template == ItemTpl.IRONSIGHT_AR15_REAR_SIGHT_CARRY_HANDLE))
        {
            item.SlotId = "mod_scope";
        }
        return Task.CompletedTask;
    }
}