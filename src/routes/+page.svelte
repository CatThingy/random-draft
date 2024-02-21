<script lang="ts">
    import DraftGenerator from "./DraftGenerator.svelte";
    import FilterSelector from "./FilterSelector.svelte";
</script>

<div class="flex w-full justify-center">
    <div class="w-2/3">
        <FilterSelector />
    </div>
</div>

<DraftGenerator/>
