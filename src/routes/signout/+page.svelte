<svelte:head>
	<title>Sign Out</title>
</svelte:head>

<script>
  import { Button, Card } from 'flowbite-svelte';
	let isThereConfiguration = 1;
</script>

<div class="text-column">
  <Card>
    {#if isThereConfiguration === 1}
      <h2>
          Do you want to delete your session for a new analysis?
      </h2>
      <h2>
          Your key words and your configuration settings.
      </h2>
      <Button color="red"> Delete </Button>
    {/if}
    <h2>
      Are you sure you want to leave ?
    </h2>
    <Button color="green"> Log Out </Button>
  </Card>
</div>
