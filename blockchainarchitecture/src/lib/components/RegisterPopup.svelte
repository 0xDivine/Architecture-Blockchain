<script>
    let showModal = false;
    let name = '';
  
    function handleRegister() {
      console.log("Name:", name);
      // Add your registration logic here
      showModal = false;  // Close the popup after registration
    }
  
    function openModal() {
      showModal = true;
    }
  </script>
  
  <style>
    /* Additional styling if needed */
  </style>
  
  <!-- Button to open the popup -->
  <button 
    class="bg-blue-500 text-white font-bold py-2 px-4 rounded" 
    on:click={openModal}>
    Register
  </button>
  
  {#if showModal}
    <!-- Popup Overlay -->
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <!-- Popup Content -->
      <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 class="text-xl font-bold mb-4">Register</h2>
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
          <input 
            id="name" 
            type="text" 
            bind:value={name} 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Enter your name" 
          />
        </div>
        <div class="flex justify-end">
          <button 
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded" 
            on:click={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  {/if}
  