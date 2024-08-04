"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stashes = exports.inventorySlots = exports.allBotTypes = exports.currencyIDs = exports.traderIDs = void 0;
;
// Traders and Task related items
//#region Enums
var traderIDs;
(function (traderIDs) {
    traderIDs["MECHANIC"] = "5a7c2eca46aef81a7ca2145d";
    traderIDs["SKIER"] = "58330581ace78e27b8b10cee";
    traderIDs["PEACEKEEPER"] = "5935c25fb3acc3127c3d8cd9";
    traderIDs["THERAPIST"] = "54cb57776803fa99248b456e";
    traderIDs["PRAPOR"] = "54cb50c76803fa8b248b4571";
    traderIDs["JAEGAR"] = "5c0647fdd443bc2504c2d371";
    traderIDs["RAGMAN"] = "5ac3b934156ae10c4430e83c";
    traderIDs["FENCE"] = "579dc571d53a0658a154fbec";
    traderIDs["GOBLINKING"] = "GoblinKing";
    traderIDs["CONDUCTOR"] = "Conductor";
    traderIDs["COURIER"] = "Courier";
    traderIDs["CROW"] = "Crow";
    traderIDs["WOLF"] = "Wolf";
    traderIDs["JUNKDEALER"] = "JunkDealer";
    traderIDs["WTTDATABASE"] = "WTTDatabase";
})(traderIDs || (exports.traderIDs = traderIDs = {}));
var currencyIDs;
(function (currencyIDs) {
    currencyIDs["ROUBLES"] = "5449016a4bdc2d6f028b456f";
    currencyIDs["EUROS"] = "569668774bdc2da2298b4568";
    currencyIDs["DOLLARS"] = "5696686a4bdc2da3298b456a";
})(currencyIDs || (exports.currencyIDs = currencyIDs = {}));
var allBotTypes;
(function (allBotTypes) {
    allBotTypes["ARENAFIGHTER"] = "arenafighter";
    allBotTypes["ARENAFIGHTEREVENT"] = "arenafighterevent";
    allBotTypes["ASSAULT"] = "assault";
    allBotTypes["BEAR"] = "bear";
    allBotTypes["RESHALA"] = "bossbully";
    allBotTypes["GLUHAR"] = "bossgluhar";
    allBotTypes["KILLA"] = "bosskilla";
    allBotTypes["KNIGHT"] = "bossknight";
    allBotTypes["SHTURMAN"] = "bosskojaniy";
    allBotTypes["SANITAR"] = "bosssanitar";
    allBotTypes["TAGILLA"] = "bosstagilla";
    allBotTypes["ZRYACHIY"] = "bosszryachiy";
    allBotTypes["CRAZYASSAULTEVENT"] = "crazyassaultevent";
    allBotTypes["CURSEDASSAULT"] = "cursedassault";
    allBotTypes["EXUSEC"] = "exusec";
    allBotTypes["FOLLOWERBIGPIPE"] = "followerbigpipe";
    allBotTypes["FOLLOWERBIRDEYE"] = "followerbirdeye";
    allBotTypes["FOLLOWERRESHALA"] = "followerbully";
    allBotTypes["FOLLOWERGLUHARASSAULT"] = "followergluharassault";
    allBotTypes["FOLLOWERGLUHARSCOUT"] = "followergluharscout";
    allBotTypes["FOLLOWERGLUHARSECURITY"] = "followergluharsecurity";
    allBotTypes["FOLLOWERGLUHARSNIPER"] = "followergluharsnipe";
    allBotTypes["FOLLOWERSHTURMAN"] = "followerkojaniy";
    allBotTypes["FOLLOWERSANITAR"] = "followersanitar";
    allBotTypes["FOLLOWERTAGILLA"] = "followertagilla";
    allBotTypes["FOLLOWERZRYACHIY"] = "followerzryachiy";
    allBotTypes["GIFTER"] = "gifter";
    allBotTypes["MARKSMAN"] = "marksman";
    allBotTypes["PMC"] = "pmcbot";
    allBotTypes["CULTISTPRIEST"] = "sectantpriest";
    allBotTypes["CULTISTWARRIOR"] = "sectantwarrior";
    allBotTypes["USEC"] = "usec";
})(allBotTypes || (exports.allBotTypes = allBotTypes = {}));
var inventorySlots;
(function (inventorySlots) {
    inventorySlots["FirstPrimaryWeapon"] = "55d729c64bdc2d89028b4570";
    inventorySlots["SecondPrimaryWeapon"] = "55d729d14bdc2d86028b456e";
    inventorySlots["Holster"] = "55d729d84bdc2de3098b456b";
    inventorySlots["Scabbard"] = "55d729e34bdc2d1b198b456d";
    inventorySlots["FaceCover"] = "55d729e84bdc2d8a028b4569";
    inventorySlots["Headwear"] = "55d729ef4bdc2d3a168b456c";
    inventorySlots["TacticalVest"] = "55d729f74bdc2d87028b456e";
    inventorySlots["SecuredContainer"] = "55d72a054bdc2d88028b456e";
    inventorySlots["Backpack"] = "55d72a104bdc2d89028b4571";
    inventorySlots["ArmorVest"] = "55d72a194bdc2d86028b456f";
    inventorySlots["Pockets"] = "55d72a274bdc2de3098b456c";
    inventorySlots["Earpiece"] = "5665b7164bdc2d144c8b4570";
    inventorySlots["Dogtag"] = "59f0be1e86f77453be490939";
    inventorySlots["Eyewear"] = "5a0ad9313f1241000e072755";
    inventorySlots["ArmBand"] = "5b3f583786f77411d552fb2b";
})(inventorySlots || (exports.inventorySlots = inventorySlots = {}));
var Stashes;
(function (Stashes) {
    Stashes["LEVEL1"] = "566abbc34bdc2d92178b4576";
    Stashes["LEVEL2"] = "5811ce572459770cba1a34ea";
    Stashes["LEVEL3"] = "5811ce662459770f6f490f32";
    Stashes["LEVEL4"] = "5811ce772459770e9e5f9532";
})(Stashes || (exports.Stashes = Stashes = {}));
//#endregion
//# sourceMappingURL=configConsts.js.map