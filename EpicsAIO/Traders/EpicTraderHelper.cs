using JetBrains.Annotations;
using SPTarkov.Common.Models.Logging;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Spt.Config;
using SPTarkov.Server.Core.Models.Spt.Tables;
using SPTarkov.Server.Core.Utils.Cloners;

namespace EpicsAIO.Traders;

[Injectable(TypePriority = OnLoadOrder.Preload + 1), UsedImplicitly]
public class EpicTraderHelper(
    ISptLogger<EpicTraderHelper> logger,
    ICloner cloner,
    LocaleTable localeTable,
    TradersTable tradersTable)
{
    public static void SetTraderUpdateTime(TraderConfig traderConfig, TraderBase baseJson, int refreshTimeSecondsMin, int refreshTimeSecondsMax)
    {
        var traderRefreshRecord = new UpdateTime
        {
            TraderId = baseJson.Id,
            Seconds = new MinMax<int>(refreshTimeSecondsMin, refreshTimeSecondsMax)
        };

        traderConfig.UpdateTime.Add(traderRefreshRecord);
    }

    public void AddTraderWithEmptyAssortToDb(TraderBase traderDetailsToAdd)
    {
        var emptyTraderItemAssortObject = new TraderAssort
        {
            Items = [],
            BarterScheme = new Dictionary<MongoId, List<List<BarterScheme>>>(),
            LoyalLevelItems = new Dictionary<MongoId, int>()
        };

        var traderDataToAdd = new Trader
        {
            Assort = emptyTraderItemAssortObject,
            Base = cloner.Clone(traderDetailsToAdd)!,
            QuestAssort = new Dictionary<string, Dictionary<MongoId, MongoId>>
            {
                { "Started", new Dictionary<MongoId, MongoId>() },
                { "Success", new Dictionary<MongoId, MongoId>() },
                { "Fail", new Dictionary<MongoId, MongoId>() }
            },
            Dialogue = []
        };

        if (!tradersTable.TryAdd(traderDetailsToAdd.Id, traderDataToAdd))
        {
        }
    }

    public void AddTraderToLocales(TraderBase baseJson, string firstName, string description)
    {
        var locales = localeTable.Global;
        var newTraderId = baseJson.Id;
        var fullName = baseJson.Name;
        var nickName = baseJson.Nickname;
        var location = baseJson.Location;

        foreach (var (_, localeKvP) in locales)
        {
            localeKvP.AddTransformer(lazyloadedLocaleData =>
            {
                if (!lazyloadedLocaleData!.TryGetValue($"{newTraderId} FullName", out _))
                {
                    lazyloadedLocaleData!.Add($"{newTraderId} FullName", fullName);
                }

                if (!lazyloadedLocaleData.TryGetValue($"{newTraderId} FirstName", out _))
                {
                    lazyloadedLocaleData.Add($"{newTraderId} FirstName", firstName);
                }

                if (!lazyloadedLocaleData.TryGetValue($"{newTraderId} NickName", out _))
                {
                    lazyloadedLocaleData.Add($"{newTraderId} NickName", nickName!);
                }

                if (!lazyloadedLocaleData.TryGetValue($"{newTraderId} Location", out _))
                {
                    lazyloadedLocaleData.Add($"{newTraderId} Location", location!);
                }

                if (!lazyloadedLocaleData.TryGetValue($"{newTraderId} Description", out _))
                {
                    lazyloadedLocaleData.Add($"{newTraderId} Description", description);
                }
                return lazyloadedLocaleData;
            });
        }
    }

    public void OverwriteTraderAssort(string traderId, TraderAssort newAssorts)
    {
        if (!tradersTable.TryGetValue(traderId, out var traderToEdit))
        {
            logger.Warning($"Unable to update assorts for trader: {traderId}, they couldn't be found on the server");

            return;
        }

        traderToEdit.Assort = newAssorts;
    }
}