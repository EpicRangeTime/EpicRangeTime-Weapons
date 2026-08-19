using JetBrains.Annotations;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Spt.Tables;

namespace EpicsAIO.Edits;

[Injectable(TypePriority = OnLoadOrder.Preload + 6), UsedImplicitly]
public class BaseGameProfileEdits(TemplateTable templateTable) : IOnLoad
{
    public Task OnLoadAsync(CancellationToken cancellationToken)
    {
        var profileTypes = templateTable.Profiles;
        foreach (var profileType in profileTypes)
        {
            var side = profileType.Value;
            var bear = side.Bear;
            var usec = side.Usec;
            if (usec?.Character?.Inventory?.Items == null ||
                bear?.Character?.Inventory?.Items == null)
            {
                return Task.CompletedTask;
            }

            foreach (var inventoryItem in usec.Character.Inventory.Items)
            {
                if (inventoryItem.Template == "5ae30bad5acfc400185c2dc4" && inventoryItem.SlotId == "mod_sight_rear")
                {
                    inventoryItem.SlotId = "mod_scope";
                }
            }
            
            // This is probably completely unnecessary but im keeping it just in case lol
            foreach (var inventoryItem in bear.Character.Inventory.Items)
            {
                if (inventoryItem.Template == "5ae30bad5acfc400185c2dc4" && inventoryItem.SlotId == "mod_sight_rear")
                {
                    inventoryItem.SlotId = "mod_scope";
                }
            }
        }
        return Task.CompletedTask;
    }
}