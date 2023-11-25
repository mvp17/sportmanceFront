<script>
  /**
    * @type {{chartVars: string[], dataSource: number[][], labels: string[][]}}
  */
  export let input;
  /**
    * @type {number}
  */
  export let dataPos;

  import { Bar } from 'svelte-chartjs';
  import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { onMount } from 'svelte';
  import { getColors } from '../../functions/getColors';
  import { Button } from 'flowbite-svelte';
  import { exportDataChartToCsv } from '../../functions/exportDataChartToCsv';

  Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  /**
    * @type {{labels: string[], datasets: any[]}}
  */
  let data;

  onMount(() => {
    const labels = input.labels[dataPos]
    data = {
      labels: labels,
      datasets: [
        {
          label: input.chartVars[dataPos],
          data: input.dataSource[dataPos],
          backgroundColor: getColors(labels),
          borderColor: getColors(labels),
        },
      ],
    };
  });
</script>

{#if data}
  <Bar {data} options={{ responsive: true }} />
  <div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
    <Button on:click={() => exportDataChartToCsv(`${input.chartVars[dataPos]}.csv`, 
                                                input.dataSource[dataPos], 
                                                input.labels[dataPos])}>
      Export data to CSV
    </Button>
  </div>
{/if}
