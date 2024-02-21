<script lang="ts" context="module">
</script>

<script lang="ts">
    import {
        DoublesTiers,
        NatDexTiers,
        SinglesTiers,
    } from "./tiers";

    import { filters } from "./filters";

    function updateSinglesFilter(label: SinglesTiers) {
        return (event: MouseEvent) => {
            let target: any = event.target;
            $filters.singles.set(label, target.checked);
        };
    }

    function updateDoublesFilter(label: DoublesTiers) {
        return (event: MouseEvent) => {
            let target: any = event.target;
            $filters.doubles.set(label, target.checked);
        };
    }

    function updateNatDexFilter(label: NatDexTiers) {
        return (event: MouseEvent) => {
            let target: any = event.target;
            $filters.natdex.set(label, target.checked);
        };
    }
</script>

<div class="grid grid-cols-3 border-gray-300 rounded-md border-2">
    <div class="ml-5 my-5 border-gray-300 border-r-2">
        <p class="font-bold text-center">Singles</p>
        {#each Object.values(SinglesTiers) as tier}
            <label class="block">
                <input
                    class="peer"
                    type="checkbox"
                    checked={$filters.singles.get(tier)}
                    on:click={updateSinglesFilter(tier)}
                />
                <span
                    class="checkbox peer-checked:bg-gray-100 peer-checked:border-gray-300 bg-red-400 border-red-400"
                >
                    <div
                        class="shrink-0 w-full h-1/5 bg-white top-[40%] relative"
                    ></div>
                </span>
                {tier}
            </label>
        {/each}
    </div>
    <div class="ml-5 my-5 border-gray-300 border-r-2">
        <p class="font-bold text-center">Doubles</p>
        {#each Object.values(DoublesTiers) as tier}
            <label class="block">
                <input
                    class="peer"
                    type="checkbox"
                    checked={$filters.doubles.get(tier)}
                    on:click={updateDoublesFilter(tier)}
                />
                <span
                    class="checkbox peer-checked:bg-gray-100 peer-checked:border-gray-300 bg-red-400 border-red-400"
                >
                    <div
                        class="shrink-0 w-full h-1/5 bg-white top-[40%] relative"
                    ></div>
                </span>
                {tier}
            </label>
        {/each}
    </div>
    <div class="ml-5 my-5 pr-2">
        <p class="font-bold text-center">National Dex</p>
        {#each Object.values(NatDexTiers) as tier}
            <label class="block">
                <input
                    class="peer"
                    type="checkbox"
                    checked={$filters.natdex.get(tier)}
                    on:click={updateNatDexFilter(tier)}
                />
                <span
                    class="checkbox peer-checked:*:hidden peer-checked:bg-gray-100 peer-checked:border-gray-300 bg-red-400 border-red-400"
                >
                    <div
                        class="shrink-0 w-full h-1/5 bg-white top-[40%] relative"
                    ></div>
                </span>
                {tier}
            </label>
        {/each}
    </div>
</div>

<style lang="postcss">
    .checkbox {
        @apply select-none aspect-square w-[1em] h-[1em] rounded-sm border-2 mx-1 p-[-0.25em] inline-block;
    }

    label input {
        visibility: hidden;
        display: block;
        height: 0;
        width: 0;
        position: absolute;
        overflow: hidden;
    }
</style>
