<script>
  /**
    * @type {any}
  */
  export let input;
  /**
    * @type {number}
  */
  export let dataPos;

  import { Radar } from 'svelte-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement } from 'chart.js';
  import { onMount } from 'svelte';
  import { getColors } from '../../functions/getColors';

  ChartJS.register(Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement);

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
  <Radar {data} options={{ responsive: true }} />
{/if}
