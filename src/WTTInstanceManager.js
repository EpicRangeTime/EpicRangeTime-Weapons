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
exports.WTTInstanceManager = void 0;
const path = __importStar(require("node:path"));
const RouterService_1 = require("./RouterService");
const QuestAPI_1 = require("./QuestAPI");
const TraderAPI_1 = require("./TraderAPI");
class WTTInstanceManager {
    //#region Accessible in or after preSptLoad
    modName;
    debug;
    // Useful Paths
    modPath = path.join(process.cwd(), "\\user\\mods\\EpicRangeTime-Weapons\\");
    dbPath = path.join(process.cwd(), "\\user\\mods\\EpicRangeTime-Weapons\\db");
    profilePath = path.join(process.cwd(), "\\user\\profiles");
    // Instances
    container;
    preSptModLoader;
    configServer;
    saveServer;
    itemHelper;
    logger;
    staticRouter;
    dynamicRouter;
    profileController;
    profileCallbacks;
    routerService = new RouterService_1.WTTRouterService();
    //#endregion
    //#region Acceessible in or after postDBLoad
    database;
    customItem;
    imageRouter;
    jsonUtil;
    profileHelper;
    eventOutputHolder;
    ragfairPriceService;
    importerUtil;
    traderAssortService;
    applicationContext;
    vfs;
    questApi = new QuestAPI_1.QuestAPI();
    traderApi = new TraderAPI_1.TraderAPI();
    //#endregion
    // Call at the start of the mods postDBLoad method
    preSptLoad(container, mod) {
        this.modName = mod;
        this.container = container;
        this.preSptModLoader = container.resolve("PreSptModLoader");
        this.imageRouter = container.resolve("ImageRouter");
        this.configServer = container.resolve("ConfigServer");
        this.saveServer = container.resolve("SaveServer");
        this.itemHelper = container.resolve("ItemHelper");
        this.eventOutputHolder = container.resolve("EventOutputHolder");
        this.profileController = container.resolve("ProfileController");
        this.profileCallbacks = container.resolve("ProfileCallbacks");
        this.logger = container.resolve("WinstonLogger");
        this.staticRouter = container.resolve("StaticRouterModService");
        this.dynamicRouter = container.resolve("DynamicRouterModService");
        this.traderAssortService = container.resolve("TraderAssortService");
        this.vfs = container.resolve("VFS");
        this.questApi.preSptLoad(this);
        this.traderApi.preSptLoad(this);
        this.routerService.preSptLoad(this);
    }
    postDBLoad(container) {
        this.database = container.resolve("DatabaseServer").getTables();
        this.customItem = container.resolve("CustomItemService");
        this.jsonUtil = container.resolve("JsonUtil");
        this.profileHelper = container.resolve("ProfileHelper");
        this.ragfairPriceService = container.resolve("RagfairPriceService");
        this.importerUtil = container.resolve("ImporterUtil");
        this.applicationContext = container.resolve("ApplicationContext");
        this.traderApi.postDBLoad();
        this.questApi.postDBLoad();
    }
}
exports.WTTInstanceManager = WTTInstanceManager;
//# sourceMappingURL=WTTInstanceManager.js.map