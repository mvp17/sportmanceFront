<svelte:head>
	<title>Data Analytics</title>
</svelte:head>

<script>
  import { Button, Checkbox, Card, Table, 
           TableBody, 
           TableBodyCell, 
           TableBodyRow, 
           TableHead, 
           TableHeadCell } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { baseURL } from '../../environment.js';
  
  // Retrieve backend raw data
  /**
     * @type {any[]}
     */
  let items = [];
  let dictCSVFiles = [];
  // @ts-ignore
  let /** @type { string[] } */ perfVarsList = [];
  let /** @type { string[] } */ group = [];
  let renderTable = false;

  function getChecks () {
    items.map((item) => {
      Object.keys(item).map((key) => {
        if (!group.includes(key)) {
          delete item[key];
        }
      });
    });
    renderTable = true;
  }

  function reset () {
    group = [];
    renderTable = false;
    // Retrieve backend raw data
  }

  function exportCsv () {
    let csv = "";
    // Loop the array of objects
    for (let row = 0; row < items.length; row++) {
      let keysAmount = Object.keys(items[row]).length;
      let keysCounter = 0;

      // If this is the first row, generate the headings
      if (row === 0) {
        // Loop each property of the object
        for (let key in items[row]) {
          // This is to not add a comma at the last cell
          // The '\r\n' adds a new line
          csv += key + (keysCounter+1 < keysAmount ? ';' : '\r\n' );
          keysCounter++;
        }
      } else {
        for (let key in items[row]) {
          // @ts-ignore
          csv += items[row][key] + (keysCounter+1 < keysAmount ? ';' : '\r\n' );
          keysCounter++;
        }
      }
      keysCounter = 0;
    }
    // Once we are done looping, download the .csv by creating a link
    let link = document.createElement('a');
    link.id = 'download-csv';
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
    link.setAttribute('download', 'table.csv');
    document.body.appendChild(link);
    // @ts-ignore
    document.querySelector('#download-csv').click();
  }

  function checkAll () {
    group = perfVarsList;
  }

  onMount (async () => {
    try {
        axios.defaults.withCredentials = true;
        const instance = axios.create({ baseURL: baseURL });
        const res = await instance.get('/get-analyzable-data');
        dictCSVFiles = res.data.dict_csv_files;
        perfVarsList = res.data.perf_vars

        // @ts-ignore
        let filesdata = dictCSVFiles.reduce((r, c) => Object.assign(r, c), {});
        for (let value = 0; value < Object.values(filesdata)[0].length; value++) {
          let item = {};
          for (let key = 0; key < Object.keys(filesdata).length; key++) {
            // @ts-ignore
            item[Object.keys(filesdata)[key]] = Object.values(filesdata)[key][value];
          }
          items.push(item);
        }
    } catch (err) {
      console.log(err);
    }
  });
</script>

<!--Check vars to display in table-->
<Card size="xl">
  {#if perfVarsList.length !== 0}
    <div class="grid gap-3 md:grid-cols-4" style="margin-bottom:5px">
      <Button color="alternative" on:click={checkAll}>Check all</Button>
      <Button color="red" on:click={reset}>Reset</Button>
    </div>
  {/if}
  <div class="grid gap-3 md:grid-cols-3 rounded-lg border border-gray-200">
		{#each perfVarsList as perfVar}
			<Checkbox bind:group value={perfVar}> {perfVar} </Checkbox>
		{/each}
  </div>
  {#if group.length !== 0}
  <div class="grid gap-3 md:grid-cols-4" style="margin-top:10px">  
    <Button on:click={getChecks}>Save</Button>
    {#if renderTable}
      <Button color="green" on:click={exportCsv}>Export</Button>
    {/if}
  </div>
  {/if}
</Card>

<!--Data table-->
<Table color="green" striped={true} hoverable={true} shadow style="margin-top:10px">
  <TableHead>
    {#if renderTable}
      {#each Object.keys(items[0]) as item}
        <TableHeadCell>{item}</TableHeadCell>
      {/each}
    {/if}
  </TableHead>
  <TableBody>
    {#if renderTable}
      {#each items as item}
        <TableBodyRow>
          {#each Object.values(item) as value}
            <TableBodyCell>{value}</TableBodyCell>
          {/each}
        </TableBodyRow>
      {/each}
    {/if}
  </TableBody>
</Table>
  