<script lang="ts">
	import { onMount } from 'svelte';

	let data  = []; 


  // We fetch from kaleido peer REST API gateway as you can see here;

	onMount(async () => {
		const response = await fetch('https://e0jdl4rqhd-e0cm2q0anp-connect.de0-aws-ws.kaleido.io/identities', {
			headers: {
				accept: 'application/json',
				Authorization:
					'Basic ZTBzN3RpazgyeDptVEVqZTFISFNWQklRR2Nod0V1QnJxaG5PZVlQbHZhd1hMQWlRb3FYV3NZ'
			}
		});

		if (response.ok) {
			data = await response.json(); 
      console.log(data);
		} else {
			data = [{ error: 'Error fetching data.' }];
		}
	});
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
	{#each data as identity (identity.name)} <div
			in:fade={{ duration: 500 }}
			class="bg-gradient-to-br from-green-200 via-green-300 to-green-400 rounded-xl shadow-lg p-6 
             transition duration-300 hover:scale-105"
		>
			<h3 class="text-lg font-semibold mb-2 text-gray-800">
				Current Identity on Kaleido:
			</h3>
      <!-- we are just using name from the identity -->
			<p class="text-gray-700 font-mono">
				{identity.name}
			</p>
		</div>
	{/each}
</div>
