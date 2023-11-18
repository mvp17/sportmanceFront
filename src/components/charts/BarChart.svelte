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
{/if}
