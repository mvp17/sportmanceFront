<script>
  /**
    * @type {any}
  */
  export let input;
  /**
    * @type {number}
  */
  export let dataPos;

  import { Pie } from 'svelte-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
  import { onMount } from 'svelte';
  import { getColors } from '../../functions/getColors';

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

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
  <Pie {data} options={{ responsive: true }} />
{/if}
