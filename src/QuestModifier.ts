/* eslint-disable @typescript-eslint/naming-convention */
import { WTTInstanceManager } from "./WTTInstanceManager";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { JsonUtil } from "@spt/utils/JsonUtil";

export class QuestModifier {
    /**
     * Modify the quests in the given tables using the provided JSON utility.
     *
     * @param {IDatabaseTables} tables - the tables containing the quests
     * @param {JsonUtil} jsonUtil - the JSON utility for cloning objects
     * @return {void} 
     */
    public modifyQuests(tables: IDatabaseTables, jsonUtil: JsonUtil, debug: boolean): void {
         // Define new pistols
         const newm4s = [
            "4b81488c78c8a8ac7d37f9b9"
        ];
        const newsuppressors = [
            [
            "21592d3fa4a2a0fa07fc5c2e"
            ],
            [
            "21cc9c10a1749109db74b288"
            ],
            [
            "ba84e1c4ee4d504cb0bdbb0d"
            ],
            [
            "40c62378fa93a829532ecc5e"
            ],
            [
            "6d9f22a75064ebb92b3ece1c"
            ]
        ];
        const newbolties = [
            "0af5f6a5aa9712e11c733fb9"
        ];
        const newaks74us = [
            "939c742f7dad852286188029",
            "627c4fe34b0a558e8a3642a1",
            "ed05294ed53c0400ae0e8a55"
        ];
        // Get the specific quest
        const punisherpt3 = tables.templates.quests["59c512ad86f7741f0d09de9b"];
        if (punisherpt3) {
            // Extract existing pistols
            const existingPunisher74us = punisherpt3.conditions.AvailableForFinish[0].counter.conditions[0].weapon;
            try {
                // Clone the existing pistols array
                const updated74us = jsonUtil.clone(existingPunisher74us);
                let modified = false;
                // Add new pistols if they do not already exist
                for (const ak74us of newaks74us) {
                    if (!newaks74us.includes(ak74us)) {
                        newaks74us.push(ak74us);
                        modified = true;

                        if (debug) {
                            console.log("Added new Punisher 74us");
                        }
                    }
                    else {
                        if (debug) {
                            console.log("Punisher 3 already has the new item IDs");
                        }
                    }
                }
                // Only update the quest if modifications were made
                if (modified) {
                    punisherpt3.conditions.AvailableForFinish[0].counter.conditions[0].weapon = updated74us;

                    if (debug) {
                        console.log("Modified quest:", punisherpt3.conditions.AvailableForFinish[0].counter.conditions[0].weapon);
                    }
                }
            }
            catch (error) {
                console.error("Error modifying quests:", error);
            }
        }
            
        const wetjobpt1 = tables.templates.quests["5a27bb8386f7741c770d2d0a"];
        
        const tarkshooterpt1 = tables.templates.quests["5bc4776586f774512d07cf05"];
        
        const punisher2 = tables.templates.quests["59c50c8886f7745fed3193bf"];
    }


}
