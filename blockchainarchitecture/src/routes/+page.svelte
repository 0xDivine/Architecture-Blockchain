<script>
	import { onMount } from 'svelte';

  
	
  </script>
  
  <div class="bg-green-50 min-h-screen">
	<header class="container mx-auto py-12 px-4">
	  <h1 class="text-4xl md:text-5xl font-bold text-green-900 text-center mb-4 shadow-md rounded-md bg-green-100 p-4">Farm Fresh From Field to Fork</h1>
	  <p class="mt-2 text-lg text-green-800 text-center">Authentic, Sustainable, Delicious.</p>
	</header>
  
	<section class="bg-white py-12 px-4 shadow-lg rounded-lg container mx-auto fade-in">
	  <div class="flex flex-col md:flex-row items-center">
		<div class="md:w-1/2">
		  <img 
			src="https://cdn.theatlantic.com/thumbor/1eLgsh6WVKKyOvSZQj8Lghm9iGQ=/1200x800/media/img/photo/2020/04/photos-essential-work-farmers-coron/f01_1216824338/original.jpg" 
			alt="Farmer Working in Field" 
			class="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
		  />
		</div>
		<div class="md:w-1/2 mt-8 md:mt-0 md:pl-8 text-center md:text-left">
		  <h2 class="text-3xl font-bold text-green-800">Our Mission</h2>
		  <p class="mt-4 text-gray-700">
			We are committed to delivering the freshest, most flavorful produce and products directly from our farms to your table.
			We believe in sustainable practices, supporting our local community, and nurturing the land for generations to come.
		  </p>
		</div>
	  </div>
	</section>
  
	<section class="container mx-auto py-16 fade-in">
	  <h2 class="text-3xl font-bold text-green-800 text-center mb-8">Our Values</h2>
	  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
		<div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
		  <img src="https://www.svgrepo.com/show/224207/quality.svg" alt="Quality Icon" class="w-16 h-16 mb-4" />
		  <h3 class="text-xl font-bold text-green-800">Quality</h3>
		  <p class="mt-2 text-gray-700">We prioritize the highest quality ingredients and products, sourced with care.</p>
		</div>
		<div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
		  <img src="https://www.svgrepo.com/show/224207/quality.svg" alt="Sustainability Icon" class="w-16 h-16 mb-4" />
		  <h3 class="text-xl font-bold text-green-800">Sustainability</h3>
		  <p class="mt-2 text-gray-700">We employ eco-friendly farming methods to protect the environment and promote biodiversity.</p>
		</div> 
		<div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
		  <img src="https://www.freeiconspng.com/thumbs/community-icon/community-icon-10.png" alt="Community Icon" class="w-16 h-16 mb-4" />
		  <h3 class="text-xl font-bold text-green-800">Community</h3>
		  <p class="mt-2 text-gray-700">We actively support our local community and build strong relationships with our customers.</p>
		</div>
	  </div>
	</section>
  
	<footer class="bg-green-800 text-white py-8 px-4 text-center">
	  <p>&copy; 2024 Farm Fresh</p>
	</footer>
  </div>
  