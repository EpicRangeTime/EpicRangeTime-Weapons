"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestAPI = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
class QuestAPI {
    instanceManager;
    /**
     * Call inside traders preSptLoad method.
     *
     * @param {ILogger} logger    Logger
     * @param {string}  mod       mod name
     * @return {void}
     */
    preSptLoad(Instance) {
        this.instanceManager = Instance;
    }
    postDBLoad() {
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        this.instanceManager.database.globals["QuestZones"] = [];
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        this.instanceManager.database.globals["FlareZones"] = [];
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        this.instanceManager.database.globals["BotKillZones"] = [];
        this.importQuestSideConfig();
    }
    /**
     * Loads all quest files from disk.
     * \user\mods\WelcomeToTarkov\db\quests\{trader}
     * \user\mods\WelcomeToTarkov\db\quests\{trader}\locales
     *
     * @param {string} trader     Trader to load quests for.
     * @return {any[]}            Returns an array of parsed json objects
     */
    loadQuestsFromDirectory(trader) {
        const jsonQuestFiles = [];
        const jsonLocaleFiles = [];
        const jsonImageFiles = [];
        const questFiles = fs.readdirSync(this.instanceManager.dbPath.concat(`\\Quests\\${trader}\\`));
        const questLocalesFiles = fs.readdirSync(this.instanceManager.dbPath.concat(`\\Quests\\${trader}\\locales`));
        const questImageFiles = fs.readdirSync(this.instanceManager.dbPath.concat(`\\Quests\\${trader}\\images`));
        if (this.instanceManager.debug) {
            console.log("---------------------------------------------------------");
            console.log(`Trader: ${trader} quest files:`);
            console.log(questFiles);
            console.log(`Trader: ${trader} locale files:`);
            console.log(questLocalesFiles);
            console.log(`Trader: ${trader} image files:`);
            console.log(questImageFiles);
            console.log("---------------------------------------------------------");
        }
        // Load quest data from disk
        for (const file of questFiles) {
            const filePath = path.join(this.instanceManager.dbPath.concat(`\\Quests\\${trader}`), file);
            const itemStats = fs.lstatSync(filePath);
            let fileContent;
            if (itemStats.isFile()) {
                fileContent = fs.readFileSync(filePath, "utf-8");
                try {
                    const jsonData = JSON.parse(fileContent);
                    jsonQuestFiles.push(jsonData);
                }
                catch (error) {
                    console.error(`Error parsing JSON from file ${filePath}: ${error}`);
                }
            }
            if (this.instanceManager.debug) {
                console.log(`Trader: ${trader} quest file path:`);
                console.log(filePath);
            }
        }
        // Load locale data from disk
        for (const locale of questLocalesFiles) {
            const filePath = path.join(this.instanceManager.dbPath.concat(`\\Quests\\${trader}\\locales`), locale);
            const itemStats = fs.lstatSync(filePath);
            let fileContent;
            if (itemStats.isFile()) {
                fileContent = fs.readFileSync(filePath, "utf-8");
            }
            if (this.instanceManager.debug) {
                console.log(`Trader: ${trader} quest locale file path:`);
                console.log(filePath);
            }
            try {
                const jsonData = JSON.parse(fileContent);
                jsonLocaleFiles.push(jsonData);
            }
            catch (error) {
                console.error(`Error parsing JSON from file ${filePath}: ${error}`);
            }
        }
        // Load image paths from disk
        for (const image of questImageFiles) {
            const filePath = path.join(this.instanceManager.dbPath.concat(`\\Quests\\${trader}\\images`), image);
            const itemStats = fs.lstatSync(filePath);
            if (itemStats.isFile()) {
                jsonImageFiles.push(filePath);
            }
            if (this.instanceManager.debug) {
                console.log(`Trader: ${trader} quest image file path:`);
                console.log(filePath);
            }
        }
        this.importQuestData(jsonQuestFiles, trader);
        this.importLocaleData(jsonLocaleFiles, trader);
        this.importImageData(jsonImageFiles, trader);
    }
    /**
     * Import quest zones.
     *
     * @param {QuestZone} questZones     Trader to load quests zones for.
     * @return {void}                    Returns nothing
     */
    importQuestZones(questZones, trader) {
        let zones = 0;
        for (const zone of questZones) {
            if (this.instanceManager.debug) {
                console.log(zone);
            }
            // biome-ignore lint/complexity/useLiteralKeys: <explanation>
            this.instanceManager.database.globals["QuestZones"].push(zone);
            zones++;
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loaded ${zones} quest zones.`, LogTextColor_1.LogTextColor.GREEN);
    }
    /**
     * Import Quest data from json files
     */
    importQuestData(jsonQuestFiles, trader) {
        if (Object.keys(jsonQuestFiles).length < 1) {
            this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} No quest files.`, LogTextColor_1.LogTextColor.RED);
            return;
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loading ${Object.keys(jsonQuestFiles).length} quest files.`, LogTextColor_1.LogTextColor.GREEN);
        // Import quest data to the database
        let questCount = 0;
        for (const file of jsonQuestFiles) {
            for (const quest in file) {
                this.instanceManager.database.templates.quests[quest] = file[quest];
                questCount++;
            }
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loaded ${questCount} tasks.`, LogTextColor_1.LogTextColor.GREEN);
    }
    /**
     * Import Quest side data into the config server
     */
    importQuestSideConfig() {
        const questConfig = this.instanceManager.configServer.getConfig(ConfigTypes_1.ConfigTypes.QUEST);
        const questSideFile = fs.readFileSync(this.instanceManager.dbPath.concat("/Quests/QuestSideData.json"), "utf-8");
        const questSideJson = JSON.parse(questSideFile);
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${questSideJson["UsecOnly"]}`, LogTextColor_1.LogTextColor.BLUE);
        for (const entry of questSideJson["UsecOnly"]) {
            questConfig.usecOnlyQuests.push(entry);
        }
        for (const entry of questSideJson["BearOnly"]) {
            questConfig.bearOnlyQuests.push(entry);
        }
    }
    /**
     * Import locale data into the database
     */
    importLocaleData(jsonLocaleFiles, trader) {
        if (Object.keys(jsonLocaleFiles).length < 1) {
            this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} No quest locale files.`, LogTextColor_1.LogTextColor.RED);
            return;
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loading ${Object.keys(jsonLocaleFiles).length} locale files.`, LogTextColor_1.LogTextColor.GREEN);
        // Import quest locales to the database
        let localeCount = 0;
        for (const file of jsonLocaleFiles) {
            for (const locale in file) {
                this.instanceManager.database.locales.global["en"][locale] = file[locale];
                localeCount++;
            }
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loaded ${localeCount} locales.`, LogTextColor_1.LogTextColor.GREEN);
    }
    /**
     * Set up routes for image data
     */
    importImageData(jsonImageFiles, trader) {
        let imageCount = 0;
        for (const imagePath of jsonImageFiles) {
            this.instanceManager.imageRouter.addRoute(`/files/quest/icon/${path.basename(imagePath, path.extname(imagePath))}`, imagePath);
            imageCount++;
        }
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loaded ${imageCount} images.`, LogTextColor_1.LogTextColor.GREEN);
    }
}
exports.QuestAPI = QuestAPI;
//# sourceMappingURL=QuestAPI.js.map