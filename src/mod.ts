/* eslint-disable @typescript-eslint/naming-convention */

import * as fs from "fs";
import * as path from "path";

import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
// WTT imports
import { WTTInstanceManager } from "./WTTInstanceManager";

import { CustomItemService } from "./CustomItemService";
import { epicItemClass } from  "./EpicsEdits"

// Custom Trader Assort Items
import { CustomAssortSchemeService } from "./CustomAssortSchemeService";
import { CustomWeaponPresets } from "./CustomWeaponPresets";



class EpicRangeTimeWeapons
implements IPreSptLoadMod, IPostDBLoadMod
{
    private Instance: WTTInstanceManager = new WTTInstanceManager();
    private version: string;
    private modName = "EpicRangeTime-Weapons";
    private config;

    private customItemService: CustomItemService = new CustomItemService();

    private epicItemClass: epicItemClass = new epicItemClass();

    private customAssortSchemeService: CustomAssortSchemeService = new CustomAssortSchemeService();
    private customWeaponPresets: CustomWeaponPresets = new CustomWeaponPresets();

    debug = false;

    // Anything that needs done on preSptLoad, place here.
    public preSptLoad(container: DependencyContainer): void 
    {
    // Initialize the instance manager DO NOTHING ELSE BEFORE THIS
        this.Instance.preSptLoad(container, this.modName);
        this.Instance.debug = this.debug;
        // EVERYTHING AFTER HERE MUST USE THE INSTANCE
        
        this.getVersionFromJson();
        this.displayCreditBanner();

        this.customItemService.preSptLoad(this.Instance);

        this.epicItemClass.preSptLoad(this.Instance);

        this.customAssortSchemeService.preSptLoad(this.Instance);

        this.customWeaponPresets.preSptLoad(this.Instance);

    }

    // Anything that needs done on postDBLoad, place here.
    postDBLoad(container: DependencyContainer): void 
    {
    // Initialize the instance manager DO NOTHING ELSE BEFORE THIS
        this.Instance.postDBLoad(container);
        // EVERYTHING AFTER HERE MUST USE THE INSTANCE

        this.customItemService.postDBLoad();

        this.epicItemClass.postDBLoad();

        this.customAssortSchemeService.postDBLoad();
        this.customWeaponPresets.postDBLoad();

        this.Instance.logger.log(
            `[${this.modName}] Database: Loading complete.`,
            LogTextColor.GREEN
        );
    }

    private getVersionFromJson(): void 
    {
        const packageJsonPath = path.join(__dirname, "../package.json");

        fs.readFile(packageJsonPath, "utf-8", (err, data) => 
        {
            if (err) 
            {
                console.error("Error reading file:", err);
                return;
            }

            const jsonData = JSON.parse(data);
            this.version = jsonData.version;
        });
    }

    private displayCreditBanner(): void 
    {
        this.Instance.logger.log(
            `[${this.modName}] ------------------------------------------------------------------------`,
            LogTextColor.GREEN
        );
        this.Instance.logger.log(
            `[${this.modName}] Developers:  EpicRangeTime   Code Framework: GroovypenguinX`,
            LogTextColor.GREEN
        );
        this.Instance.logger.log(
            `[${this.modName}] "Just look at the pretty flowers, Lennie."`,
            LogTextColor.GREEN
        );
        this.Instance.logger.log(
            `[${this.modName}] ------------------------------------------------------------------------`,
            LogTextColor.GREEN
        );
    }
}

module.exports = { mod: new EpicRangeTimeWeapons() };
