/* eslint-disable @typescript-eslint/naming-convention */
import * as path from "node:path";
import * as fs from "node:fs";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import type { QuestZone } from "./references/configConsts";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import type { IQuestConfig } from "@spt/models/spt/config/IQuestConfig";
import type { WTTInstanceManager } from "./WTTInstanceManager";

export class QuestAPI {
    private instanceManager: WTTInstanceManager;

    /**
     * Call inside traders preSptLoad method.
     * 
     * @param {ILogger} logger    Logger
     * @param {string}  mod       mod name
     * @return {void}             
     */
    public preSptLoad(Instance: WTTInstanceManager): void {
        this.instanceManager = Instance;
    }

    public postDBLoad(): void {
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
    public loadQuestsFromDirectory(trader: string): void {
        const jsonQuestFiles: any[] = [];
        const jsonLocaleData: any[] = [];
        const jsonImageFiles: any[] = [];
        const questFiles = fs.readdirSync(path.join(this.instanceManager.dbPath, "Quests", trader));
        const questLocalesFiles = fs.readdirSync(path.join(this.instanceManager.dbPath, "Quests", trader, "locales"));
        const questImageFiles = fs.readdirSync(path.join(this.instanceManager.dbPath, "Quests", trader, "images"));
        const serverLocales = ["ch", "cz", "en", "es", "es-mx", "fr", "ge", "hu", "it", "jp", "kr", "pl", "po", "ru", "sk", "tu"];
        const fallbackLocale = "en";
        const fallbackLocalePath = path.join(this.instanceManager.dbPath.concat(`\/Quests\/${trader}\/locales`), fallbackLocale + ".json");

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
            const filePath = path.join(this.instanceManager.dbPath,"Quests", trader, file);
            const itemStats = fs.lstatSync(filePath);
            let fileContent: any;

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
                console.log(`Trader: ${trader} quest file path:`)
                console.log(filePath);
            }
        }

        // Iterate over known locale names, load locale data from disk
        for (const localeName of serverLocales) {
            const filePath = path.join(this.instanceManager.dbPath.concat(`\/Quests\/${trader}\/locales`), localeName + ".json");
            let fileContent: any;

            // Check if locale file is present before attempting to read the file,
            // otherwise fallback to default locale (en).
            if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
                if (this.instanceManager.debug) {
                    console.log(`Trader: ${trader} quest \"${localeName}\" locale file path:`)
                    console.log(filePath);
                }
                fileContent = fs.readFileSync(filePath, "utf-8");
            } else {
                if (this.instanceManager.debug) {
                    console.log(`Trader: ${trader} quest \"${localeName}\" locale does not exist, will fallback to:`)
                    console.log(fallbackLocalePath);
                }
                fileContent = fs.readFileSync(fallbackLocalePath, "utf-8");
            }

            try {
                const jsonData = JSON.parse(fileContent);
                jsonLocaleData.push({ locale: localeName, content: jsonData });
            }
            catch (error) {
                console.error(`Error parsing JSON from file ${filePath}: ${error}`);
            }
        }

        // Load image paths from disk
        for (const image of questImageFiles) {
            const filePath = path.join(this.instanceManager.dbPath.concat(`\/Quests\/${trader}\/images`), image);
            const itemStats = fs.lstatSync(filePath);

            if (itemStats.isFile()) {
                jsonImageFiles.push(filePath);
            }

            if (this.instanceManager.debug) {
                console.log(`Trader: ${trader} quest image file path:`)
                console.log(filePath);
            }
        }

        this.importQuestData(jsonQuestFiles, trader);
        this.importLocaleData(jsonLocaleData, trader);
        this.importImageData(jsonImageFiles, trader);
    }


    /**
     * Import quest zones.
     * 
     * @param {QuestZone} questZones     Trader to load quests zones for.
     * @return {void}                    Returns nothing
     */
    public importQuestZones(questZones: QuestZone[], trader: string): void {
        let zones = 0;
        for (const zone of questZones) {
            if (this.instanceManager.debug) {
                console.log(zone);
            }
            // biome-ignore lint/complexity/useLiteralKeys: <explanation>
            this.instanceManager.database.globals["QuestZones"].push(zone);
            zones++;
        }
        if (this.instanceManager.debug)
        {
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loaded ${zones} quest zones.`, LogTextColor.GREEN);
        }
    }

    /**
     * Import Quest data from json files
     */
    private importQuestData(jsonQuestFiles: any[], trader: string): void {
        if (Object.keys(jsonQuestFiles).length < 1) {
            this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} No quest files.`, LogTextColor.RED);
            return;
        }
        if (this.instanceManager.debug) {
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loading ${Object.keys(jsonQuestFiles).length} quest files.`, LogTextColor.GREEN);
        }

        // Import quest data to the database
        let questCount = 0;
        for (const file of jsonQuestFiles) {
            for (const quest in file) {
                this.instanceManager.database.templates.quests[quest] = file[quest];
                questCount++;
            }
        }
        if (this.instanceManager.debug) {
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loaded ${questCount} tasks.`, LogTextColor.GREEN);
        }
    }

    /**
     * Import Quest side data into the config server
     */
    private importQuestSideConfig(): void {
        const questConfig = this.instanceManager.configServer.getConfig<IQuestConfig>(ConfigTypes.QUEST)
        const questSideFile = fs.readFileSync(this.instanceManager.dbPath.concat("/Quests/QuestSideData.json"), "utf-8");
        const questSideJson = JSON.parse(questSideFile);

        if (this.instanceManager.debug) {
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${questSideJson["UsecOnly"]}`, LogTextColor.BLUE);
        }

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
    private importLocaleData(jsonLocaleData: any[], trader: string): void {
        if (Object.keys(jsonLocaleData).length < 1) {
            this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} No quest locale files.`, LogTextColor.RED);
            return;
        }
        if (this.instanceManager.debug) {
            this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loading ${Object.keys(jsonLocaleData).length} locale files.`, LogTextColor.GREEN);
        }

        // Import quest locales to the database
        let localeCount = 0;
        for (const localeData of jsonLocaleData) {
            // just to be safe, lets init global locale if it is not initialized
            if (!this.instanceManager.database.locales.global[localeData.locale]) {
                this.instanceManager.database.locales.global[localeData.locale] = {};
            }

            for (const key in localeData.content) {
                this.instanceManager.database.locales.global[localeData.locale][key] = localeData.content[key];
                localeCount++;
            }
        }

        if (this.instanceManager.debug) {
            this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loaded ${localeCount} locales.`, LogTextColor.GREEN);
        }
    }

    /**
     * Set up routes for image data
     */
    private importImageData(jsonImageFiles: any[], trader: string): void {
        let imageCount = 0;
        for (const imagePath of jsonImageFiles) {
            this.instanceManager.imageRouter.addRoute(`/files/quest/icon/${path.basename(imagePath, path.extname(imagePath))}`, imagePath);
            imageCount++;
        }
        if (this.instanceManager.debug) {
        this.instanceManager.logger.log(`[${this.instanceManager.modName}] QuestAPI:  ${trader} Loaded ${imageCount} images.`, LogTextColor.GREEN);
        }
    }
}
