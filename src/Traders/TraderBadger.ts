/* eslint-disable @typescript-eslint/naming-convention */
import type { WTTInstanceManager } from "../WTTInstanceManager";

import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";

export class TraderBadger 
{
    mydb: any;
    private instanceManager: WTTInstanceManager;
    private BadgerBaseJson;
    private BadgerAssort;
    private BadgerQuestAssort;

    /**
     * Some work needs to be done prior to SPT code being loaded, registering the profile image + setting trader update time inside the trader config json
     * @param Instance WTTInstanceManager
     */
    preSptLoad(Instance: WTTInstanceManager): void 
    {
        this.instanceManager = Instance;
        
        this.BadgerBaseJson = this.instanceManager.traderApi.loadTraderBaseJson("Badger");
        this.BadgerAssort = this.instanceManager.traderApi.loadTraderAssortJson("Badger");
        this.BadgerQuestAssort = this.instanceManager.traderApi.loadTraderQuestAssortJson("Badger");
        this.instanceManager.traderApi.setupTrader("Badger", this.BadgerBaseJson);
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] Trader: Badger Active`, LogTextColor.GREEN);
    }
    
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     */
    postDBLoad(): void 
    {
        this.mydb = this.instanceManager.traderApi.loadTraderDbRecursive("Badger");

        this.instanceManager.traderApi.addTraderToDb(this.mydb, "Badger", 
            this.BadgerBaseJson, this.BadgerAssort, this.BadgerQuestAssort);

        //Load quests
        this.instanceManager.questApi.loadQuestsFromDirectory("Badger");
        //this.instanceManager.questApi.importQuestZones(BadgerZones, "Badger");
    }
}
