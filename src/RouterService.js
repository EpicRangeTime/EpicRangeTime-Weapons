"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WTTRouterService = void 0;
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
class WTTRouterService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    instanceManager;
    preSptLoad(instance) {
        this.instanceManager = instance;
        this.registerQuestZoneRoute();
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] WTTRouter: Initialized and registered routes.`, LogTextColor_1.LogTextColor.GREEN);
    }
    registerQuestZoneRoute() {
        this.instanceManager.staticRouter.registerStaticRouter("GetZones", [
            {
                url: "/quests/zones/getZones",
                action: async (url, info, sessionId, output) => {
                    const json = JSON.stringify(this.instanceManager.database.globals["QuestZones"]);
                    this.instanceManager.logger.log(`[${this.instanceManager.modName}] WTTRouter: Zones requested by client`, LogTextColor_1.LogTextColor.GREEN);
                    return json;
                }
            }
        ], "");
    }
}
exports.WTTRouterService = WTTRouterService;
//# sourceMappingURL=RouterService.js.map