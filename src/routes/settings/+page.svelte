<svelte:head>
	<title>Settings</title>
</svelte:head>

<script>
	import { Card, Input, Label, Button, Select } from 'flowbite-svelte';
	import axios from 'axios';
	import { baseURL } from '../../environment';
    import { onMount } from 'svelte';

	let /** @type {string} */ initTimeBack = "";
	let /** @type {string} */ finTimeBack = "";
	let /** @type {number} */ initTime;
	let /** @type {number} */ finTime;
	let /** @type {number} */ frequency;
	let frequencies = [
			{ value: 1, name: '1 Hz' },
			{ value: 5, name: '5 Hz' },
			{ value: 10, name: '10 Hz' },
			{ value: 25, name: '25 Hz' },
			{ value: 100, name: '100 Hz' },
			{ value: 1000, name: '1000 Hz' }
	];

	onMount(async () => {
        try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
			const res = await instance.get('/get-init-time_fin-time');
			initTimeBack = res.data.initTime.toString();
			finTimeBack = res.data.finTime.toString();
			console.log(res.data)
		} catch (err) {
			console.log(err);
		}
    });

	async function handleSubmit () {
		try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
			const data = { init_time_ms: initTime, fin_time_ms: finTime, frequency: frequency };
			const res = await instance.post('/register-settings', data);
			console.log(res.data)
		} catch (err) {
			console.log(err);
		}
	}
</script>

<div class="text-column">
	<p> The initial time for filtering in this session is: {initTimeBack}
	<p> The final time for filtering in this session is: {finTimeBack}
	<p> You MUST do the filtering between the two integer values of above. These values are also included in the filtering
	<!--form settings model-->
	<Card>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				<div>
					<Label for="init_time_ms" class="mb-2">Init time ms</Label>
					<Input type="number" id="init_time_ms" placeholder="Init time" bind:value={initTime} required />
				</div>
				<div>
					<Label for="last_time_ms" class="mb-2">Last time ms</Label>
					<Input type="text" id="last_time_ms" placeholder="Last time" bind:value={finTime} required />
				</div>
			</div>
			<div class="mb-6">
				<Label>
					Frequency
					<Select class="mt-2" items={frequencies} bind:value={frequency} />
				</Label>
			</div>
			<Button type="submit">Submit</Button>
		</form>
	</Card>
</div>
