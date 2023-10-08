<svelte:head>
	<title>Dashboard</title>
</svelte:head>

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
  
<script>
  import { Button, Card } from 'flowbite-svelte';
  import { Checkbox } from 'flowbite-svelte';
  import { checksToChart } from './functions.js'
  let chartVars = [];
  let messages = [];    
</script>
  
  {#if messages.length !== 0}
  <div class="container" style="margin-top: 30px">
      <div class="form-group" style="margin: 25px 20px">
          <ul class="messages">
          {#each messages as message}
              <p> <h5 class="alert alert-danger">{message}</h5>
          {/each}
          </ul>
      </div>
  </div>
  {:else}
  <div class="text-column">
    <Card>
      <div>
        <Checkbox value="bar">Bar Chart</Checkbox>
        <Checkbox value="bar">Radar Chart</Checkbox>
        <Checkbox value="bar">Pie Chart</Checkbox>
        <Checkbox value="bar">Polar Area Chart</Checkbox>
        <Button on:click={checksToChart}> Save</Button>
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
  {/if}
