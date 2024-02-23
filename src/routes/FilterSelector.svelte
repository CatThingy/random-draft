<script lang="ts">
    import { DoublesTiers, NatDexTiers, SinglesTiers } from "./tiers";

    import Filter, { Category } from "./Filter.svelte";
    import { filters } from "./filters";
    import AttributeFilterSelector from "./AttributeFilterSelector.svelte";

    let filterList: HTMLElement;
    let attributeFilters: AttributeFilterSelector[] = [];

    function addAttributeFilter() {
        let filter = new AttributeFilterSelector({
            target: filterList,
        });
        filter.$on("message", updateAttributeFilters);
        attributeFilters.push(filter);
    }

    function updateAttributeFilters(e: CustomEvent) {
        $filters.attribute.set(e.detail.target, e.detail.value);
    }

    function removeAttributeFilter(e: CustomEvent) {
        $filters.attribute.set(e.detail.target, e.detail.value);
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
    <div class="ml-5 my-5 pr-2 border-r-2">
        <p class="font-bold text-center">National Dex</p>
        {#each Object.values(NatDexTiers) as tier}
            <Filter
                state={$filters.natdex.get(tier)}
                marker={{ kind: Category.NatDex, tier }}>{tier}</Filter
            >
        {/each}
    </div>
    <div class="ml-5 my-5 border-gray-300">
        <p class="font-bold text-center">Doubles</p>
        {#each Object.values(DoublesTiers) as tier}
            <Filter
                state={$filters.doubles.get(tier)}
                marker={{ kind: Category.Doubles, tier }}>{tier}</Filter
            >
        {/each}
    </div>
</div>
<details>
    <summary> Attribute filters </summary>
    <div bind:this={filterList}></div>
    <button on:click={addAttributeFilter}>Add attribute filter</button>
</details>
