<svelte:head>
	<title>Settings</title>
</svelte:head>

<script>
	import { Card, Input, Label, Helper, Button, Select } from 'flowbite-svelte';
	let messages = [];
	let initTime = 0;
	let finTime = 1;
	let selected;
	let frequencies = [
			{ value: 1, name: '1 Hz' },
			{ value: 5, name: '5 Hz' },
			{ value: 10, name: '10 Hz' },
			{ value: 25, name: '25 Hz' },
			{ value: 100, name: '100 Hz' },
			{ value: 1000, name: '1000 Hz' }
	];
</script>

<div class="text-column">
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
		<Card>
			<form>
				<div class="grid gap-6 mb-6 md:grid-cols-2">
					<div>
							<Label for="init_time_ms" class="mb-2">Init time ms</Label>
							<Input type="number" id="init_time_ms" placeholder="Init time" required />
					</div>
					<div>
							<Label for="last_time_ms" class="mb-2">Last time ms</Label>
							<Input type="text" id="last_time_ms" placeholder="Last time" required />
					</div>
				</div>
				<div class="mb-6">
					<Label>
							Frequency
							<Select class="mt-2" items={frequencies} bind:value={selected} />
					</Label>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</Card>
	{/if}
</div>
