"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderAPI = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
class TraderAPI {
    instanceManager;
    dbPath;
    preSptLoad(Instance) {
        this.instanceManager = Instance;
        this.dbPath = path_1.default.join(this.instanceManager.dbPath, "\\Traders");
    }
    postDBLoad() {
    }
    /**
     *  Trader to load database for
     *  db/Traders/@param trader/{content}
     * @returns
     */
    loadTraderDbRecursive(trader) {
        return this.instanceManager.importerUtil.loadRecursive(path_1.default.join(this.dbPath, `\\${trader}\\`));
    }
    /**
     * Load base.json for trader
     * db/Traders/@param trader/@param trader-base.json
     *
     * @returns
     */
    loadTraderBaseJson(trader) {
        const file = fs_1.default.readFileSync(path_1.default.join(this.dbPath, `\\${trader}\\${trader}Base.json`), "utf8");
        const json = JSON.parse(file);
        return json;
    }
    /**
     * Load Assort.json for trader
     * db/Traders/@param trader/@param trader-Assort.json
     *
     * @returns
     */
    loadTraderAssortJson(trader) {
        const file = fs_1.default.readFileSync(path_1.default.join(this.dbPath, `\\${trader}\\${trader}Assort.json`), "utf8");
        const json = JSON.parse(file);
        return json;
    }
    /**
     * Load QuestAssort.json for trader
     * db/Traders/@param trader/@param trader-Assort.json
     *
     * @returns
     */
    loadTraderQuestAssortJson(trader) {
        const file = fs_1.default.readFileSync(path_1.default.join(this.dbPath, `\\${trader}\\${trader}QuestAssort.json`), "utf8");
        const json = JSON.parse(file);
        return json;
    }
    setupTrader(trader, baseJson) {
        const traderConfig = this.instanceManager.configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const refreshTimeSecondsMin = 3600;
        const refreshTimeSecondsMax = 4000;
        // Add refresh time in seconds to config
        const traderRefreshRecord = {
            traderId: baseJson._id,
            seconds: {
                min: refreshTimeSecondsMin,
                max: refreshTimeSecondsMax
            }
        };
        traderConfig.updateTime.push(traderRefreshRecord);
        this.registerProfileImage(trader, baseJson);
        Traders_1.Traders[baseJson._id] = baseJson._id;
    }
    /**
     *
     * @param mydb traders database
     * @param trader traders name Ex. "GoblinKing"
     * @param baseJson traders base.json
     * @param assortJson traders assort.json
     * @param questAssortJson Traders quest assort
     */
    addTraderToDb(mydb, trader, baseJson, assortJson, questAssortJson) {
        this.instanceManager.database.traders[baseJson._id] = {
            assort: this.instanceManager.jsonUtil.deserialize(this.instanceManager.jsonUtil.serialize(assortJson)),
            base: JSON.parse(JSON.stringify({ ...baseJson, unlockedByDefault: true })),
            questassort: JSON.parse(JSON.stringify(questAssortJson))
        };
        const ragfairConfig = this.instanceManager.configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        ragfairConfig.traders[baseJson._id] = true;
        let items = 0;
        for (const item in mydb.templates.items.items.templates) {
            const parent = mydb.templates.items.items.templates[item]._parent;
            this.instanceManager.database.templates.items[item] = mydb.templates.items.items.templates[item];
            if (this.instanceManager.debug) {
                console.log("Adding item:", item, "with parent:", parent);
            }
            items++;
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] TraderAPI: ${trader} added ${items} to the database.`, LogTextColor_1.LogTextColor.GREEN);
        const locales = this.instanceManager.database.locales.global;
        locales.en = {
            ...locales.en,
            ...mydb?.locales.en
        };
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] TraderAPI: ${trader} added item locales.`, LogTextColor_1.LogTextColor.GREEN);
        let handbooks = 0;
        for (const handbook of mydb.templates.handbook.Items) {
            if (!this.instanceManager.database.templates.handbook.Items.find((i) => i.Id === handbook.Id))
                this.instanceManager.database.templates.handbook.Items.push(handbook);
            handbooks++;
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] TraderAPI: ${trader} added ${handbooks} items to handbook database.`, LogTextColor_1.LogTextColor.GREEN);
        this.addTraderToLocales(trader, baseJson);
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] TraderAPI: ${trader} successfully added to database.`, LogTextColor_1.LogTextColor.GREEN);
    }
    /**
     * @param trader traders name "GoblinKing"
     * @param baseJson traders base.json
     */
    addTraderToLocales(trader, baseJson) {
        const locales = this.instanceManager.database.locales.global;
        let count = 0;
        for (const locale in locales) {
            locales[locale][`${baseJson._id} FullName`] = baseJson.name;
            locales[locale][`${baseJson._id} FirstName`] = baseJson.firstname;
            locales[locale][`${baseJson._id} Nickname`] = baseJson.nickname;
            locales[locale][`${baseJson._id} Location`] = baseJson.location;
            locales[locale][`${baseJson._id} Description`] = baseJson.description;
            count++;
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] TraderAPI: ${trader} loaded ${count} locales`, LogTextColor_1.LogTextColor.GREEN);
    }
    registerProfileImage(trader, baseJson) {
        const imageFilepath = `./${this.instanceManager.preSptModLoader.getModPath(this.instanceManager.modName)}res`;
        this.instanceManager.imageRouter.addRoute(baseJson.avatar.replace(".png", ""), `${imageFilepath}/${trader}.png`);
    }
}
exports.TraderAPI = TraderAPI;
//# sourceMappingURL=TraderAPI.js.map