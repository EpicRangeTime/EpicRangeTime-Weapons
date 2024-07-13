/* eslint-disable @typescript-eslint/naming-convention */
import { WTTInstanceManager } from "./WTTInstanceManager";
import * as customAssortSchemes from "../db/CustomAssortSchemes/CustomAssortSchemes.json";
import { traderIDs } from "./references/configConsts";
import { ITraderAssort } from "@spt/models/eft/common/tables/ITrader";
export class CustomAssortSchemeService 
{
    private Instance: WTTInstanceManager;

    public preSptLoad(Instance: WTTInstanceManager): void 
    {
        this.Instance = Instance;
    }

    public postDBLoad(): void 
    {
        const tables = this.Instance.database;
        for (const traderId in customAssortSchemes)
        {
            const traderIdFromMap = traderIDs[traderId];
            const finalTraderId = traderIdFromMap || traderId;
            const trader = tables.traders[finalTraderId];
                
            if (!trader) 
            {
                return;
            }

            const newAssort : ITraderAssort = customAssortSchemes[traderId];
    
            for (const item of newAssort.items) 
            {
                trader.assort.items.push(item);
            }
            for (const [itemName, scheme] of Object.entries(newAssort.barter_scheme)) 
            {
                trader.assort.barter_scheme[itemName] = scheme;
            }
    
            for (const [itemName, count] of Object.entries(newAssort.loyal_level_items)) 
            {
                trader.assort.loyal_level_items[itemName] = count;
            }
                        
        }
    }
    

}
