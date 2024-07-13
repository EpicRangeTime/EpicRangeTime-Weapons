import * as path from "path";

import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ProfileController } from "@spt/controllers/ProfileController";
import { ProfileCallbacks } from "@spt/callbacks/ProfileCallbacks";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import { DynamicRouterModService } from "@spt/services/mod/dynamicRouter/DynamicRouterModService";
import { TraderAssortService } from "@spt/services/TraderAssortService";
import { DependencyContainer } from "tsyringe";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { ImageRouter } from "@spt/routers/ImageRouter";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { RagfairPriceService } from "@spt/services/RagfairPriceService";
import { ImporterUtil } from "@spt/utils/ImporterUtil";
import { SaveServer } from "@spt/servers/SaveServer";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ApplicationContext } from "@spt/context/ApplicationContext";
import { VFS } from "@spt/utils/VFS";

export class WTTInstanceManager 
{
    //#region Accessible in or after preSptLoad
    public modName: string;
    public debug: boolean;
    // Useful Paths
    public modPath: string = path.join(process.cwd(), "\\user\\mods\\WelcomeToTarkov\\");
    public dbPath: string = path.join(process.cwd(), "\\user\\mods\\WelcomeToTarkov\\db");
    public profilePath: string = path.join(process.cwd(), "\\user\\profiles");

    // Instances
    public container: DependencyContainer;
    public PreSptModLoader: PreSptModLoader;
    public configServer: ConfigServer;
    public saveServer: SaveServer;
    public itemHelper: ItemHelper;
    public logger: ILogger;
    public staticRouter: StaticRouterModService;
    public dynamicRouter: DynamicRouterModService;
    public profileController: ProfileController;
    public profileCallbacks: ProfileCallbacks;
    //#endregion

    //#region Acceessible in or after postDBLoad
    public database: IDatabaseTables;
    public customItem: CustomItemService;
    public imageRouter: ImageRouter;
    public jsonUtil: JsonUtil;
    public profileHelper: ProfileHelper;
    public eventOutputHolder: EventOutputHolder;
    public ragfairPriceService: RagfairPriceService;
    public importerUtil: ImporterUtil;
    public traderAssortService: TraderAssortService;
    public applicationContext: ApplicationContext;
    public vfs: VFS;
    //#endregion

    // Call at the start of the mods postDBLoad method
    public preSptLoad(container: DependencyContainer, mod: string): void
    {
        this.modName = mod;

        this.container = container;
        this.PreSptModLoader = container.resolve<PreSptModLoader>("PreSptModLoader");
        this.imageRouter = container.resolve<ImageRouter>("ImageRouter");
        this.configServer = container.resolve<ConfigServer>("ConfigServer");
        this.saveServer = container.resolve<SaveServer>("SaveServer");
        this.itemHelper = container.resolve<ItemHelper>("ItemHelper");
        this.eventOutputHolder = container.resolve<EventOutputHolder>("EventOutputHolder");
        this.profileController = container.resolve<ProfileController>("ProfileController");
        this.profileCallbacks = container.resolve<ProfileCallbacks>("ProfileCallbacks");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.staticRouter = container.resolve<StaticRouterModService>("StaticRouterModService");
        this.dynamicRouter = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.traderAssortService = container.resolve<TraderAssortService>("TraderAssortService");
        this.vfs = container.resolve<VFS>("VFS");


    }

    public postDBLoad(container: DependencyContainer): void
    {
        this.database = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        this.customItem = container.resolve<CustomItemService>("CustomItemService");
        this.jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        this.profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        this.ragfairPriceService = container.resolve<RagfairPriceService>("RagfairPriceService");
        this.importerUtil = container.resolve<ImporterUtil>("ImporterUtil");
        this.applicationContext = container.resolve<ApplicationContext>("ApplicationContext");

    }

}