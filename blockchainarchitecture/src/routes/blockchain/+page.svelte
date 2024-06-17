<script>
    let isOpen = false;
    let assetname = '';
    let color = '';
    let number = '';
    let appraisedvalue = '';

    let showToast = false;
  
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
      
        return;
    }

    try {
        const response = await fetch('http://localhost:5173/test/createasset', { 
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAsset)
        });

        if(response.ok){
          showToast = true;
          setTimeout(() => showToast = false, 3000); // Hide the toast after 3 seconds

        }

    } catch (error) {
        console.log('Error calling API:', error);
    }
}
  </script>
  
  <!-- Modal toggle -->
  <div class="mt-16 p-8 bg-white rounded-lg shadow-lg relative">
    <h2 class="text-2xl font-bold text-center mb-8">How It Works</h2>

    <div class="flex items-center relative storyboard-container">
        <div class="storyboard-step flex flex-col items-center text-center relative z-10">
            <div class="bg-green-500 text-white rounded-full p-4 shadow-md">
                <i class="fas fa-tractor text-3xl"></i> 
            </div>
            <h3 class="text-lg font-semibold mt-2">Farmer Creates Asset</h3>
            <p class="mt-1 text-gray-600">Registers product on blockchain</p>
        </div>

        <div class="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gray-200 z-0"></div>

        <div class="storyboard-step flex flex-col items-center text-center relative z-10">
            <div class="bg-blue-500 text-white rounded-full p-4 shadow-md mt-6 md:mt-0"> <i class="fas fa-stamp text-3xl"></i>
            </div>
            <h3 class="text-lg font-semibold mt-2">Authority Validates</h3>
            <p class="mt-1 text-gray-600">Verifies authenticity</p>
        </div>

        <div class="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gray-200 z-0"></div>

        <div class="storyboard-step flex flex-col items-center text-center relative z-10">
            <div class="bg-orange-500 text-white rounded-full p-4 shadow-md mt-6 md:mt-0"> <i class="fas fa-shopping-cart text-3xl"></i>
            </div>
            <h3 class="text-lg font-semibold mt-2">Supermarket Shows Asset</h3>
            <p class="mt-1 text-gray-600">Consumers see history & origin</p>
        </div>
    </div>
</div>



  
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

  {#if showToast}
<div class="fixed inset-x-0 bottom-0 p-4">
    <div class="p-2 rounded-lg bg-green-600 items-center text-green-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
        <span class="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">Success</span>
        <span class="font-semibold mr-2 text-left flex-auto">Asset listed successfully</span>
    </div>
</div>
{/if}
  