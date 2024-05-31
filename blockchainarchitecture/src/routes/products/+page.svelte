<script>
    import { onMount } from 'svelte';
    let products = [];

    onMount(async () => {
        const res = await fetch('/test/showallassets');
        products = await res.json();
    });
</script>

<svelte:head>
    <title>Products</title>
</svelte:head>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each products as product (product.ID)}
        <div class="border border-gray-300 rounded-lg overflow-hidden shadow-lg m-3">
            <div class="p-4">
                <img src="https://placeholder.pics/svg/300/FFC64A-A4FF85/asset" alt="{product.ID}" class="w-full h-64 object-cover mb-4">
                <h2 class="font-bold text-xl mb-2">{product.ID}</h2>
                <p class="text-gray-700 text-base">Color: {product.Color}</p>
                <p class="text-gray-700 text-base">Size: {product.Size}</p>
                <p class="text-gray-700 text-base">Owner: {product.Owner}</p>
                <p class="text-gray-700 text-base">Appraised Value: {product.AppraisedValue}</p>
            </div>
        </div>
    {/each}
</div>