<svelte:head>
	<title>Dashboard</title>
</svelte:head>
  
<script>
  import { Button, Card } from 'flowbite-svelte';
  import { Checkbox } from 'flowbite-svelte';
  import { checksToChart } from './functions.js';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { baseURL } from '../../environment.js';

  let /** @type { string[] } */ chartVars = [];
  let /** @type { string[] } */ dataSource = [];
  let /** @type { string[] } */ labels = [];

  onMount(async () => {
    try {
      axios.defaults.withCredentials = true;
      const instance = axios.create({ baseURL: baseURL });
      const res = await instance.get('/get-chart-data');
      chartVars = res.data.chartVars;
      dataSource = res.data.datasource;
      labels = res.data.labels;
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  });
</script>
  
<div class="text-column">
  <Card>
    <div>
      <Checkbox value="bar">Bar Chart</Checkbox>
      <Checkbox value="bar">Radar Chart</Checkbox>
      <Checkbox value="bar">Pie Chart</Checkbox>
      <Checkbox value="bar">Polar Area Chart</Checkbox>
      <Button on:click={() => checksToChart()}> Save</Button>
    </div>
    <div class='row'>
      {#each chartVars as chartVar}
        <div class="column" >
            <h5> {chartVar} </h5>
            <canvas id={chartVar} width="400" height="400"></canvas>
            <button class="btn btn-success {chartVar}">Export data to CSV</button>
        </div>
      {/each}
    </div>
  </Card>
</div>

<style>
  /* Container for flexboxes */
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  /* Create four equal columns */
  .column {
    flex: 25%;
    padding: 20px;
  }
  /* On screens that are 992px wide or less, go from four columns to two columns */
  @media screen and (max-width: 992px) {
    .column {
      flex: 50%;
    }
  }
  /* On screens that are 600px wide or less, make the columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .row {
      flex-direction: column;
    }
  }
</style>
