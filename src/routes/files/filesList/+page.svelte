<script>
	let files = [];
</script>

<div class="container" style="margin-top: 30px">
	<p>
		<a href="'upload_file'" class="btn btn-primary">
			Upload csv file
		</a>
		<a href="'key_words_events_file'" class="btn btn-warning">
			Set events file key words
		</a>
		<a href="'key_words_devices_file'" class="btn btn-warning">
			Set devices file/s key words
		</a>
	</p>
	<table class="table">
		<thead>
			<tr>
				<th>Title</th>
				<th>Athlete</th>
				<th>CSV File</th>
				<th>Delete</th>
			</tr>
		</thead>
		<tbody>
    		{#each files as file}
				<tr>
					<td>{ file.title }</td>
					<td>{ file.athlete }</td>
					<td>{ file.csv }</td>
					<td>
					<!--form, method post, delete file-->
					<button type="submit" class="btn btn-danger">Delete</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
