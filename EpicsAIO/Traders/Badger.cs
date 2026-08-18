using System.Reflection;
using JetBrains.Annotations;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Spt.Config;
using SPTarkov.Server.Core.Routers;
using SPTarkov.Server.Core.Utils;
using Path = System.IO.Path;

namespace EpicsAIO.Traders;

[Injectable(TypePriority = OnLoadOrder.Preload + 2), UsedImplicitly]
public class Badger(
    ModHelper modHelper,
    ImageRouter imageRouter,
    TraderConfig traderConfig,
    RagfairConfig ragfairConfig,
    TimeUtil timeUtil,
    EpicTraderHelper epicTraderHelper
) : IOnLoad
{
    public Task OnLoadAsync(CancellationToken cancellationToken)
    {
        var pathToMod = modHelper.GetAbsolutePathToModFolder(Assembly.GetExecutingAssembly());
        var traderImagePath = Path.Combine(pathToMod, "res/badger.png");
        var traderBase = modHelper.GetJsonDataFromFile<TraderBase>(pathToMod, "db/TraderBadger/Base.json");
        
        imageRouter.AddRoute(traderBase.Avatar!.Replace(".png", ""), traderImagePath);
        EpicTraderHelper.SetTraderUpdateTime(traderConfig, traderBase, timeUtil.GetHoursAsSeconds(1), timeUtil.GetHoursAsSeconds(2));

        ragfairConfig.Traders.TryAdd(traderBase.Id, true);
        
        epicTraderHelper.AddTraderWithEmptyAssortToDb(traderBase);
        
        var assort = modHelper.GetJsonDataFromFile<TraderAssort>(pathToMod, "db/TraderBadger/Assort.json");
        epicTraderHelper.OverwriteTraderAssort(traderBase.Id, assort);
        
        return Task.CompletedTask;
    }
}