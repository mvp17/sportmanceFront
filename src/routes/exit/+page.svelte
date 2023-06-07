<script>
	let isThereConfiguration = 1;
</script>

<div class="text-column">
  <h1>Exit</h1>
  {#if isThereConfiguration === 1}
    <h2>
        Do you want to delete your session for a new analysis?
    </h2>
    <h2>
        Your key words and your configuration settings.
    </h2>
    <a href="'delete_session'" class="btn btn-danger"> Delete </a>
  {/if}
  <h2>
    Are you sure you want to leave ?
  </h2>
  <a href="'logout'" class="btn btn-success"> Log Out </a>
</div>
