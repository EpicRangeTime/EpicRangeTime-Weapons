using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Models.Spt.Tables;

namespace EpicsAIO.Utilities;

[Injectable(TypePriority = OnLoadOrder.PostLoad + 4)]
public class BaseGameGlobalsEdits(GlobalTable globalTable) : IOnLoad
{
    public Task OnLoadAsync(CancellationToken cancellationToken)
    {
        var itemPresets = globalTable.ItemPresets;
        if (!itemPresets.TryGetValue(new MongoId("5af08cf886f774223c269184"), out var preset)) return Task.CompletedTask;
        foreach (var item in preset.Items.Where(item => item.SlotId == "mod_sight_rear" && item.Template == ItemTpl.IRONSIGHT_AR15_REAR_SIGHT_CARRY_HANDLE))
        {
            item.SlotId = "mod_scope";
        }
        return Task.CompletedTask;
    }
}
