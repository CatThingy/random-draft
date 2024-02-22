import { writable } from "svelte/store";
import { DoublesTiers, NatDexTiers, SinglesTiers } from "./tiers";
export const dex = (() => {
    const { subscribe, set } = writable(new Map<String, any>());

    let dex = fetch("http://play.pokemonshowdown.com/data/pokedex.json")
        .then((data) => data.json())
        .then((data) => {
            let filtered = new Map();
            for (const entry of Object.entries(data)) {
                let key: String = entry[0];
                let value: any = entry[1];

                if (value["isNonstandard"] == "Custom") {
                    continue;
                }
                filtered.set(key, value);
            }
            return filtered;
        })
    let formats = fetch("https://play.pokemonshowdown.com/data/formats-data.js")
        .then((data) => data.text())
        // WARNING: EXTREMELY DANGER
        // I trust Smogon to not change this format.
        .then((data) => eval("(" + data.split("= ")[1].slice(0, -1) + ")"));
    Promise.all([dex, formats])
        .then(([dex, formats]) => {
            for (const entry of dex.entries()) {
                let key: string = entry[0];
                let dexEntry: any = entry[1];
                if (formats[key] != null) {
                    let format_data = formats[key];
                    console.log(format_data);

                    dexEntry["doublesTier"] = format_data["doublesTier"];
                    dexEntry["natDexTier"] = format_data["natDexTier"];

                    let has_formats =
                        Object.values(SinglesTiers).includes(dexEntry["tier"]) ||
                        Object.values(DoublesTiers).includes(dexEntry["doublesTier"]) ||
                        Object.values(NatDexTiers).includes(dexEntry["natDexTier"]);

                    if (!has_formats) {
                        dex.delete(key);
                    }
                }
                else {
                    dex.delete(key);
                }
            }
            return dex;
        }).then(value => { console.log(value); set(value); });
    return { subscribe };
})();
