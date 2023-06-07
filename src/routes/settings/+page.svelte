<svelte:head>
	<title>Settings</title>
</svelte:head>

<script>
	let messages = [];
	let initTime = 0;
	let finTime = 1;
</script>

<div class="text-column">
	<h1>Settings</h1>

	{#if messages.length !== 0}
		<div>
			<div>
				<ul class="messages">
				{#each messages as message}
					<p> <h3>{message}</h3>
				{/each}
				</ul>
			</div>
		</div>
	{:else}
		<p> The initial time for filtering in this session is: {initTime}
		<p> The final time for filtering in this session is: {finTime}
		<p> You MUST do the filtering between the two integer values of above. These values are also included in the filtering
		<!--form settings model-->
	{/if}
</div>
