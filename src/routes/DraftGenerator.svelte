<script lang="ts">
    import { dex } from "./dex";
    import { AttributeKind, FilterState, filters } from "./filters";

    let count = 48;
    let output: String[] = [];

    function generate(_event: MouseEvent) {
        output = [];
        let valid: String[] = [];

        for (const pokemon of $dex.values()) {
            let add = true;
            for (const [tier, filter] of $filters.singles.entries()) {
                if (
                    (filter == FilterState.Exclude &&
                        pokemon["tier"] == tier) ||
                    (filter == FilterState.Require && pokemon["tier"] != tier)
                ) {
                    add = false;
                }
            }

            for (const [tier, filter] of $filters.doubles.entries()) {
                if (
                    (filter == FilterState.Exclude &&
                        pokemon["doublesTier"] == tier) ||
                    (filter == FilterState.Require &&
                        pokemon["doublesTier"] != tier)
                ) {
                    add = false;
                }
            }

            for (const [tier, filter] of $filters.natdex.entries()) {
                if (
                    (filter == FilterState.Exclude &&
                        pokemon["natDexTier"] == tier) ||
                    (filter == FilterState.Require &&
                        pokemon["natDexTier"] != tier)
                ) {
                    add = false;
                }
            }

            for (const { attribute, filter } of $filters.attribute.values()) {
                let filterMatches;
                switch (attribute.kind) {
                    case AttributeKind.Stats:
                        filterMatches = attribute.evaluator(
                            pokemon["baseStats"][attribute.stat],
                        );
                        break;
                    case AttributeKind.Height:
                        filterMatches = attribute.evaluator(pokemon["heightm"]);
                        break;
                    case AttributeKind.Weight:
                        filterMatches = attribute.evaluator(
                            pokemon["weightkg"],
                        );
                        break;
                    case AttributeKind.Ability:
                        filterMatches = pokemon["abilities"].includes(
                            attribute.ability.toLowerCase(),
                        );
                        break;
                    case AttributeKind.Type:
                        filterMatches = pokemon["types"].includes(
                            attribute.type.toLowerCase(),
                        );
                        break;
                    case AttributeKind.EggGroups:
                        filterMatches = pokemon["eggGroups"].includes(
                            attribute.group.toLowerCase(),
                        );
                        break;
                }

                if (
                    (filter == FilterState.Require && !filterMatches) ||
                    (filter == FilterState.Exclude && filterMatches)
                ) {
                    add = false;
                }
            }

            if (add) {
                valid.push(pokemon["name"]);
            }
        }

        if (valid.length < count) {
            output = [
                `Only ${valid.length} pokemon match${
                    valid.length == 1 ? "es" : ""
                } these filters; try removing some filters or decreasing the amount.`,
            ];
            return;
        }

        for (let i = 0; i < count; i++) {
            let num = Math.floor(Math.random() * valid.length);
            output.push(new String(valid[num]));
            valid[num] = valid[valid.length - 1];
            valid.pop();
        }
    }
</script>

<div>
    <label>
        Amount:
        <input
            bind:value={count}
            class="invalid:border-red-300 border-gray-300 border-b-2 w-[2em] m-2 text-right bg-transparent"
            inputmode="numeric"
            pattern="\d+"
        />
    </label>
</div>
<div>
    <button
        class="text-black px-2 py-1 my-1 border-gray-400 border-[1px] rounded-md bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
        on:click={generate}>Generate</button
    >
</div>
<div class="grid grid-cols-4 w-3/4">
    {#each output as name, id}
        {#if id % 24 == 0}
            <hr class="border-gray-400" />
            <hr class="border-gray-400" />
            <hr class="border-gray-400" />
            <hr class="border-gray-400" />
        {/if}
        <p>{name}</p>
    {/each}
</div>
