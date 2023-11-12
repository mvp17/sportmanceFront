<svelte:head>
	<title>Data Analytics</title>
</svelte:head>

<script>
  import { Button, Checkbox, Card } from 'flowbite-svelte';
  import { exportTableToCSV, getSelectorChecks } from './functions.js'
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { baseURL } from '../../environment.js';
  
  let /** @type { string[][][] } */ dictCSVFiles = [];
  let /** @type { string[] } */ perfVarsList = [];

  onMount(async () => {
    try {
        axios.defaults.withCredentials = true;
        const instance = axios.create({ baseURL: baseURL });
        const res = await instance.get('/get-analyzable-data');
        console.log(res.data);
        dictCSVFiles = res.data.dict_csv_files;
        perfVarsList = res.data.perf_vars
    } catch (err) {
      console.log(err);
    }
  });
</script>

<div class="text-column">
  <Card>
    {#each perfVarsList as perfVar}
      <Checkbox class="checks" value={perfVar}> {perfVar} </Checkbox>
    {/each}
    <Button on:click={() => getSelectorChecks(dictCSVFiles)}>Save</Button>
    <Button color="green" on:click={() => exportTableToCSV("table.csv")}>
      Export HTML table to CSV file
    </Button>
  </Card>
</div>
  