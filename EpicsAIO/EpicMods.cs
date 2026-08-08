using System.Reflection;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Spt.Mod;
using Range = SemanticVersioning.Range;
using Version = SemanticVersioning.Version;

namespace EpicsAIO;

public class ModMetadata : IModMetadata
{
    public string ModGuid { get; init; } = "com.epicrangetime.aio";
    public string Name { get; init; } = "Epics All in One";
    public string Author { get; init; } = "EpicRangeTime";
    public List<string>? Contributors { get; init; }
    public Version Version { get; init; } = new(typeof(ModMetadata).Assembly.GetName().Version!.ToString(3));
    public Range SptVersion { get; init; } = new("~4.1.0");
    public bool HasPrepatcher { get; init; } = false;
    public List<string>? Incompatibilities { get; init; }
    public Dictionary<string, Range>? ModDependencies { get; init; } = new()
    {
        { "com.wtt.commonlib", new Range("~3.0.0") }
    };
    public string? Url { get; init; } = "https://github.com/EpicRangeTime/EpicRangeTime-Weapons";
    public string License { get; init; } = "CC-BY-NC-ND 4.0";
}

[Injectable(TypePriority = OnLoadOrder.PostLoad + 2)]
public class EpicRangeTimeWeapons(
    WTTServerCommonLib.WTTServerCommonLib wttCommon) : IOnLoad
{
    public async Task OnLoadAsync(CancellationToken cancellationToken)
    {
        Assembly assembly = Assembly.GetExecutingAssembly();
        await wttCommon.CustomItemServiceExtended.CreateCustomItems(assembly);
        await wttCommon.CustomQuestService.CreateCustomQuests(assembly);
        await wttCommon.CustomQuestZoneService.CreateCustomQuestZones(assembly);
        await wttCommon.CustomLocaleService.CreateCustomLocales(assembly);
    }
}
