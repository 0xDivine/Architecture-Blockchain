<script>
    let isOpen = false;
    let assetname = '';
    let color = '';
    let number = '';
    let appraisedvalue = '';
  
    function toggleModal() {
      isOpen = !isOpen;
    }
  
    async function submitForm() {
    const newAsset = {
        id: assetname,
        color: color,
        size: number,
        appraisedValue: appraisedvalue,
    };

    const token = sessionStorage.getItem('authToken'); // Retrieve from sessionStorage

    if (!token) {
        console.error('No token found in session storage');
        // Handle the error (e.g., redirect to login)
        return;
    }

    try {
        const response = await fetch('http://localhost:5173/test/createasset', { // Or your actual endpoint
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAsset)
        });

        // ... (rest of response handling remains the same)
    } catch (error) {
        console.log('Error calling API:', error);
    }
}
  </script>
  
  <!-- Modal toggle -->
  <button on:click={toggleModal} class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    List new asset
  </button>
  
  <!-- Main modal -->
  <div id="crud-modal" tabindex="-1" aria-hidden={!isOpen} class={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Asset
          </h3>
          <button on:click={toggleModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form on:submit|preventDefault={submitForm} class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label for="assetname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asset Name</label>
              <input bind:value={assetname} type="text" name="assetname" id="assetname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type asset name" required="">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="color" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
              <input bind:value={color} type="text" name="color" id="color" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter color" required="">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number</label>
              <input bind:value={number} type="number" name="number" id="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter number" required="">
            </div>
            <div class="col-span-2">
              <label for="appraisedvalue" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Appraised Value</label>
              <input bind:value={appraisedvalue} type="number" name="appraisedvalue" id="appraisedvalue" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter appraised value" required="">
            </div>
          </div>
          <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            Add new asset
          </button>
        </form>
      </div>
    </div>
  </div>
  