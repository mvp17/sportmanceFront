<svelte:head>
	<title>Devices Key Words</title>
</svelte:head>

<script>
    import { Card, Input, Label, Button } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { baseURL } from '../../environment';
    import { goto } from '$app/navigation';

    let /** @type {string[]} */ perfVars = [];
    let /** @type {string} */ timeName;

    onMount (async () => {
        try {
            axios.defaults.withCredentials = true;
            const instance = axios.create({ baseURL: baseURL });
            const res = await instance.get('/get-perform-vars-devices-file');
            perfVars = res.data.performance_vars;
        } catch (err) {
            console.log(err);
        }
    });

    async function registerDevicesKeywords () {
		try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
			const data = {time_name: timeName };
			await instance.post('/register-devices-keywords', data);
            goto('/dataInput');
		} catch (err) {
			console.log(err);
		}
	}
</script>


<h5 class="alert alert-primary" style="width: 475px; margin: 15px">
    The column names for this devices file are: 
</h5>
<div class="grid gap-3 md:grid-cols-3 rounded-lg border border-gray-200">
    {#each perfVars as perfVar}
        <p style="margin-bottom: 3px"> {perfVar} </p>
    {/each}
</div>
<Card style="margin-top:10px">
    <form on:submit|preventDefault={registerDevicesKeywords}>
        <div class="mb-6">
            <Label for="time_name" class="mb-2">Column name of Time of DEVICES files</Label>
            <Input type="text" id="time_name" placeholder="Time" bind:value={timeName} required />
        </div>
        <Button type="submit">Submit</Button>
    </form>
</Card>
