"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderJunkDealer = void 0;
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
class TraderJunkDealer {
    mydb;
    instanceManager;
    JunkDealerBaseJson;
    JunkDealerAssort;
    JunkDealerQuestAssort;
    /**
     * Some work needs to be done prior to SPT code being loaded, registering the profile image + setting trader update time inside the trader config json
     * @param Instance WTTInstanceManager
     */
    preSptLoad(Instance) {
        this.instanceManager = Instance;
        this.JunkDealerBaseJson = this.instanceManager.traderApi.loadTraderBaseJson("JunkDealer");
        this.JunkDealerAssort = this.instanceManager.traderApi.loadTraderAssortJson("JunkDealer");
        this.JunkDealerQuestAssort = this.instanceManager.traderApi.loadTraderQuestAssortJson("JunkDealer");
        this.instanceManager.traderApi.setupTrader("JunkDealer", this.JunkDealerBaseJson);
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] Trader: JunkDealer Active`, LogTextColor_1.LogTextColor.GREEN);
    }
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     */
    postDBLoad() {
        this.mydb = this.instanceManager.traderApi.loadTraderDbRecursive("JunkDealer");
        this.instanceManager.traderApi.addTraderToDb(this.mydb, "JunkDealer", this.JunkDealerBaseJson, this.JunkDealerAssort, this.JunkDealerQuestAssort);
        //Load quests
        //this.instanceManager.questApi.loadQuestsFromDirectory("JunkDealer");
        //this.instanceManager.questApi.importQuestZones(JunkDealerZones, "JunkDealer");
    }
}
exports.TraderJunkDealer = TraderJunkDealer;
//# sourceMappingURL=TraderJunkDealer.js.map