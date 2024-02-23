<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {
        type AttributeFilter,
        FilterState,
        type Attribute,
        AttributeKind,
    } from "./filters";

    let selection = "";
    let compareValue = "";
    let partialEvaluator: (a: number) => (b: number) => boolean = (_) => (_) =>
        true;
    let filter = FilterState.Require;
    let self: HTMLElement | null = null;

    const dispatch = createEventDispatcher();

    export let attributeFilter: AttributeFilter | null = null;

    function updateAttributeFilter() {
        let attr: Attribute;
        switch (selection) {
            case "hp":
            case "atk":
            case "def":
            case "spa":
            case "spd":
            case "spe":
            case "bst":
                attr = {
                    kind: AttributeKind.Stats,
                    stat: selection,
                    evaluator: partialEvaluator(parseInt(compareValue)),
                };
                break;

            case "weight":
                attr = {
                    kind: AttributeKind.Weight,
                    evaluator: partialEvaluator(parseInt(compareValue)),
                };
                break;

            case "height":
                attr = {
                    kind: AttributeKind.Height,
                    evaluator: partialEvaluator(parseInt(compareValue)),
                };
                break;

            case "move":
                attr = {
                    kind: AttributeKind.Ability,
                    ability: compareValue,
                };
                break;

            case "type":
                attr = {
                    kind: AttributeKind.Type,
                    type: compareValue,
                };
                break;

            case "egg":
                attr = {
                    kind: AttributeKind.EggGroups,
                    group: compareValue,
                };
                break;
            default:
                return;
        }

        attributeFilter = {
            attribute: attr,
            filter,
        };

        dispatch("message", { target: self, value: attributeFilter });
    }
</script>

<div class="flex flex-row" bind:this={self}>
    <select on:change bind:value={filter} on:change={updateAttributeFilter}>
        <option value={FilterState.Require} selected> Require </option>
        <option value={FilterState.Exclude}> Exclude </option>
    </select>
    <select on:change bind:value={selection} on:change={updateAttributeFilter}>
        <option value="" disabled selected></option>
        <optgroup label="Stats">
            <option value="hp">HP</option>
            <option value="atk">Attack</option>
            <option value="def">Defence</option>
            <option value="spa">Special Attack</option>
            <option value="spd">Special Defence</option>
            <option value="spe">Speed</option>
            <option value="bst">BST</option>
        </optgroup>
        <optgroup label="Characteristics">
            <option value="weight">Weight</option>
            <option value="height">Height</option>
            <option value="type">Type</option>
            <option value="ability">Ability</option>
            <option value="egg">Egg Group</option>
        </optgroup>
    </select>
    {#if ["hp", "atk", "def", "spa", "spd", "spe", "bst", "weight", "height"].includes(selection)}
        <select
            on:change
            bind:value={partialEvaluator}
            on:change={updateAttributeFilter}
        >
            <option value={(a) => (b) => b >= a}> &geq; </option>
            <option value={(a) => (b) => b <= a}> &leq; </option>
            <option value={(a) => (b) => b == a}> = </option>
        </select>
        <input
            on:change
            on:change={updateAttributeFilter}
            bind:value={compareValue}
            class="invalid:border-red-300 border-gray-300 w-10"
            inputmode="numeric"
            pattern="\d+"
        />
    {:else if selection != ""}
        {#if selection != "ability"}
            is
        {:else}
            can be
        {/if}
        <input
            on:change
            class="border-gray-300"
            bind:value={compareValue}
            on:change={updateAttributeFilter}
        />
    {/if}
</div>

<style lang="postcss">
    select {
        @apply bg-transparent border-b-2 border-gray-300 mx-2;
    }
    input {
        @apply bg-transparent border-b-2 border-gray-300 mx-2;
    }
</style>
