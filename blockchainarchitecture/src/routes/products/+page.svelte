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

    <div class="mt-4"> 
      <a href="https://e0jdl4rqhd-e0cm2q0anp-explorer.de0-aws-ws.kaleido.io/?tab=transactions&transId=77d15ea4f7ca85e9014d18e8630c9c9377d2ee64dfd4e15100f6f9e67a6927b2#/" 
         target="_blank" rel="noopener noreferrer" 
         class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md shadow-md hover:shadow-lg transition duration-300">
        
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 11.225 18 7c0-.682-.057-1.35-.166-2.056 9.592-6.073 9.966-5.933 18-3.166A11.954 11.954 0 0110 1.944z" clip-rule="evenodd" />
        </svg>

        View details
      </a>
    </div>

  </div>
</div>
{/each}

</div>