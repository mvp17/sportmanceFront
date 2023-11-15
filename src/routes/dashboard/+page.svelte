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
  let /** @type { string[] } */ dataSource = [];
  let /** @type { string[] } */ labels = [];
  let chart = 'bar';
  
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

<Card>
  <ul class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x divide-gray-200 dark:divide-gray-600">
      <li class="w-full"><Radio bind:group={chart} value="bar" name="hor-list" class="p-3">Bar</Radio></li>
      <li class="w-full"><Radio bind:group={chart} value="rad" name="hor-list" class="p-3">Radar</Radio></li>
      <li class="w-full"><Radio bind:group={chart} value="pie" name="hor-list" class="p-3">Pie</Radio></li>
      <li class="w-full"><Radio bind:group={chart} value="pol" name="hor-list" class="p-3">Polar Area</Radio></li>
  </ul>
</Card>
{#if chart == 'bar'}
  <BarChart />
{:else if chart == 'rad'}
  <RadarChart />
{:else if chart == 'pie'}
  <PieChart />
{:else if chart == 'pol'}
  <PolarAreaChart />
{/if}
