/* eslint-disable @typescript-eslint/naming-convention */
export interface CombinedConfigItem 
{
    [itemId: string]: ConfigItem;
}
export interface ConfigItem 
{
    [itemId: string]: {
        itemTplToClone: string;
        overrideProperties: {
            Prefab: {
                path: string;
                rcid: string;
            };
            ReverbVolume: number;
        };
        parentId: string;
        fleaPriceRoubles: number;
        handbookPriceRoubles: number;
        handbookParentId: string;
        locales: {
            [locale: string]: {
                name: string;
                shortName: string;
                description: string;
            };
        };
        clearClonedProps: boolean;
        addtoInventorySlots: string[];
        addtoModSlots: boolean;
        modSlot: string[];
        ModdableItemWhitelist: string;
        ModdableItemBlacklist: string;
        addtoTraders: boolean;
        traderId: traderIDs;
        traderItems: {
            unlimitedCount: boolean;
            stackObjectsCount: number;
        }[];
        barterScheme: {
            count: number;
            _tpl: string;
        }[];
        loyallevelitems: number;
        addtoBots: boolean;
        addtoStaticLootContainers: boolean;
        StaticLootContainers: string;
        Probability: number;
        masteries: boolean;
        masterySections: {
            Name: string;
            Templates: string[];
            Level2: number;
            Level3: number;
        };
        addweaponpreset: boolean;
        weaponpresets: Preset[];
        addtoHallOfFame: boolean;
        addtoSpecialSlots: boolean;
    };
    };
}

export interface Item 
{
    _id: string;
    _tpl: string;
    parentId?: string;
    slotId?: string;
}
  
export interface Preset 
{
    _changeWeaponName: boolean;
    _encyclopedia?: string;
    _id: string;
    _items: Item[];
    _name: string;
    _parent: string;
    _type: string;
}
  

export interface VoiceConfig 
{
    [voiceId: string]: {
        locale: {
            [localeId: string]: {
                [itemId: string]: string;
            };
        };
        addVoiceToPlayer: boolean;
        sideSpecificVoice: string;
    };
}

// Traders and Task related items

//#region Enums
export enum traderIDs 
    {
    MECHANIC = "5a7c2eca46aef81a7ca2145d",
    SKIER = "58330581ace78e27b8b10cee",
    PEACEKEEPER = "5935c25fb3acc3127c3d8cd9",
    THERAPIST = "54cb57776803fa99248b456e",
    PRAPOR = "54cb50c76803fa8b248b4571",
    JAEGAR = "5c0647fdd443bc2504c2d371",
    RAGMAN = "5ac3b934156ae10c4430e83c",
    FENCE = "579dc571d53a0658a154fbec",
    GOBLINKING = "GoblinKing",
    CONDUCTOR = "Conductor",
    COURIER = "Courier",
    CROW = "Crow",
    WOLF = "Wolf",
    JUNKDEALER = "JunkDealer",
    WTTDATABASE = "WTTDatabase"
}

export enum currencyIDs 
    {
    ROUBLES = "5449016a4bdc2d6f028b456f",
    EUROS = "569668774bdc2da2298b4568",
    DOLLARS = "5696686a4bdc2da3298b456a"
}
    
export enum allBotTypes 
    {
    ARENAFIGHTER  = "arenafighter",
    ARENAFIGHTEREVENT = "arenafighterevent",
    ASSAULT = "assault",
    BEAR = "bear",
    RESHALA = "bossbully",
    GLUHAR = "bossgluhar",
    KILLA = "bosskilla",
    KNIGHT = "bossknight",
    SHTURMAN = "bosskojaniy",
    SANITAR = "bosssanitar",
    TAGILLA = "bosstagilla",
    ZRYACHIY = "bosszryachiy",
    CRAZYASSAULTEVENT = "crazyassaultevent",
    CURSEDASSAULT = "cursedassault",
    EXUSEC = "exusec",
    FOLLOWERBIGPIPE = "followerbigpipe",
    FOLLOWERBIRDEYE = "followerbirdeye",
    FOLLOWERRESHALA = "followerbully",
    FOLLOWERGLUHARASSAULT = "followergluharassault",
    FOLLOWERGLUHARSCOUT = "followergluharscout",
    FOLLOWERGLUHARSECURITY = "followergluharsecurity",
    FOLLOWERGLUHARSNIPER = "followergluharsnipe",
    FOLLOWERSHTURMAN = "followerkojaniy",
    FOLLOWERSANITAR = "followersanitar",
    FOLLOWERTAGILLA = "followertagilla",
    FOLLOWERZRYACHIY = "followerzryachiy",
    GIFTER = "gifter",
    MARKSMAN = "marksman",
    PMC = "pmcbot",
    CULTISTPRIEST = "sectantpriest",
    CULTISTWARRIOR = "sectantwarrior",
    USEC = "usec"
}

export enum inventorySlots 
    {
    FirstPrimaryWeapon = "55d729c64bdc2d89028b4570",
    SecondPrimaryWeapon = "55d729d14bdc2d86028b456e",
    Holster = "55d729d84bdc2de3098b456b",
    Scabbard = "55d729e34bdc2d1b198b456d",
    FaceCover = "55d729e84bdc2d8a028b4569",
    Headwear = "55d729ef4bdc2d3a168b456c",
    TacticalVest = "55d729f74bdc2d87028b456e",
    SecuredContainer = "55d72a054bdc2d88028b456e",
    Backpack = "55d72a104bdc2d89028b4571",
    ArmorVest = "55d72a194bdc2d86028b456f",
    Pockets = "55d72a274bdc2de3098b456c",
    Earpiece = "5665b7164bdc2d144c8b4570",
    Dogtag = "59f0be1e86f77453be490939",
    Eyewear = "5a0ad9313f1241000e072755",
    ArmBand = "5b3f583786f77411d552fb2b"
}

export enum Stashes 
    {
    LEVEL1 = "566abbc34bdc2d92178b4576",
    LEVEL2 = "5811ce572459770cba1a34ea",
    LEVEL3 = "5811ce662459770f6f490f32",
    LEVEL4 = "5811ce772459770e9e5f9532"
}

//Interfaces

export interface QuestZone 
{
    zoneId: string;
    zoneName: string;
    zoneType: string;
    flareType?: string;
    zoneLocation: string;
    position: {
        x: string;
        y: string;
        z: string;
    };
    rotation: {
        x: string;
        y: string;
        z: string;
    };
    scale: {
        x: string;
        y: string;
        z: string;
    };
}


//#endregion