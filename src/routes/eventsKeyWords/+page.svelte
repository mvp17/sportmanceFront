<svelte:head>
	<title>Events Key Words</title>
</svelte:head>

<script>
    import { Card, Input, Label, Helper, Button, Textarea } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { baseURL } from '../../environment';

    let /** @type {string} */ resPerfVars;
    let /** @type {string[]} */ perfVars = [];
    let /** @type {string} */ timeName; 
    let /** @type {string} */ durationTimeName; 
    let /** @type {string} */ perfVarsString;

    onMount(async () => {
        try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
			const res = await instance.get('/get-perform-vars-events-file');
            resPerfVars = res.data.performance_vars[0];
            perfVars = resPerfVars.split(';');
		} catch (err) {
			console.log(err);
		}
    });

    async function handleSubmit () {
		try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
			const data = {time_ms_name: timeName, duration_time_ms_name: durationTimeName, chart_perf_vars: perfVarsString };
			const res = await instance.post('/register-events-keywords', data);
			console.log(res.data)
		} catch (err) {
			console.log(err);
		}
	}
</script>

<h5 class="alert alert-primary" style="width: 475px; margin: 15px">
    The column names for this EVENTS file are: </h5>
{#each perfVars as perfVar}
    <p style="margin-bottom: 3px"> {perfVar} </p>
{/each}
<Card size="lg">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="grid gap-8 mb-8 md:grid-cols-2">
            <div>
                <Label for="time_ms_name" class="mb-2">Column name of time in ms</Label>
                <Input type="text" id="time_ms_name" placeholder="Time" bind:value={timeName} required />
            </div>
            <div>
                <Label for="duration_time_ms_name" class="mb-2">Column name of time duration in ms</Label>
                <Input type="text" id="duration_time_ms_name" placeholder="Time Duration" bind:value={durationTimeName} required />
            </div>
        </div>
        <div class="mb-6">
            <Label for="chart_perf_vars" class="mb-2">Chart Performance variables</Label>
            <Textarea type="text" id="chart_perf_vars" placeholder="" bind:value={perfVarsString} required />
            <Helper class="text-sm mt-2">
                Performance variables names separated by comma in order to render their data in data charts. 
                Use white spaces if you like. Please put the variables in the same order as they are shown.
            </Helper>
        </div>
        <Button type="submit">Submit</Button>
    </form>
</Card>
