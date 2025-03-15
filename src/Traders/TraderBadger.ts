/* eslint-disable @typescript-eslint/naming-convention */
import type { WTTInstanceManager } from "../WTTInstanceManager";

import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import type { IInsuranceConfig } from "@spt/models/spt/config/IInsuranceConfig";
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
        
        this.BadgerBaseJson = this.instanceManager.traderApi.loadTraderBaseJson("bd3a8b28356d9c6509966546");
        this.BadgerAssort = this.instanceManager.traderApi.loadTraderAssortJson("bd3a8b28356d9c6509966546");
        this.BadgerQuestAssort = this.instanceManager.traderApi.loadTraderQuestAssortJson("bd3a8b28356d9c6509966546");
        this.instanceManager.traderApi.setupTrader("bd3a8b28356d9c6509966546", this.BadgerBaseJson);
        if (this.instanceManager.debug) {
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] Trader: Badger Active`, LogTextColor.GREEN);
        }
    }
    
    /**
     * Majority of trader-related work occurs after the aki database has been loaded but prior to SPT code being run
     */
    postDBLoad(): void 
    {
        this.mydb = this.instanceManager.traderApi.loadTraderDbRecursive("bd3a8b28356d9c6509966546");

        this.instanceManager.traderApi.addTraderToDb(this.mydb, "bd3a8b28356d9c6509966546", 
            this.BadgerBaseJson, this.BadgerAssort, this.BadgerQuestAssort);

        //Load quests
        this.instanceManager.questApi.loadQuestsFromDirectory("bd3a8b28356d9c6509966546");
        //this.instanceManager.questApi.importQuestZones(BadgerZones, "Badger");

        const insuranceConfig = this.instanceManager.configServer.getConfig<IInsuranceConfig>(ConfigTypes.INSURANCE);

        insuranceConfig.returnChancePercent["bd3a8b28356d9c6509966546"] = 95;
    }
}
