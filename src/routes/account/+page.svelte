<svelte:head>
	<title>Account</title>
</svelte:head>

<script>
    import { Button, Card } from 'flowbite-svelte';
    let user = { username: "Marc" };
</script>
    
<div class="text-column">
    <Card>
        <h2>Do you want to delete your account?</h2>
        <Button color="red">Delete Account</Button>
    </Card>
</div>
