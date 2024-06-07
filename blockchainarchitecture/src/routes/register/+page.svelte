<script>
    import { ownerStore } from '../../lib/store/store.js';
   

  
    let username = '';

 
    async function register() {
    try {
      // Fetch JWT token
      const authResponse = await fetch('http://localhost:5173/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (authResponse.ok) { // Use authResponse here
        const { token } = await authResponse.json();
        sessionStorage.setItem('authToken', token);

        // Fetch asset creation endpoint
        const headers = {
          'Authorization': `Bearer ${token}`
        };
        const createAssetResponse = await fetch('http://localhost:5173/test/createasset', { headers });

        if (createAssetResponse.ok) { 
          console.log('Asset creation successful');
        } else {
          console.error('Asset creation failed:', createAssetResponse.statusText);
        }
      } else {
        console.error("Registration failed:", authResponse.statusText);
      }
    } catch (error) {
      console.error("Error during registration or asset creation:", error);
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Register
      </h2>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={register}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">Username</label>
          <input 
            id="username" 
            name="username" 
            type="text" 
            required 
            class="..." 
            placeholder="Username" 
            bind:value={username}  /> 
        </div>
      </div>

      <button type="submit" class="...">Register</button>
    </form>
  </div>
</div>