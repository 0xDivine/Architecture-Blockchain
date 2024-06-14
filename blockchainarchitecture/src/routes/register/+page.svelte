<script>
    import { ownerStore } from '../../lib/store/store.js';
   

  
    let username = '';

 
    async function register() {
  try {
    const authResponse = await fetch('http://localhost:5173/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }) 
    });

    if (authResponse.ok) {
      const { token } = await authResponse.json();
      sessionStorage.setItem('authToken', token);
      console.log('Registration successful', {username});
    } else {
      console.error("Registration failed:", authResponse.statusText);
    }
  } catch (error) {
    console.error("Error during registration:", error); // Removed "or asset creation"
  }
}
</script>

<div class="min-h-screen flex items-center justify-center bg-white">
  <div class="max-w-md w-full p-8 bg-white rounded-xl shadow-2xl">
      <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-gray-800">Register</h2>
      </div>

      <form class="space-y-4" on:submit|preventDefault={register}>
          <div class="relative">
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <input 
                  id="username" 
                  name="username" 
                  type="text" 
                  required  
                  placeholder="Enter your username"
                  bind:value={username}
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
          </div>

          <button 
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transform transition duration-300 hover:scale-105"
          >
              Register
          </button>
      </form>
  </div>
</div>

