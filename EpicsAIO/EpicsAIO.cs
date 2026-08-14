using System.Reflection;
using JetBrains.Annotations;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;

namespace EpicsAIO;

[Injectable(TypePriority = OnLoadOrder.Preload + 3), UsedImplicitly]
public class EpicsAIO(WTTServerCommonLib.WTTServerCommonLib wttServerCommonLib) : IOnLoad
{
    public async Task OnLoadAsync(CancellationToken cancellationToken)
    {
        var assembly = Assembly.GetExecutingAssembly();
        await wttServerCommonLib.CustomItemServiceExtended.CreateCustomItems(assembly);
        await wttServerCommonLib.CustomQuestService.CreateCustomQuests(assembly);
        await wttServerCommonLib.CustomQuestZoneService.CreateCustomQuestZones(assembly);
        await wttServerCommonLib.CustomLocaleService.CreateCustomLocales(assembly);
        await wttServerCommonLib.CustomAssortSchemeService.CreateCustomAssortSchemes(assembly);
    }
}