<script>
    import { onMount } from 'svelte';
    import { main } from '../../../../../fabric-samples/asset-transfer-basic/application-javascript/app.js';

    onMount(async () => {
        await main();
    });
    
</script>