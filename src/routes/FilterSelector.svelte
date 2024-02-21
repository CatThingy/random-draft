<script lang="ts">
    import { DoublesTiers, NatDexTiers, SinglesTiers } from "./tiers";

    import Filter, { Category } from "./Filter.svelte";
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
            <Filter
                state={$filters.singles.get(tier)}
                marker={{ kind: Category.Singles, tier }}>{tier}</Filter
            >
        {/each}
    </div>
    <div class="ml-5 my-5 border-gray-300 border-r-2">
        <p class="font-bold text-center">Doubles</p>
        {#each Object.values(DoublesTiers) as tier}
            <Filter
                state={$filters.doubles.get(tier)}
                marker={{ kind: Category.Doubles, tier }}>{tier}</Filter
            >
        {/each}
    </div>
    <div class="ml-5 my-5 pr-2">
        <p class="font-bold text-center">National Dex</p>
        {#each Object.values(NatDexTiers) as tier}
            <Filter
                state={$filters.natdex.get(tier)}
                marker={{ kind: Category.NatDex, tier }}>{tier}</Filter
            >
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
