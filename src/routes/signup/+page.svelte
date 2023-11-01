<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<script>
	import { Button, Card, Label, Input } from 'flowbite-svelte';
	import axios from 'axios'
	
	let /** @type {string} */username, /** @type {string} */ email, /** @type {string} */ password;
	const baseURL = 'http://localhost:8000/api/'
	
	async function signup () {
		try {
			const res = await axios.post(baseURL + 'register', { name: username, email: email, password: password });
			console.log(res.data)
		} catch (err) {
			console.log(err);
		}		
	}
</script>

<div class="text-column">
  <Card>
	<form on:submit|preventDefault={signup}>
		<div class="mb-6">
		<Label for="username" class="mb-2">Username</Label>
		<Input type="text" id="username" placeholder="John" bind:value={username} required />
		</div>
			<div class="mb-6">
			<Label for="email" class="mb-2">Email address</Label>
			<Input type="email" id="email" placeholder="john.doe@company.com" bind:value={email} required />
		</div>
		<div class="mb-6">
			<Label for="password" class="mb-2">Password</Label>
			<Input type="password" id="password" placeholder="•••••••••" bind:value={password} required />
		</div>
		<Button type="submit">Sign Up</Button>
	</form>
  </Card>
</div>
