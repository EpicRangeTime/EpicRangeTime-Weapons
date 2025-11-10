using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers;

namespace EpicsAIO.Utilities;

[Injectable(TypePriority = OnLoadOrder.PostSptModLoader + 1)]
public class EpicTraderEnforcer(ProfileHelper profileHelper) : IOnLoad
{
    public Task OnLoad()
    {
        var profiles = profileHelper.GetProfiles();
        foreach (var profile in profiles.Select(profilePair => profilePair.Value))
        {
            if (profile.CharacterData?.PmcData?.TradersInfo["bd3a8b28356d9c6509966546"] == null) return Task.CompletedTask;
            if (profile.CharacterData?.PmcData?.Info?.Level >= 12)
            {
                profile.CharacterData.PmcData.TradersInfo["bd3a8b28356d9c6509966546"].Unlocked = true;
            }
        }
        return Task.CompletedTask;
    }
}