<script context="module" lang="ts">
    export enum Category {
        Singles,
        Doubles,
        NatDex,
    }

    export interface SinglesLabel {
        kind: Category.Singles;
        tier: SinglesTiers;
    }

    export interface DoublesLabel {
        kind: Category.Doubles;
        tier: DoublesTiers;
    }

    export interface NatDexLabel {
        kind: Category.NatDex;
        tier: NatDexTiers;
    }

    type Marker = SinglesLabel | DoublesLabel | NatDexLabel;
</script>

<script lang="ts">
    import { FilterState, filters } from "./filters";
    import { DoublesTiers, NatDexTiers, SinglesTiers } from "./tiers";

    export let state: FilterState = FilterState.Ignore;
    export let marker: Marker;

    function updateFilter() {
        if (state == FilterState.Ignore) {
            state = FilterState.Require;
        } else if (state == FilterState.Require) {
            state = FilterState.Exclude;
        } else if (state == FilterState.Exclude) {
            state = FilterState.Ignore;
        }

        switch (marker.kind) {
            case Category.Singles:
                $filters.singles.set(marker.tier, state);
                break;
            case Category.Doubles:
                $filters.doubles.set(marker.tier, state);
                break;
            case Category.NatDex:
                $filters.natdex.set(marker.tier, state);
                break;
        }
    }
</script>

<button class="block w-full text-left" on:click={updateFilter}>
    <span
        class="checkbox {state == FilterState.Require
            ? 'require'
            : state == FilterState.Exclude
              ? 'exclude'
              : 'ignore'}"
    >
        {#if state == FilterState.Require}
            <div
                class="shrink-0 w-full h-1/5 bg-white top-[40%] relative rotate-90"
            ></div>
            <div
                class="shrink-0 w-full h-1/5 bg-white top-[20%] relative"
            ></div>
        {:else if state == FilterState.Exclude}
            <div
                class="shrink-0 w-full h-1/5 bg-white top-[40%] relative"
            ></div>
        {/if}
    </span>
    <slot />
</button>

<style lang="postcss">
    .checkbox {
        @apply select-none aspect-square w-[1em] h-[1em] rounded-sm border-2 mx-1 p-[-0.25em] inline-block;
    }

    .ignore {
        @apply bg-gray-200 border-gray-400;
    }

    .require {
        @apply bg-green-400 border-green-400;
    }

    .exclude {
        @apply bg-red-400 border-red-400;
    }
</style>
