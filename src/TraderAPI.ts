/* eslint-disable @typescript-eslint/naming-convention */
import path from "path";
import fs from "fs";

import { Traders } from "@spt/models/enums/Traders";
import type { ITraderAssort, ITraderBase } from "@spt/models/eft/common/tables/ITrader";
import type { ITraderConfig, UpdateTime } from "@spt/models/spt/config/ITraderConfig";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import type { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import type { WTTInstanceManager } from "./WTTInstanceManager";

export class TraderAPI
{
    private instanceManager: WTTInstanceManager;

    private dbPath : string; 

    public preSptLoad(Instance: WTTInstanceManager): void
    {
        this.instanceManager = Instance;
        this.dbPath = path.join(this.instanceManager.dbPath, "\\Traders")
    }

    public postDBLoad(): void
    {
    }

    /**
     *  Trader to load database for 
     *  db/Traders/@param trader/{content}
     * @returns 
     */
    public loadTraderDbRecursive(trader: string): any
    {
        return this.instanceManager.importerUtil.loadRecursive(path.join(this.dbPath, `\\${trader}\\`));
    }

    /**
     * Load base.json for trader
     * db/Traders/@param trader/@param trader-base.json 
     * 
     * @returns 
     */
    public loadTraderBaseJson(trader: string): any
    {
        const file = fs.readFileSync(
            path.join(this.dbPath, `\\${trader}\\${trader}Base.json`), "utf8");
        const json = JSON.parse(file);
        return json;
    }

    /**
     * Load Assort.json for trader
     * db/Traders/@param trader/@param trader-Assort.json 
     * 
     * @returns 
     */
    public loadTraderAssortJson(trader: string): any
    {
        const file = fs.readFileSync(
            path.join(this.dbPath, `\\${trader}\\${trader}Assort.json`), "utf8");
        const json = JSON.parse(file);
        return json;
    }

    /**
     * Load QuestAssort.json for trader
     * db/Traders/@param trader/@param trader-Assort.json 
     * 
     * @returns 
     */
    public loadTraderQuestAssortJson(trader: string): any
    {
        const file = fs.readFileSync(
            path.join(this.dbPath, `\\${trader}\\${trader}QuestAssort.json`), "utf8");
        const json = JSON.parse(file);
        return json;
    }

    public setupTrader(trader: string, baseJson: any): void
    {
        const traderConfig: ITraderConfig = this.instanceManager.configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);

        const refreshTimeSecondsMin = 3600;
        const refreshTimeSecondsMax = 4000;

        // Add refresh time in seconds to config
        const traderRefreshRecord: UpdateTime = {
            traderId: baseJson._id,
            seconds: {
                min: refreshTimeSecondsMin,
                max: refreshTimeSecondsMax
            } };
        
        traderConfig.updateTime.push(traderRefreshRecord);

        this.registerProfileImage(trader, baseJson);
        Traders[baseJson._id] = baseJson._id;
    }

    /**
     * 
     * @param mydb traders database       
     * @param trader traders name Ex. "GoblinKing"
     * @param baseJson traders base.json
     * @param assortJson traders assort.json
     * @param questAssortJson Traders quest assort
     */
    public addTraderToDb(mydb: any, trader: string, baseJson: any, assortJson: any,  questAssortJson: any): void
    {
        this.instanceManager.database.traders[baseJson._id] = {
            assort: this.instanceManager.jsonUtil.deserialize(this.instanceManager.jsonUtil.serialize(assortJson)) as ITraderAssort,
            base: JSON.parse(JSON.stringify({ ...baseJson, unlockedByDefault: true })) as ITraderBase,
            questassort: JSON.parse(JSON.stringify(questAssortJson))
        };

        const ragfairConfig: IRagfairConfig = this.instanceManager.configServer.getConfig(ConfigTypes.RAGFAIR);
        ragfairConfig.traders[baseJson._id] = true;

        
        let items = 0;
        for (const item in mydb.templates.items.items.templates) 
        {

            const parent =mydb.templates.items.items.templates[item]._parent;
            this.instanceManager.database.templates.items[item] = mydb.templates.items.items.templates[item];
            if (this.instanceManager.debug)
            {
                console.log("Adding item:", item, "with parent:", parent);
            }
            items++;
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] TraderAPI: ${trader} added ${items} to the database.`, LogTextColor.GREEN);


        
        const locales: Record<string, Record<string, string>> = this.instanceManager.database.locales.global;
        locales.en = {
            ...locales.en,
            ...mydb?.locales.en
        };
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] TraderAPI: ${trader} added item locales.`, LogTextColor.GREEN);

        let handbooks = 0;
        for (const handbook of mydb.templates.handbook.Items) 
        {
            if (!this.instanceManager.database.templates.handbook.Items.find((i) => i.Id === handbook.Id)) 
                this.instanceManager.database.templates.handbook.Items.push(handbook);
            handbooks++;
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] TraderAPI: ${trader} added ${handbooks} items to handbook database.`, LogTextColor.GREEN);

        this.addTraderToLocales(trader, baseJson);

        this.instanceManager.logger.log(`[${this.instanceManager.modName}] TraderAPI: ${trader} successfully added to database.`, LogTextColor.GREEN);
    }

    /**
     * @param trader traders name "GoblinKing"
     * @param baseJson traders base.json
     */
    private addTraderToLocales(trader: string, baseJson: any): void 
    {
        const locales: Record<string, Record<string, string>> = this.instanceManager.database.locales.global;

        let count = 0;
        for (const locale in locales) 
        {
            locales[locale][`${baseJson._id} FullName`] = baseJson.name;
            locales[locale][`${baseJson._id} FirstName`] = baseJson.firstname;
            locales[locale][`${baseJson._id} Nickname`] = baseJson.nickname;
            locales[locale][`${baseJson._id} Location`] = baseJson.location;
            locales[locale][`${baseJson._id} Description`] = baseJson.description;
            count++;
        }

        this.instanceManager.logger.log(`[${this.instanceManager.modName}] TraderAPI: ${trader} loaded ${count} locales`, LogTextColor.GREEN);
    }

    private registerProfileImage(trader: string, baseJson: any): void 
    {
        const imageFilepath = `./${this.instanceManager.preSptModLoader.getModPath(this.instanceManager.modName)}res`;
        this.instanceManager.imageRouter.addRoute(baseJson.avatar.replace(".png", ""), `${imageFilepath}/${trader}.png`);
    }
    
}