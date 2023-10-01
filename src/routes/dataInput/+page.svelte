<svelte:head>
	<title>Data Input</title>
</svelte:head>

<script>
	import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	let files = [];
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
