<svelte:head>
	<title>Data Input</title>
</svelte:head>

<script>
    import axios from 'axios';
	import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { baseURL } from '../../environment';
	
	let /** @type {{ title: string, athlete: string, csv: string, game: string, maxPlayers: number }[] } */ files = [];

	onMount(async () => {
        try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
			const res = await instance.get('/get-all-files');
			console.log(res.data)
			files = res.data
		} catch (err) {
			console.log(err);
		}
    });
</script>

<div class="container" style="margin-top: 30px">
	<p>
		<Button href="/uploadCSVFile">
			Upload csv file
		</Button>
		<Button color="yellow" href="/eventsKeyWords">
			Set events file key words
		</Button>
		<Button color="yellow" href="/devicesKeyWords">
			Set devices file key words
		</Button>
	</p>
	<Table striped={true}>
		<TableHead>
				<TableHeadCell>Title</TableHeadCell>
				<TableHeadCell>Athlete</TableHeadCell>
				<TableHeadCell>CSV File</TableHeadCell>
				<TableHeadCell>Actions</TableHeadCell>
		</TableHead>
		<TableBody>
    		{#each files as file}
				<TableBodyRow>
					<TableBodyCell>{ file.title }</TableBodyCell>
					<TableBodyCell>{ file.athlete }</TableBodyCell>
					<TableBodyCell>{ file.csv }</TableBodyCell>
					<TableBodyCell>
					<!--form, method post, delete file-->
					<Button color="red" type="submit">Delete</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
