<svelte:head>
	<title>Account</title>
</svelte:head>

<script>
    import axios from 'axios';
    import { Card } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { baseURL } from '../../environment';
    
    let name = "";
    let email = "";
    
    onMount (async () => {
        try {
            axios.defaults.withCredentials = true;
            const instance = axios.create({ baseURL: baseURL });
            const res = await instance.get('/user');
            name = res.data.name;
            email = res.data.email;
		} catch (err) {
			console.log(err);
		}
    });
</script>
    


<div class="text-column">
    <Card padding="sm">
        <div class="flex flex-col items-center pb-4">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{email}</h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">{name}</span>
        </div>
    </Card>
</div>
