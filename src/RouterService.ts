import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
// WTT imports
import type { WTTInstanceManager } from "./WTTInstanceManager";

export class WTTRouterService 
{
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private instanceManager: WTTInstanceManager;

    public preSptLoad(instance: WTTInstanceManager): void
    {
        this.instanceManager = instance;
        this.registerQuestZoneRoute();
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] WTTRouter: Initialized and registered routes.`, LogTextColor.GREEN);
    }

    private registerQuestZoneRoute(): void
    {
        this.instanceManager.staticRouter.registerStaticRouter(
            "GetZones",
            [
                {
                    url: "/quests/zones/getZones",
                    action: async (url, info, sessionId, output) => 
                    {
                        const json = JSON.stringify(
                            this.instanceManager.database.globals["QuestZones"]
                        );
                        this.instanceManager.logger.log(`[${this.instanceManager.modName}] WTTRouter: Zones requested by client`, LogTextColor.GREEN);
                        return json;
                    }
                }
            ],
            ""
        );
    }

}
