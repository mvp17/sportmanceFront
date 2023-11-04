<svelte:head>
	<title>Devices Key Words</title>
</svelte:head>

<script>
    import { Card, Input, Label, Button } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { baseURL } from '../../environment';

    let /** @type {string[]} */ perfVars = [];
    let /** @type {string} */ timeName;

    onMount(async () => {
        try {
            axios.defaults.withCredentials = true;
            const instance = axios.create({ baseURL: baseURL });
            const res = await instance.get('/get-perform-vars-devices-file');
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
    });

    async function handleSubmit () {
		try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
			const data = {time_name: timeName };
			const res = await instance.post('/register-devices-keywords', data);
			console.log(res.data)
		} catch (err) {
			console.log(err);
		}
	}
</script>

<div class='row'>
    <div class="column">
        <h5 class="alert alert-primary" style="width: 475px; margin: 15px">
            The column names for this devices file are: </h5>
        {#each perfVars as perfVar}
            <p style="margin-bottom: 3px"> {perfVar} </p>
        {/each}
    </div>
    <div class="column">
        <Card>
            <form on:submit|preventDefault={handleSubmit}>
                <div class="mb-6">
                    <Label for="time_name" class="mb-2">Column name of Time of DEVICES files</Label>
                    <Input type="text" id="time_name" placeholder="Time" bind:value={timeName} required />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Card>
    </div>
</div>
