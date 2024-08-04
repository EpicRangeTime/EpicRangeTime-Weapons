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
exports.CustomAssortSchemeService = void 0;
const customAssortSchemes = __importStar(require("../db/CustomAssortSchemes/CustomAssortSchemes.json"));
const configConsts_1 = require("./references/configConsts");
class CustomAssortSchemeService {
    Instance;
    preSptLoad(Instance) {
        this.Instance = Instance;
    }
    postDBLoad() {
        const tables = this.Instance.database;
        for (const traderId in customAssortSchemes) {
            const traderIdFromMap = configConsts_1.traderIDs[traderId];
            const finalTraderId = traderIdFromMap || traderId;
            const trader = tables.traders[finalTraderId];
            if (!trader) {
                return;
            }
            const newAssort = customAssortSchemes[traderId];
            for (const item of newAssort.items) {
                trader.assort.items.push(item);
            }
            for (const [itemName, scheme] of Object.entries(newAssort.barter_scheme)) {
                trader.assort.barter_scheme[itemName] = scheme;
            }
            for (const [itemName, count] of Object.entries(newAssort.loyal_level_items)) {
                trader.assort.loyal_level_items[itemName] = count;
            }
        }
    }
}
exports.CustomAssortSchemeService = CustomAssortSchemeService;
//# sourceMappingURL=CustomAssortSchemeService.js.map