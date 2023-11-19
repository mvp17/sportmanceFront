<svelte:head>
	<title>Sign Out</title>
</svelte:head>

<script>
  import axios from 'axios';
  import { Button, Card } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { baseURL } from '../../environment';
  import { jwt } from '../../stores/sessionStore';
  import { goto } from '$app/navigation';
	
  let isThereConfiguration = 0;

  onMount (async () => {
    try {
      axios.defaults.withCredentials = true;
      const instance = axios.create({ baseURL: baseURL });
      const res = await instance.get('/exit-session');
      isThereConfiguration = res.data.is_there_settings;
		} catch (err) {
			console.log(err);
		}
  });

  async function deleteSessionData () {
    try {
      axios.defaults.withCredentials = true;
      const instance = axios.create({ baseURL: baseURL });
      const res = await instance.post('/delete-session-data');
		} catch (err) {
			console.log(err);
		}
  }

  async function signOut () {
    try {
      axios.defaults.withCredentials = true;
      const instance = axios.create({ baseURL: baseURL });
      const res = await instance.post('/logout');
      jwt.set('');
      goto('/')
		} catch (err) {
			console.log(err);
		}
  }
</script>

<div class="text-column">
  <Card>
    {#if isThereConfiguration === 1}
      <h2>
          Do you want to delete keywords and settings of this session?
      </h2>
      <Button color="red" style="margin-top:10px" on:click={deleteSessionData}> Delete </Button>
    {:else}
      <h2>
        There is no session data registered.
      </h2>
    {/if}
  </Card>
  <Card style="margin-top:20px">
    <h2>
      Are you sure you want to leave?
    </h2>
    <Button color="green" style="margin-top:10px" on:click={signOut}> Log Out </Button>
  </Card>
</div>
