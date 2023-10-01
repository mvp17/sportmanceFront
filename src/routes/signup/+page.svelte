<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<script>
  import { Button, Card, Label, Input } from 'flowbite-svelte';
</script>

<div class="text-column">
  <Card>
		<div class="mb-6">
      <Label for="username" class="mb-2">Username</Label>
      <Input type="text" id="username" placeholder="John" required />
    </div>
		<div class="mb-6">
    	<Label for="email" class="mb-2">Email address</Label>
    	<Input type="email" id="email" placeholder="john.doe@company.com" required />
  	</div>
  	<div class="mb-6">
    	<Label for="password" class="mb-2">Password</Label>
    	<Input type="password" id="password" placeholder="•••••••••" required />
  	</div>
    <Button type="submit">Sign Up</Button>
  </Card>
</div>
