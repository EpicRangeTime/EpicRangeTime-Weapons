import { WTTInstanceManager } from "./WTTInstanceManager";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";

export class epicItemClass {

    private Instance: WTTInstanceManager = new WTTInstanceManager();

    public preSptLoad(Instance: WTTInstanceManager): void {
        this.Instance = Instance;
    }

    public postDBLoad(): void {

        this.epicEdits();
    }

    public epicEdits(): void {
        const db: IDatabaseTables = this.Instance.database;
        const dbItems = db.templates.items;
        for (let file in dbItems) {
            let fileData = dbItems[file];
            if (fileData._id === "5447a9cd4bdc2dbd208b4567") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5bb20d53d4351e4502010a69");
            } //pushing HK upper to M4A1
            if (fileData._id === "5bb2475ed4351e00853264e3") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5c0e2f26d174af02a9625114",
                    "55d355e64bdc2d962f8b4569",
                    "5d4405aaa4b9361e6a4e6bd3",
                    "5c07a8770db8340023300450",
                    "59bfe68886f7746004266202",
                    "63f5ed14534b2c3d5479a677",
                    "c6aa3fe86a9fc7ea6c220c2f",
                    "cc85761fc4963442077f9460");
            } // pushing M4 uppers to HK416
            if (fileData._id === "65266fd43341ed9aa903dd56") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5e208b9842457a4a7a33d074",
                    "5cc125555c98bf150a4fd068"
                );
            } //Pushing DTKP suppressor and new Wolverine to RPD barrels
            if (fileData._id === "6513eff1e06849f06c0957d4") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("5e208b9842457a4a7a33d074",
                    "5cc125555c98bf150a4fd068"
                );
            } //Pushing DTKP suppressor new Wolverine to RPD barrels
            if (fileData._id === "5c7e5f112e221600106f4ede") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("40c62378fa93a829532ecc5e",
                    "6d9f22a75064ebb92b3ece1c");
            } //Manually pushing the AAC-M4-2000 to the 5.56 51t flash hider
            if (fileData._id === "5fbbfabed5cb881a7363194e") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("9930f05d4e38813e5ef5ff90");
            } //Manually pushing .30 cal flash hider to MCX barrels
            if (fileData._id === "5fbbfacda56d053a3543f799") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("9930f05d4e38813e5ef5ff90");
            } //Manually pushing .30 cal flash hider to MCX barrels
            if (fileData._id === "5c0548ae0db834001966a3c2") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("5fbe3ffdf8b6a877a729ea82",
                    "5fd20ff893a8961fc660a954",
                    "619636be6db0f2477964e710",
                    "6196364158ef8c428c287d9f",
                    "6196365d58ef8c428c287da1",
                    "64b8725c4b75259c590fa899");
            } //Pushing .300blk to 5.56 AK mags
            if (fileData._id === "5ac66c5d5acfc4001718d314") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("5fbe3ffdf8b6a877a729ea82",
                    "5fd20ff893a8961fc660a954",
                    "619636be6db0f2477964e710",
                    "6196364158ef8c428c287d9f",
                    "6196365d58ef8c428c287da1",
                    "64b8725c4b75259c590fa899");
            } //Pushing .300blk to 5.56 AK mags
            if (fileData._id === "5d25a6538abbc306c62e630d") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1",
                    "6529302b8c26af6326029fb7");
            } //Pushing 6.8x51 to M700 mags
            if (fileData._id === "5d25a4a98abbc30b917421a4") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1",
                    "6529302b8c26af6326029fb7");
            } //Pushing 6.8x51 to M700 mags
            if (fileData._id === "5d25a7b88abbc3054f3e60bc") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1",
                    "6529302b8c26af6326029fb7");
            } //Pushing 6.8x51 to M700 mags
            if (fileData._id === "5ce69cbad7f00c00b61c5098") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1",
                    "6529302b8c26af6326029fb7");
            } //Pushing 6.8x51 to M700 mags
            if (fileData._id === "5d25a6a48abbc306c62e6310") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1",
                    "6529302b8c26af6326029fb7");
            } //Pushing 6.8x51 to M700 mags
            if (fileData._id === "5d25af8f8abbc3055079fec5") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1",
                    "6529302b8c26af6326029fb7");
            } //Pushing 6.8x51 to M700 mags
            if (fileData._id === "5cf12a15d7f00c05464b293f") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1",
                    "6529302b8c26af6326029fb7");;
            } //Pushing 6.8x51 to M700 mags
            if (fileData._id === "5bfeaa0f0db834001b734927") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1",
                    "6529302b8c26af6326029fb7");;
            } //Pushing 6.8x51 to M700 mags
            if (fileData._id === "5bfea7ad0db834001c38f1ee") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1",
                    "6529302b8c26af6326029fb7");
            } //Pushing 6.8x51 to M700 mags
            if (fileData._id === "59984ab886f7743e98271174") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("df1d3bfbd9835563f1574809",
                    "9d387502b50d1f4b0fb8b0ce");
            } //Manually pushing AK-12 and SAG buffer tube stock to vityaz
            if (fileData._id === "59f9cabd86f7743a10721f46") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("df1d3bfbd9835563f1574809",
                    "9d387502b50d1f4b0fb8b0ce");
            } //Manually pushing AK-12 and SAG buffer tube stock to saiga 9
            if (fileData._id === "57dc2fa62459775949412633") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("df1d3bfbd9835563f1574809",
                    "9d387502b50d1f4b0fb8b0ce");
            } //Manually pushing AK-12 stock and SAG buffer tube to AKS-74U
            if (fileData._id === "583990e32459771419544dd2") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("df1d3bfbd9835563f1574809",
                    "9d387502b50d1f4b0fb8b0ce");
            } //Manually pushing AK-12 stock and SAG buffer tube to AKS-74UN
            if (fileData._id === "5839a40f24597726f856b511") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("df1d3bfbd9835563f1574809",
                    "9d387502b50d1f4b0fb8b0ce"
                );
            } //Manually pushing AK-12 stock and SAG buffer tube to AKS-74UB
            if (fileData._id === "5bf3e0490db83400196199af") {
                fileData._props.Slots[6]._props.filters[0].Filter.push("df1d3bfbd9835563f1574809",
                    "9d387502b50d1f4b0fb8b0ce"
                );
            } //Manually pushing AK-12 stock and SAG buffer tube to AKS-74
            if (fileData._id === "5c6d11072e2216000e69d2e4") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5c6d11152e2216000f2003e7") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5c6c2c9c2e2216000f2002e4") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5d15ce51d7ad1a1eff619092") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "647dd2b8a12ebf96c3031655") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5efaf417aeb21837e749c7f2") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "6065881d1246154cad35d637") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5df916dfbb49d91fb446d6b9") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5d00ef6dd7ad1a0940739b16") {
                fileData._props.Slots[6]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "640b20359ab20e15ee445fa9") {
                fileData._props.Slots[6]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "638f2003bbd47aeb9e0ff637") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5ea16ada09aa976f2e7a51be") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "637f57d2f5ef8c33840d36c4") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "637f57c532b66e7e320a6676") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5d4405f0a4b9361e6a4e6bd9") {
                fileData._props.Slots[5]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5c78f2492e221600114c9f04") {
                fileData._props.Slots[9]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5c78f2612e221600114c9f0d") {
                fileData._props.Slots[9]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "6034e3e20ddce744014cb878") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5c6d5d8b2e221644fc630b39") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5888976c24597754281f93f5") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5b7bebc85acfc43bca706666") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5fc235db2770a0045c59c683") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5c59529a2e221602b177d160") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5c5db63a2e2216000f1b284a") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5b7be1ca5acfc400170e2d2f") {
                fileData._props.Slots[5]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5e5699df2161e06ac158df6f") {
                fileData._props.Slots[5]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5bfeb32b0db834001a6694d9") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de",
                    "690458c8c8f726648b11ac19");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5e56991336989c75ab4f03f6") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "5df25d3bfd6b4e6e2276dc9a") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2",
                    "0f8b8c2fc55b90cea6b5b63b",
                    "923987338260a1bb89e6a11b");
            } //Pushing new bipods manually to existing handguards
            if (fileData._id === "618b9682a3884f56c957ca78") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("81ee14e532991b2b9993ae0e",
                    "ac738256c846acc25b183a80",
                    "26f02172906cbaa1ae78e57d",
                    "87690b1fadc788a959d42e46");
            } //Pushing new RMR risers to the 30mm geissele ROF mounts
            if (fileData._id === "618ba92152ecee1505530bd3") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("81ee14e532991b2b9993ae0e",
                    "ac738256c846acc25b183a80",
                    "26f02172906cbaa1ae78e57d",
                    "87690b1fadc788a959d42e46");
            } //Pushing new RMR risers to the 30mm geissele ROF mounts
            if (fileData._id === "5580223e4bdc2d1c128b457f") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("64748d02d1c009260702b526");
            } //Pushing short barrel to double barrel shotgun
            if (fileData._id === "5ac66d9b5acfc4001633997a") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5e21ca18e4d47f0da15e77dd");
            } //Pushing 5.56 CNC warrior adapter to AK-105
            if (fileData._id === "5bf3e03b0db834001d2c4a9c") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5e21ca18e4d47f0da15e77dd");
            } //Pushing 5.56 CNC warrior adapter to AK-74
            if (fileData._id === "5ac4cd105acfc40016339859") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5e21ca18e4d47f0da15e77dd");
            } //Pushing 5.56 CNC warrior adapter to AK-74M
            if (fileData._id === "5644bd2b4bdc2d3b4c8b4572") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5e21ca18e4d47f0da15e77dd");
            } //Pushing 5.56 CNC warrior adapter to AK-74N
            if (fileData._id === "5bf3e0490db83400196199af") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5e21ca18e4d47f0da15e77dd");
            } //Pushing 5.56 CNC warrior adapter to AKS-74
            if (fileData._id === "5ab8e9fcd8ce870019439434") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5e21ca18e4d47f0da15e77dd");
            } //Pushing 5.56 CNC warrior adapter to AKS-74N
            if (fileData._id === "57dc2fa62459775949412633") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("5e21ca18e4d47f0da15e77dd");
            } //Pushing 5.56 CNC warrior adapter to AKS-74U
            if (fileData._id === "583990e32459771419544dd2") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("5e21ca18e4d47f0da15e77dd");
            } //Pushing 5.56 CNC warrior adapter to AKS-74UN
            if (fileData._id === "5839a40f24597726f856b511") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("5e21ca18e4d47f0da15e77dd");
            } //Pushing 5.56 CNC warrior adapter to AKS-74UB
            if (fileData._id === "55d3632e4bdc2d972f8b4569") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("45b07217916365a3171c079e");
            } //Manually pushing the AE M4 suppressor only to the AR 370mm barrel
            if (fileData._id === "5bb2475ed4351e00853264e3") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("5a33ca0fc4a282000d72292f",
                    "5c0faeddd174af02a962601f",
                    "5649be884bdc2d79388b4577",
                    "5d120a10d7ad1a4e1026ba85",
                    "602e3f1254072b51b239f713",
                    "5c793fb92e221644f31bfb64",
                    "5c793fc42e221600114ca25d",
                    "638de3603a1a4031d8260b8c");
            } //Pushing all AR stocks to HK416
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19"
                );
            } //Pushing Small barters to small trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19"
                );
            } //Pushing Small barters to small trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19"
                );
            } //Pushing Small barters to small trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[5]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19"
                );
            } //Pushing Small barters to small trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[6]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19"
                );
            } //Pushing Small barters to small trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[7]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19"
                );
            } //Pushing Small barters to small trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[8]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19"
                );
            } //Pushing Small barters to small trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[9]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[10]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[11]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[12]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[13]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "63dbd45917fff4dee40fe16e") {
                fileData._props.Slots[14]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[6]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[7]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[8]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[9]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[10]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[11]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[12]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[13]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[14]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[15]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[16]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[17]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[18]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[19]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[20]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[21]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[22]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[23]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[24]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[25]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[26]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[27]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[28]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "65424185a57eea37ed6562e9") {
                fileData._props.Slots[29]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[10]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[11]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[12]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[13]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[14]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[15]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[16]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[17]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[18]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[19]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[20]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[21]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[22]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[23]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[24]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[25]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[26]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[27]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[28]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[29]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[30]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[31]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[32]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[33]._props.filters[0].Filter.push("0554e5da796b8133eb65b389",
                    "42b95b1bf04e5b70d4005d19");
            } //Pushing Small barters to small trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[34]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[35]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[36]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[37]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[38]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[39]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[40]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[41]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[42]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[43]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[44]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[45]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[46]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[47]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[48]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[49]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[50]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[51]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[52]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[53]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[54]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[55]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[56]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "6542435ea57eea37ed6562f0") {
                fileData._props.Slots[57]._props.filters[0].Filter.push("e44b40d309fa123643258996",
                    "349f9715d8899a1d4ca845c0"
                );
            } //Pushing large barters to large trophy case
            if (fileData._id === "5ae30bad5acfc400185c2dc4") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("66713838ca123f9df8e7584e",
                    "23878a19adddf4afbbcc0537"
                );
            } //Pushing Carry handle mounts to carry handle
            if (fileData._id === "5ae30bad5acfc400185c2dc4") {
                fileData._props.Prefab.path = "assets/content/items/mods/sights_rear/sight_rear_ar15_colt_carry_hande_std.bundle";
            } //Changing carry handle prefab path
            if (fileData._id === "5ae30bad5acfc400185c2dc4") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing carry handle parent
            if (fileData._id === "55d5f46a4bdc2d1b198b4567") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing A2 rear sight parent
            if (fileData._id === "5bfd4c980db834001b73449d") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing Mosin Carbine rear sight parent
            if (fileData._id === "5ae099925acfc4001a5fc7b3") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing Mosin Rifle rear sight parent
            if (fileData._id === "59d650cf86f7741b846413a4") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing AKM std rear sight parent
            if (fileData._id === "5a0eb980fcdbcb001a3b00a6") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing AKMB rear sight parent
            if (fileData._id === "628a7b23b0f75035732dd565") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing TDV2 rear sight parent
            if (fileData._id === "5ac733a45acfc400192630e2") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing AK105 rear sight parent
            if (fileData._id === "5649b0544bdc2d1b2b8b458a") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing AK74 rear sight parent
            if (fileData._id === "5ac72e475acfc400180ae6fe") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing AK74M rear sight parent
            if (fileData._id === "649ec2cec93611967b03495e") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing AK-12 rear sight parent
            if (fileData._id === "5bf3f59f0db834001a6fa060") {
                fileData._parent = "55818ad54bdc2ddc698b4569";
            } //Changing RPK16 rear sight parent
            if (fileData._id === "651450ce0e00edc794068371") {
                fileData._props.bFirerate = 750;
            } //Changing RPK16 rear sight parent
            if (fileData._id === "5ae30bad5acfc400185c2dc4") {
                fileData._props.ConflictingItems = [
                    "61817865d3a39d50044c13a4",
                    "5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"
                ];
            } //Changing carry handle conflicting items
            if (fileData._id === "5c0e2f26d174af02a9625114") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "55d355e64bdc2d962f8b4569") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5d4405aaa4b9361e6a4e6bd3") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5c07a8770db8340023300450") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "59bfe68886f7746004266202") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "63f5ed14534b2c3d5479a677") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "6529119424cbe3c74a05e5bb") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5bb20d53d4351e4502010a69") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5c488a752e221602b412af63") {
                fileData._props.Slots[5]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5dcbd56fdbd3d91b3e5468d5") {
                fileData._props.Slots[5]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5df8e4080b92095fd441e594") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5fc278107283c4046c581489") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "602e63fb6335467b0c5ac94d") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "606587a88900dc2d9a55b659") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "6165adcdd3a39d50044c120f") {
                fileData._props.Slots[2]._props.filters[0].Filter = ["61817865d3a39d50044c13a4",
                    "5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "6165aeedfaa1272e431521e3") {
                fileData._props.Slots[2]._props.filters[0].Filter = ["61817865d3a39d50044c13a4",
                    "5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "61713a8fd92c473c770214a4") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "618405198004cc50514c3594") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["61817865d3a39d50044c13a4",
                    "5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "618426d96c780c1e710c9b9f") {
                fileData._props.Slots[3]._props.filters[0].Filter = ["61817865d3a39d50044c13a4",
                    "5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "62811fbf09427b40ab14e767") {
                fileData._props.Slots[2]._props.filters[0].Filter = ["5bb20e49d4351e3bac1212de",
                    "5ba26b17d4351e00367f9bdd",
                    "5dfa3d7ac41b2312ea33362a",
                    "5c1780312e221602b66cc189",
                    "5fb6564947ce63734e3fa1da",
                    "5bc09a18d4351e003562b68e",
                    "5c18b9192e2216398b5a8104",
                    "5fc0fa957283c4046c58147e",
                    "5894a81786f77427140b8347",
                    "55d5f46a4bdc2d1b198b4567"];
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5c0e2f26d174af02a9625114") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "55d355e64bdc2d962f8b4569") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5d4405aaa4b9361e6a4e6bd3") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5c07a8770db8340023300450") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "59bfe68886f7746004266202") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "63f5ed14534b2c3d5479a677") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "6529119424cbe3c74a05e5bb") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5bb20d53d4351e4502010a69") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5c488a752e221602b412af63") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5dcbd56fdbd3d91b3e5468d5") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5df8e4080b92095fd441e594") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "5fc278107283c4046c581489") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "602e63fb6335467b0c5ac94d") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "606587a88900dc2d9a55b659") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "6165adcdd3a39d50044c120f") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "6165aeedfaa1272e431521e3") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "61713a8fd92c473c770214a4") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "618405198004cc50514c3594") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "618426d96c780c1e710c9b9f") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "62811fbf09427b40ab14e767") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5ae30bad5acfc400185c2dc4");
            } //Changing filters for AR15 rear sights
            if (fileData._id === "628a66b41d5e41750e314f34") {
                fileData._props.Slots=[
                    {
                      "_id": "41d4699a7cded67adf9cd69a",
                      "_mergeSlotWithChildren": false,
                      "_name": "mod_muzzle",
                      "_parent": "628a66b41d5e41750e314f34",
                      "_props": {
                        "filters": [
                          {
                            "Filter": [
                              "c55bf7b1464db07d86ea62e8"
                            ],
                            "Shift": 0
                          }
                        ]
                      },
                      "_proto": "55d30c4c4bdc2db4468b457e",
                      "_required": false
                    }
                  ];
            } //Adding muzzle slot for keymount 7.62 muzzle brake
            if (fileData._id === "55d35ee94bdc2d61338b4568") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AR 260mm barrel
            if (fileData._id === "55d3632e4bdc2d972f8b4569") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AR 370mm barrel
            if (fileData._id === "5d440b93a4b9364276578d4b") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AR 457mm barrel
            if (fileData._id === "5d440b9fa4b93601354d480c") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AR 508mm barrel
            if (fileData._id === "5c0e2f94d174af029f650d56") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AR 508mm barrel
            if (fileData._id === "63d3ce0446bd475bcb50f55f") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AR Hanson 348mm barrel
            if (fileData._id === "63d3d44a2a49307baf09386d") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AR Hanson 406mm barrel
            if (fileData._id === "5cf67cadd7f00c065a5abab7") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SKS WT0032 adapter
            if (fileData._id === "5cf67cadd7f00c065a5abab7") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to RFB Thread spacer
            if (fileData._id === "628b9c37a733087d0d7fe84b") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AK545 short
            if (fileData._id === "628b5638ad252a16da6dd245") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AK545
            if (fileData._id === "5bf3e03b0db834001d2c4a9c") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AK74
            if (fileData._id === "5ac4cd105acfc40016339859") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AK74M
            if (fileData._id === "5644bd2b4bdc2d3b4c8b4572") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AK74M
            if (fileData._id === "5ac66cb05acfc40198510a10") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AK101
            if (fileData._id === "5ac66d015acfc400180ae6e4") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AK102
            if (fileData._id === "5ac66d2e5acfc43b321d4b53") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AK103
            if (fileData._id === "5ac66d725acfc43b321d4b60") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AK104
            if (fileData._id === "5ac66d9b5acfc4001633997a") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AK105
            if (fileData._id === "5bf3e0490db83400196199af") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AKS74
            if (fileData._id === "5ab8e9fcd8ce870019439434") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AKS74N
            if (fileData._id === "57dc2fa62459775949412633") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AKS74U
            if (fileData._id === "583990e32459771419544dd2") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AKS74UN
            if (fileData._id === "5839a40f24597726f856b511") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AKS74UB
            if (fileData._id === "62e7c7f3c34ea971710c32fc") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AUG A1 20 inch
            if (fileData._id === "630e39c3bd357927e4007c15") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AUG A3 16 inch
            if (fileData._id === "6333f05d1bc0e6217a0e9d34") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to AUG A1 16 inch
            if (fileData._id === "5c48a2852e221602b21d5923") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to MDR 556 barrel
            if (fileData._id === "5dcbe9431e1f4616d354987e") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to MDR 762 barrel
            if (fileData._id === "622b379bf9cfc87d675d2de5") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to G36 228mm
            if (fileData._id === "622b3858034a3e17ad0b81f5") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to G36 318mm
            if (fileData._id === "622b38c56762c718e457e246") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to G36 480mm
            if (fileData._id === "61702be9faa1272e431522c3") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to 417 16.5 inch barrel
            if (fileData._id === "5bb20d92d4351e00853263eb") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to 416 11 inch barrel
            if (fileData._id === "5bb20d9cd4351e00334c9d8a") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to 416 14.5 inch barrel
            if (fileData._id === "5bb20da5d4351e0035629dbf") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to 416 16.5 inch barrel
            if (fileData._id === "5bb20dadd4351e00367faeff") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to 416 20 inch barrel
            if (fileData._id === "5c6d85e02e22165df16b81f4") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to 416 10.6 inch barrel
            if (fileData._id === "5fbbfabed5cb881a7363194e") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to MCX 171mm barrel
            if (fileData._id === "5fbbfacda56d053a3543f799") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to MCX 229mm barrel
            if (fileData._id === "652910565ae2ae97b80fdf35") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068",
                    "612e0d3767085e45ef14057f",
                  "5b7d693d5acfc43bca706a3d",
                  "5a34fd2bc4a282329a73b4c5",
                  "6065c6e7132d4d12c81fd8e1",
                  "5d1f819086f7744b355c219b",
                  "5dcbe965e4ed22586443a79d",
                  "5d026791d7ad1a04a067ea63",
                  "5dfa3cd1b33c0951220c079b",
                  "6130c43c67085e45ef1405a1",
                  "5cdd7685d7f00c000f260ed2",
                  "5c878e9d2e2216000f201903",
                  "5d02677ad7ad1a04a15c0f95",
                  "5bbdb8bdd4351e4502011460",
                  "5cdd7693d7f00c0010373aa5",
                  "607ffb988900dc2d9a55b6e4",
                  "615d8eb350224f204c1da1cf",
                  "612e0e3c290d254f5e6b291d",
                  "5d443f8fa4b93678dd4a01aa",
                  "5c7954d52e221600106f4cc7",
                  "5fbc22ccf24b94483f726483",
                  "59bffc1f86f77435b128b872",
                  "5cf78496d7f00c065703d6ca",
                  "5d270ca28abbc31ee25ee821",
                  "5d270b3c8abbc3105335cfb8",
                  "5fbe7618d6fa9c00c571bb6c",
                  "628a66b41d5e41750e314f34",
                  "618178aa1cb55961fa0fdc80",
                  "6642f63667f5cb56a00662eb"
                );
            } //Manually add wolverine and other muzzle devices to Spear 330mm 6.8 barrel
            if (fileData._id === "60658776f2cb2e02a42ace2b") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to Mk47 254mm barrel
            if (fileData._id === "6065878ac9cf8012264142fd") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to Mk47 254mm barrel
            if (fileData._id === "628a60ae6b1d481ff772e9c8") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to RD704
            if (fileData._id === "5b099a765acfc47a8607efe3") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SA58 11 inch barrel
            if (fileData._id === "5b7be1125acfc4001876c0e5") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SA58 16 inch barrel
            if (fileData._id === "5b7be1265acfc400161d0798") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SA58 21 inch barrel
            if (fileData._id === "618168b350224f204c1da4d8") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SCAR 762 13 inch barrel
            if (fileData._id === "6183b0711cb55961fa0fdcad") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SCAR 762 16 inch barrel
            if (fileData._id === "6183b084a112697a4b3a6e6c") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SCAR 762 20 inch barrel
            if (fileData._id === "6183fc15d3a39d50044c13e9") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SCAR 556 10 inch barrel
            if (fileData._id === "6183fd911cb55961fa0fdce9") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SCAR 556 14 inch barrel
            if (fileData._id === "6183fd9e8004cc50514c358f") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SCAR 556 18 inch barrel
            if (fileData._id === "5bfebc320db8340019668d79") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to M700 20 inch barrel
            if (fileData._id === "5d2703038abbc3105103d94c") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to M700 20 inch barrel stainless
            if (fileData._id === "5cf79389d7f00c10941a0c4d") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to Mosin Kiba AKM adapter
            if (fileData._id === "5cf67a1bd7f00c06585fb6f3") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to Mosin WT AK103 adapter
            if (fileData._id === "5cf79599d7f00c10875d9212") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to Mosin TR x51 adapter
            if (fileData._id === "5ab3afb2d8ce87001660304d") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to M1a threaded gas block
            if (fileData._id === "5a34f7f1c4a2826c6e06d75d") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to RSASS 18 inch barrel
            if (fileData._id === "5a34fae7c4a2826c6e06d760") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to RSASS 22 inch barrel
            if (fileData._id === "5df917564a9f347bc92edca3") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SR25 16 inch barrel
            if (fileData._id === "5dfa397fb11454561e39246c") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to SR25 20 inch barrel
            if (fileData._id === "660126f7c752a02bbe05e688") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to M60E4 458mm barrel
            if (fileData._id === "66012788c752a02bbe05e68e") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to M60E4 475mm barrel
            if (fileData._id === "6601279cc752a02bbe05e692") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to M60E3 584mm barrel
            if (fileData._id === "66225d88a1c7e3b81600c76f") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to M60E6 458mm barrel
            if (fileData._id === "5beec1bd0db834001e6006f3") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to RPK16 15 inch barrel
            if (fileData._id === "5beec2820db834001b095426") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5cc125555c98bf150a4fd068");
            } //Manually add wolverine to RPK16 22 inch barrel
            if (fileData._id === "57ac965c24597706be5f975c") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("eeb62fba336b644c26813276");
            } //Manually add rmr mount to elcan black
            if (fileData._id === "57aca93d2459771f2c7e26db") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("eeb62fba336b644c26813276");
            } //Manually add rmr mount to elcan fde
            if (fileData._id === "615d8d878004cc50514c3233") {
                fileData._props.ConflictingItems=[];
            } //Manually add rmr mount to elcan fde
            if (fileData._id === "5d440b9fa4b93601354d480c") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("ac14dc7aa887301d799e3b2b")
            } //Manually add AEM Brake to 20 inch AR15 barrel
            if (fileData._id === "5d440b93a4b9364276578d4b") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("ac14dc7aa887301d799e3b2b")
            } //Manually add AEM Brake to 18 inch AR15 barrel
            if (fileData._id === "63d3d44a2a49307baf09386d") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("ac14dc7aa887301d799e3b2b")
            } //Manually add AEM Brake to Hansen 16 inch AR15 barrel
            if (fileData._id === "5c0e2f94d174af029f650d56") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("ac14dc7aa887301d799e3b2b")
            } //Manually add AEM Brake to Molot 16 inch AR15 barrel
        }
    }


}
