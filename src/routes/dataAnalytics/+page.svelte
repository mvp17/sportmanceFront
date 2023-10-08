<svelte:head>
	<title>Data Analytics</title>
</svelte:head>

<script>
  import { Button, Checkbox, Card } from 'flowbite-svelte';
  import { getSelectorChecks } from './functions.js'
  let messages = [];
  let dictCSVFiles = [];
  let perfVarsList = ["var1", "var2"];
  
    
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
      {#each perfVarsList as perfVar}
        <Checkbox class="checks" value={perfVar}> {perfVar} </Checkbox>
      {/each}
      <Button on:click={getSelectorChecks}>Save</Button>
      <Button color="green" on:click={() => exportTableToCSV("table.csv")}>
        Export HTML table to CSV file
      </Button>
    </Card>
    </div>
  {/if}
  