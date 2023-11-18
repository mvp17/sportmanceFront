<svelte:head>
	<title>Dashboard</title>
</svelte:head>
  
<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { baseURL } from '../../environment.js';
  import { Card, Radio } from 'flowbite-svelte';
  import BarChart from '../../components/charts/BarChart.svelte';
  import PieChart from '../../components/charts/PieChart.svelte';
  import PolarAreaChart from '../../components/charts/PolarAreaChart.svelte';
  import RadarChart from '../../components/charts/RadarChart.svelte';

  let /** @type { string[] } */ chartVars = [];
  let chart = 'bar';
  /**
    * @type {{chartVars: string[], dataSource: number[][], labels: string[][]}}
  */
  let input = { chartVars: [], dataSource: [], labels: [] };
  
  onMount(async () => {
    try {
      axios.defaults.withCredentials = true;
      const instance = axios.create({ baseURL: baseURL });
      const res = await instance.get('/get-chart-data');
      chartVars = res.data.chartVars;
      input = { chartVars: chartVars, dataSource: res.data.datasource, labels: res.data.labels }
    } catch (err) {
      console.log(err);
    }
  });
</script>

<Card>
  <ul class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio bind:group={chart} value="bar" name="hor-list" class="p-3">Bar</Radio></li>
      <li class="w-full"><Radio bind:group={chart} value="rad" name="hor-list" class="p-3">Radar</Radio></li>
      <li class="w-full"><Radio bind:group={chart} value="pie" name="hor-list" class="p-3">Pie</Radio></li>
      <li class="w-full"><Radio bind:group={chart} value="pol" name="hor-list" class="p-3">Polar Area</Radio></li>
  </ul>
</Card>
{#each chartVars as chartVar, i}
  <h5 style="margin-top:10px">{chartVar}</h5>
  {#if chart == 'bar'}
    <BarChart input={input} dataPos={i}/>
  {:else if chart == 'rad'}
    <RadarChart input={input} dataPos={i}/>
  {:else if chart == 'pie'}
    <PieChart input={input} dataPos={i}/>
  {:else if chart == 'pol'}
    <PolarAreaChart input={input} dataPos={i}/>
  {/if}
{/each}
