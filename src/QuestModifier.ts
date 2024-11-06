/* eslint-disable @typescript-eslint/naming-convention */
import type { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import type { JsonUtil } from "@spt/utils/JsonUtil";

export class QuestModifier {

    // Helper method to update items in all AvailableForFinish conditions
    private updateItemsInAllAvailableForFinish(
        questID: string,
        items: string[] | string[][],
        type: 'weapon' | 'weaponModsInclusive' | 'weaponModsExclusive',
        tables: IDatabaseTables,
        jsonUtil: JsonUtil,
        debug: boolean
    ): void {
        const quest = tables.templates.quests[questID];
        if (quest) {
            try {
                const availableForFinish = quest.conditions.AvailableForFinish;
                let modified = false;

                for (const conditionGroup of availableForFinish) {
                    const conditions = conditionGroup.counter.conditions[0];
                    
                    if (type === 'weapon') {
                        const existingWeapons = jsonUtil.clone(conditions.weapon || []);
                        const updatedWeapons = new Set(existingWeapons);

                        for (const weapon of items as string[]) {
                            if (!updatedWeapons.has(weapon)) {
                                updatedWeapons.add(weapon);
                                modified = true;

                                if (debug) {
                                    console.log(`Added new weapon ${weapon} to AvailableForFinish condition in quest ${questID}`);
                                }
                            } else if (debug) {
                                console.log(`AvailableForFinish condition in quest ${questID} already has the weapon ${weapon}`);
                            }
                        }

                        if (modified) {
                            conditions.weapon = Array.from(updatedWeapons);
                            if (debug) {
                                console.log(`Modified AvailableForFinish conditions in quest ${questID}:`, conditions.weapon);
                            }
                        }
                    } else if (type === 'weaponModsInclusive' || type === 'weaponModsExclusive') {
                        const existingWeaponModsInclusive = jsonUtil.clone(conditions.weaponModsInclusive || []);
                        const updatedWeaponModsInclusive = new Set(existingWeaponModsInclusive.flat());

                        for (const weaponModArray of items as string[][]) {
                            for (const weaponMod of weaponModArray) {
                                if (!updatedWeaponModsInclusive.has(weaponMod)) {
                                    updatedWeaponModsInclusive.add(weaponMod);
                                    modified = true;

                                    if (debug) {
                                        console.log(`Added new weapon mod ${weaponMod} to AvailableForFinish condition in quest ${questID}`);
                                    }
                                } else if (debug) {
                                    console.log(`AvailableForFinish condition in quest ${questID} already has the weapon mod ${weaponMod}`);
                                }
                            }
                        }

                        if (modified) {
                            conditions.weaponModsInclusive = Array.from(updatedWeaponModsInclusive).map(mod => [mod]);
                            if (debug) {
                                console.log(`Modified AvailableForFinish conditions in quest ${questID}:`, conditions.weaponModsInclusive);
                            }
                        }
                    }
                }

            } catch (error) {
                console.error(`Error modifying items in AvailableForFinish conditions for quest ${questID}:`, error);
            }
        } else {
            console.warn(`Quest with ID ${questID} not found.`);
        }
    }

    // Method to update quest data based on type, optionally push to all AvailableForFinish
    public updateQuestData(
        questID: string,
        items: string[] | string[][],
        type: 'weapon' | 'weaponModsInclusive' | 'weaponModsExclusive',
        tables: IDatabaseTables,
        jsonUtil: JsonUtil,
        pushToAllAvailableForFinish: boolean,
        debug: boolean,
        availableForFinishIndex = 0 // New parameter to specify the index
    ): void {
        if (pushToAllAvailableForFinish) {
            this.updateItemsInAllAvailableForFinish(
                questID,
                items,
                type,
                tables,
                jsonUtil,
                debug
            );
        } else {
            const quest = tables.templates.quests[questID];
            if (quest) {
                if (type === 'weapon') {
                    this.updateQuestWeapons(
                        questID,
                        items as string[],
                        tables,
                        jsonUtil,
                        debug,
                        availableForFinishIndex // Pass the index to the helper method
                    );
                } else if (type === 'weaponModsInclusive' || type === 'weaponModsExclusive') {
                    this.updateQuestWeaponMods(
                        questID,
                        items as string[][],
                        tables,
                        jsonUtil,
                        debug,
                        availableForFinishIndex // Pass the index to the helper method
                    );
                }
            } else {
                console.warn(`Quest with ID ${questID} not found.`);
            }
        }
    }
    

    // Method to update weapons in the quest
    private updateQuestWeapons(
        questID: string,
        weapons: string[],
        tables: IDatabaseTables,
        jsonUtil: JsonUtil,
        debug: boolean,
        availableForFinishIndex = 0// New parameter to specify the index
    ): void {
        const quest = tables.templates.quests[questID];
        if (quest) {
            try {
                // Extract existing weapons based on the specified index
                const existingWeapons = quest.conditions.AvailableForFinish[availableForFinishIndex].counter.conditions[0].weapon;
                // Clone the existing weapons array
                const updatedWeapons = jsonUtil.clone(existingWeapons);
                let modified = false;
    
                // Add new weapons if they do not already exist
                for (const weapon of weapons) {
                    if (!updatedWeapons.includes(weapon)) {
                        updatedWeapons.push(weapon);
                        modified = true;
    
                        if (debug) {
                            console.log(`Added new weapon ${weapon} to quest ${questID}`);
                        }
                    } else if (debug) {
                        console.log(`Quest ${questID} already has the weapon ${weapon}`);
                    }
                }
    
                // Only update the quest if modifications were made
                if (modified) {
                    quest.conditions.AvailableForFinish[availableForFinishIndex].counter.conditions[0].weapon = updatedWeapons;
    
                    if (debug) {
                        console.log(`Modified quest ${questID}:`, updatedWeapons);
                    }
                }
            } catch (error) {
                console.error(`Error modifying quest ${questID} weapons:`, error);
            }
        } else {
            console.warn(`Quest with ID ${questID} not found.`);
        }
    }
    

    // Method to update weapon mods inclusive in the quest
    private updateQuestWeaponMods(
        questID: string,
        weaponModsInclusive: string[][],
        tables: IDatabaseTables,
        jsonUtil: JsonUtil,
        debug: boolean,
        availableForFinishIndex = 0 // New parameter to specify the index
    ): void {
        const quest = tables.templates.quests[questID];
        if (quest) {
            try {
                // Extract existing weapon mods inclusive based on the specified index
                const availableForFinish = quest.conditions.AvailableForFinish;
                if (availableForFinish.length <= availableForFinishIndex) {
                    console.warn(`Index ${availableForFinishIndex} is out of bounds for AvailableForFinish in quest ${questID}.`);
                    return;
                }

                const existingWeaponModsInclusive = availableForFinish[availableForFinishIndex].counter.conditions[0].weaponModsInclusive;
                // Clone the existing weapon mods inclusive array
                const updatedWeaponModsInclusive = jsonUtil.clone(existingWeaponModsInclusive);
                let modified = false;

                // Add new weapon mods if they do not already exist
                for (const weaponModArray of weaponModsInclusive) {
                    for (const weaponMod of weaponModArray) {
                        if (!updatedWeaponModsInclusive.flat().includes(weaponMod)) {
                            updatedWeaponModsInclusive.push(weaponModArray);
                            modified = true;

                            if (debug) {
                                console.log(`Added new weapon mod ${weaponMod} to quest ${questID}`);
                            }
                        } else if (debug) {
                            console.log(`Quest ${questID} already has the weapon mod ${weaponMod}`);
                        }
                    }
                }

                // Only update the quest if modifications were made
                if (modified) {
                    availableForFinish[availableForFinishIndex].counter.conditions[0].weaponModsInclusive = updatedWeaponModsInclusive;

                    if (debug) {
                        console.log(`Modified quest ${questID}:`, updatedWeaponModsInclusive);
                    }
                }
            } catch (error) {
                console.error(`Error modifying quest ${questID} weapon mods inclusive:`, error);
            }
        } else {
            console.warn(`Quest with ID ${questID} not found.`);
        }
    }
    

    // Method to modify quests with specific items and updates
    public modifyQuests(tables: IDatabaseTables, jsonUtil: JsonUtil, debug: boolean): void {
        // Define new items
        const newSuppressors = [
            ["21592d3fa4a2a0fa07fc5c2e"],
            ["21cc9c10a1749109db74b288"],
            ["ee43d2dd34047cbe88ccf551"],
            ["ba84e1c4ee4d504cb0bdbb0d"],
            ["40c62378fa93a829532ecc5e"],
            ["6d9f22a75064ebb92b3ece1c"],
            ["10a09a7adb949d7516c96c2f"],
            ["ea0407e322d619bdb163795c"],
            ["9f56d67e30b6ee14fbd99821"],
            ["f8e4f114d51be3084526ebdd"],
            ["71da7f0c9145e92bd1022c53"],
            ["6504516826a65f22fcb408bb"],
            ["bd88c49e7facfbf335cbc734"],
            ["46985a823edd7a01b03450ed"],
            ["4129c7c9c0669b718451b168"],
            ["5285550299ccac9d530a7ed1"],
            ["8a25358a28252c3b7fcb7e4a"],
            ["d9c2ce5c957a54390a795cb9"],
            ["f1d4272393162487b5896f2f"],
            ["aac2e5628ec0f31213f1f53b"],
            ["96c3f1dba8c2038398a29d47"],
            ["48b2b70316ee11cd78074149"],
            ["82144d6a0be3285243f60c50"],
            ["0d26a697d357f0ea3f8f9a83"],
            ["1d145684ac5119451eec9699"],
            ["d29f21dabbdb6a8577bd5a4c"],
            ["55d267e876b4709cc2115736"],
            ["b9a6137901c6b1dd27c0c0cd"],
            ["68ecc6afc9baacad535b09b5"],
            ["cc4134b4c122adad37aa342a"],
            ["68ecc6afc9baacad535b09b5"],
            ["6efbc3fc36558fb085bbc36e"],
            ["3cc1a01be7839321ab030074"],
            ["f07b843f00a254d10d80ea5a"],
            ["9c8b54c2f8c843fe7ce6c6ca"],
            ["a6a1f3e9ff8c9bddaf8ab5f3"],
            ["21db41fa34f997937c78b9d1"],
            ["0a4fce1b6ffcba383df0def7"],
            ["b02e5f84df2f2f062a309ef9"],
            ["09b44a7e34b49045e3308e58"],
            ["edb383eec77614c936e627ec"],
            ["08ce1f8189bcb4aa4a490d28"],
            ["dfb4f1c3e5b85305c24ed2bc"],
            ["bfa234cc36aac6c9e1190ab1"],
            ["dd6b29946db0932ea75e09c4"],
            ["8d28d2b0bc17dad17f09676d"],
            ["a1fd0589018e71233daeb331"],
            ["45b07217916365a3171c079e"],
            ["005ea36cedb4cf3ed6503746"]
        ];
        const newScopes = [
            ["0afaf0c97b1d068d242df1dc"],
            ["797e1ab4422217d7cfe3d299"],
            ["c5042b1c75088ddfc6c196f4"],
            ["750bcfb1b1f84f27a8f4f282"],
            ["bf8cf7b9d0f73ce039591c65"],
            ["09f8fed0abd75fbd0f81cd91"],
            ["c3ad313c8108f49a65187daf"],
            ["aad949705aece28fb98b820f"],
            ["08eb2cce6b620c5c8550a0b5"],
            ["cd1f0458b18b79f2da3ad03f"],
            ["f5a80c63c2845fbc7c0c00b0"],
            ["85675a91454713828d6138e5"],
            ["cd609524dadc768a89f99bba"],
            ["5eb8a73e2c5eae1c5118afcb"],
            ["a87b4ff0e4df1af49c4d48b7"]
        ];
        const new74Us = [
            "ed05294ed53c0400ae0e8a55"
        ];
        const newM4s = [
            "4b81488c78c8a8ac7d37f9b9"
        ];
        const newBolties = [
            "0af5f6a5aa9712e11c733fb9"
        ];
        const newAKs = [
            "d672109946fe88b803449054",
            "939c742f7dad852286188029",
            "627c4fe34b0a558e8a3642a1",
            "ed05294ed53c0400ae0e8a55",
            "ffc95b9d143f52202a311820",
            "3dc691f607ffed3228bf6ca2",
            "52500592c7109667abb6cbeb"
        ];
        const newCarbinesandAssaultRifles = [
            "d672109946fe88b803449054",
            "939c742f7dad852286188029",
            "627c4fe34b0a558e8a3642a1",
            "ed05294ed53c0400ae0e8a55",
            "ffc95b9d143f52202a311820",
            "3dc691f607ffed3228bf6ca2",
            "93bcdfda236122e67c098847",
            "57f28a7ffb22e277b0234219",
            "e895575bcd1fa1de36d301b6",
            "4b81488c78c8a8ac7d37f9b9",
            "52ce1b65b13e1035808c4fd2",
            "96f5c38a676e11e13544dfba",
            "52500592c7109667abb6cbeb"
        ];

        // Update each quest individually with specific items
        this.updateQuestData(
            "59c512ad86f7741f0d09de9b", // Punisher 3
            new74Us,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "61e6e60223374d168a4576a6", // Compensation for damage - wager
            newAKs,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "64e7b9bffd30422ed03dad38", // Gendarmerie district patrol
            newCarbinesandAssaultRifles,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5bc4856986f77454c317bea7", // The Tarkov shooter Part 7
            newSuppressors,
            'weaponModsInclusive',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "59c50c8886f7745fed3193bf", // The Punisher Part 2
            newSuppressors,
            'weaponModsInclusive',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5a27bb8386f7741c770d2d0a", // Wet Job Part 1
            newSuppressors,
            'weaponModsInclusive',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5c0d4c12d09282029f539173", // Peacekeeping mission
            newM4s,
            'weapon',
            tables,
            jsonUtil,
            true,
            debug,
            0
        );
        this.updateQuestData(
            "63a9b229813bba58a50c9ee5", // Worst Job in the World
            newM4s,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5a27bb8386f7741c770d2d0a", // Wet Job Part 1
            newM4s,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5bc4776586f774512d07cf05", // The Tarkov shooter Part 1
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5bc479e586f7747f376c7da3", // The Tarkov shooter Part 2
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5bc47dbf86f7741ee74e93b9", // The Tarkov shooter Part 3
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5bc480a686f7741af0342e29", // The Tarkov shooter Part 4
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5bc4826c86f774106d22d88b", // The Tarkov shooter Part 5
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5bc4836986f7740c0152911c", // The Tarkov shooter Part 6
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5bc4856986f77454c317bea7", // The Tarkov shooter Part 7
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5bc4893c86f774626f5ebf3e", // The Tarkov shooter Part 8
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5c0bde0986f77479cf22c2f8", // A Shooter Born in Heaven
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            true,
            debug
        );
        this.updateQuestData(
            "5c0be13186f7746f016734aa", // Psycho Sniper
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            1
        );
        this.updateQuestData(
            "5d25e4ca86f77409dd5cdf2c", // Hunting trip
            newBolties,
            'weapon',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );
        this.updateQuestData(
            "5bc4776586f774512d07cf05", // The Tarkov shooter Part 1
            newScopes,
            'weaponModsExclusive',
            tables,
            jsonUtil,
            false,
            debug,
            0
        );

        // Debug output
        if (debug) {
            console.log('Updated quests with new items.');
        }
    }

}
