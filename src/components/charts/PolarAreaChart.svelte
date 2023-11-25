<script>
  /**
    * @type {any}
  */
  export let input;
  /**
    * @type {number}
  */
  export let dataPos;

  import { PolarArea } from 'svelte-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
  import { onMount } from 'svelte';
  import { getColors } from '../../functions/getColors';
    import { Button } from 'flowbite-svelte';
    import { exportDataChartToCsv } from '../../functions/exportDataChartToCsv';
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);

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
  <PolarArea {data} options={{ responsive: true }} />
  <div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
    <Button on:click={() => exportDataChartToCsv(`${input.chartVars[dataPos]}.csv`, 
                                                  input.dataSource[dataPos], 
                                                  input.labels[dataPos])}>
      Export data to CSV
    </Button>
  </div>
{/if}
