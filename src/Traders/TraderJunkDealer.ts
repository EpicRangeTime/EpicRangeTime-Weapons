/* eslint-disable @typescript-eslint/naming-convention */
import type { WTTInstanceManager } from "../WTTInstanceManager";

import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";

export class TraderJunkDealer 
{
    mydb: any;
    private instanceManager: WTTInstanceManager;
    private JunkDealerBaseJson;
    private JunkDealerAssort;
    private JunkDealerQuestAssort;

    /**
     * Some work needs to be done prior to SPT code being loaded, registering the profile image + setting trader update time inside the trader config json
     * @param Instance WTTInstanceManager
     */
    preSptLoad(Instance: WTTInstanceManager): void 
    {
        this.instanceManager = Instance;
        
        this.JunkDealerBaseJson = this.instanceManager.traderApi.loadTraderBaseJson("JunkDealer");
        this.JunkDealerAssort = this.instanceManager.traderApi.loadTraderAssortJson("JunkDealer");
        this.JunkDealerQuestAssort = this.instanceManager.traderApi.loadTraderQuestAssortJson("JunkDealer");
        this.instanceManager.traderApi.setupTrader("JunkDealer", this.JunkDealerBaseJson);
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] Trader: JunkDealer Active`, LogTextColor.GREEN);
    }
    
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     */
    postDBLoad(): void 
    {
        this.mydb = this.instanceManager.traderApi.loadTraderDbRecursive("JunkDealer");

        this.instanceManager.traderApi.addTraderToDb(this.mydb, "JunkDealer", 
            this.JunkDealerBaseJson, this.JunkDealerAssort, this.JunkDealerQuestAssort);

        //Load quests
        //this.instanceManager.questApi.loadQuestsFromDirectory("JunkDealer");
        //this.instanceManager.questApi.importQuestZones(JunkDealerZones, "JunkDealer");
    }
}
