using JetBrains.Annotations;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Models.Spt.Tables;

namespace EpicsAIO.Edits;

[Injectable(TypePriority = OnLoadOrder.Preload + 5), UsedImplicitly]
public class BaseGameGlobalsEdits(GlobalTable globalTable) : IOnLoad
{
    private readonly MongoId _m4Preset = new("5af08cf886f774223c269184");
    
    public Task OnLoadAsync(CancellationToken cancellationToken)
    {
        var presets = globalTable.ItemPresets;
        if (!presets.TryGetValue(_m4Preset, out var preset)) { return Task.CompletedTask; }

        foreach (var item in preset.Items)
        {
            if (item.SlotId == "mod_sight_rear" && item.Template == ItemTpl.IRONSIGHT_AR15_REAR_SIGHT_CARRY_HANDLE)
            {
                item.SlotId = "mod_scope";
            }
        }
        return Task.CompletedTask;
    }
}