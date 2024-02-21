<script lang="ts">
    import DraftGenerator from "./DraftGenerator.svelte";
    import FilterSelector from "./FilterSelector.svelte";
</script>

<div class="flex w-full justify-center mt-5">
    <div class="w-2/3">
        <FilterSelector />
    </div>
</div>

<div class="flex w-full items-center flex-col">
    <DraftGenerator />
</div>
