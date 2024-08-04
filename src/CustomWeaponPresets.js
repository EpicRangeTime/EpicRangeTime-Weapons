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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWeaponPresets = void 0;
const WeaponPresets_json_1 = __importDefault(require("../db/CustomWeaponPresets/WeaponPresets.json"));
const path = __importStar(require("path"));
const modPath = path.normalize(path.join(__dirname, ".."));
const weaponPresets = WeaponPresets_json_1.default;
class CustomWeaponPresets {
    Instance;
    preSptLoad(Instance) {
        this.Instance = Instance;
    }
    postDBLoad() {
        if (weaponPresets.ItemPresets) {
            this.addWeaponPresets();
            this.addWeaponPresetLocales();
        }
        else {
            if (this.Instance.debug) {
                console.log("CustomWeaponPresets: ItemPresets not found in weaponPresets.json");
            }
        }
    }
    addWeaponPresets() {
        for (const preset in weaponPresets.ItemPresets) {
            this.Instance.database.globals.ItemPresets[preset] = weaponPresets.ItemPresets[preset];
        }
    }
    addWeaponPresetLocales() {
        const serverLocales = ["ch", "cz", "en", "es", "es-mx", "fr", "ge", "hu", "it", "jp", "kr", "pl", "po", "ru", "sk", "tu"];
        const addedLocales = {};
        for (const locale of serverLocales) {
            let localeFile;
            try {
                // Attempt to require the locale file
                localeFile = require(`${modPath}/db/locales/${locale}.json`);
            }
            catch (error) {
                // Log an error if the file cannot be found, but continue to the next iteration
                if (this.Instance.debug) {
                    console.error(`Error loading locale file for '${locale}':`, error);
                }
                continue;
            }
            // Proceed with adding locales if the file was successfully loaded
            if (Object.keys(localeFile).length < 1)
                continue;
            for (const currentItem in localeFile) {
                this.Instance.database.locales.global[locale][currentItem] = localeFile[currentItem];
                if (!addedLocales[locale])
                    addedLocales[locale] = {};
                addedLocales[locale][currentItem] = localeFile[currentItem];
            }
        }
        // Placeholders
        for (const locale of serverLocales) {
            if (locale === "en")
                continue;
            const englishItems = addedLocales["en"];
            if (!(locale in addedLocales)) {
                for (const englishItem in englishItems) {
                    if (this.Instance.database.locales.global[locale] && !(englishItem in this.Instance.database.locales.global[locale])) {
                        this.Instance.database.locales.global[locale][englishItem] = englishItems[englishItem];
                    }
                }
            }
        }
    }
}
exports.CustomWeaponPresets = CustomWeaponPresets;
//# sourceMappingURL=CustomWeaponPresets.js.map