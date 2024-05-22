<script>
	import '../app.css';
	import Header from './Header.svelte';
	import './styles.css';
</script>

<Header> </Header>
<div class="container">

</div>
<slot></slot>


<style>
	/* Center the content */
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 40px; /* Adjust padding as needed */
	}
</style>







