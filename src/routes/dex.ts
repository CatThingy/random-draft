import { writable } from "svelte/store";
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
            for (const entry of Object.entries(formats)) {
                let key: String = entry[0];
                let value: any = entry[1];

                if (dex.has(key)) {
                    let data = dex.get(key);

                    data["doublesTier"] = value["doublesTier"];
                    data["natDexTier"] = value["natDexTier"];
                }
            }
            return dex;
        }).then(value => set(value));
    return { subscribe };
})();
