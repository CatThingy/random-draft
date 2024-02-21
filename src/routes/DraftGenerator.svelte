<script lang="ts">
    import { dex } from "./dex";
    import { filters } from "./filters";
    import { DoublesTiers, NatDexTiers, SinglesTiers } from "./tiers";

    let count = 48;
    let output: String[] = [];

    function generate(_event: MouseEvent) {
        output = [];
        let valid: String[] = [];

        for (const pokemon of $dex.values()) {
            let add = true;
            for (const [tier, filter] of $filters.singles.entries()) {
                if (!filter && pokemon["tier"] == tier) {
                    add = false;
                }
            }

            for (const [tier, filter] of $filters.doubles.entries()) {
                if (!filter && pokemon["doublesTier"] == tier) {
                    add = false;
                }
            }

            for (const [tier, filter] of $filters.natdex.entries()) {
                if (!filter && pokemon["natDexTier"] == tier) {
                    add = false;
                }
            }

            if (
                !Object.values(SinglesTiers).includes(pokemon["tier"]) &&
                !Object.values(DoublesTiers).includes(pokemon["doublesTier"]) &&
                !Object.values(NatDexTiers).includes(pokemon["natDexTier"])
            ) {
                add = false;
            }

            if (add) {
                valid.push(pokemon["name"]);
            }
        }

        if (valid.length < count) {
            output = [
                "Not enough Pokemon; try removing some filters or decreasing the amount.",
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
            class="invalid:border-red-300 border-gray-300 border-b-2 w-[2em] m-2 text-right"
            inputmode="numeric"
            pattern="\d+"
        />
    </label>
</div>
<div>
    <button
        class="p-2 border-gray-400 border-[1px] rounded-md bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
        on:click={generate}>Generate</button
    >
</div>
<div class="grid grid-cols-4">
    {#each output as name}
        <p>{name}</p>
    {/each}
</div>
