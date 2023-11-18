<svelte:head>
	<title>Events Key Words</title>
</svelte:head>

<script>
    import { Card, Input, Label, Helper, Button, Textarea, Checkbox } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { baseURL } from '../../environment';
    import { goto } from '$app/navigation';

    let /** @type {string[]} */ perfVars = [];
    let /** @type {string} */ timeName; 
    let /** @type {string} */ durationTimeName; 
    let /** @type { string[] } */ group = [];

    onMount (async () => {
        try {
            axios.defaults.withCredentials = true;
            const instance = axios.create({ baseURL: baseURL });
            const res = await instance.get('/get-perform-vars-events-file');
            perfVars = res.data.performance_vars;
		} catch (err) {
			console.log(err);
		}
    });

    async function registerEventsKeywords () {
		try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
            const chartPerfVars = group.reduce((previousValue, currentValue) => previousValue + ',' + currentValue);
			const data = { time_ms_name: timeName, duration_time_ms_name: durationTimeName, chart_perf_vars: chartPerfVars };
            await instance.post('/register-events-keywords', data);
            goto('/dataInput');
		} catch (err) {
			console.log(err);
		}
	}
</script>


<h5 class="alert alert-primary" style="width: 475px; margin: 15px">
    The column names for this EVENTS file are: </h5>
<div class="grid gap-3 md:grid-cols-5 rounded-lg border border-gray-200">
    {#each perfVars as perfVar}
        <Checkbox bind:group value={perfVar}> {perfVar} </Checkbox>
    {/each}
</div>
<Card size="lg" style="margin-top:10px">
    <form on:submit|preventDefault={registerEventsKeywords}>
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
            <Textarea type="text" id="chart_perf_vars" placeholder="" bind:value={group} required />
            <Helper class="text-sm mt-2">
                Check the variables to be rendered in the chart. 
                Please put the variables in the same order as they are shown.
            </Helper>
        </div>
        <Button type="submit">Submit</Button>
    </form>
</Card>
