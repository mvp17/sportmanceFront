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
  let /** @type { {maker: string, type: string, make: number}[] } */ items = [
    { maker: 'Toyota', type: 'ABC', make: 2017 },
    { maker: 'Ford', type: 'CDE', make: 2018 },
    { maker: 'Volvo', type: 'FGH', make: 2019 },
    { maker: 'Saab', type: 'IJK', make: 2020 }
  ];
  let /** @type { string[][][] } */ dictCSVFiles = [];
  let /** @type { string[] } */ perfVarsList = Object.keys(items[0]);
  let /** @type { string[] } */ group = [];
  let renderTable = false;

  function getChecks () {
    items.map((item) => {
      Object.keys(item).map((key) => {
        if (!group.includes(key)) {
          // @ts-ignore
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
    items = [
      { maker: 'Toyota', type: 'ABC', make: 2017 },
      { maker: 'Ford', type: 'CDE', make: 2018 },
      { maker: 'Volvo', type: 'FGH', make: 2019 },
      { maker: 'Saab', type: 'IJK', make: 2020 }
    ];
  }

  function exportToCsv () {
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
          csv += key + (keysCounter+1 < keysAmount ? ',' : '\r\n' );
          keysCounter++;
        }
      }else{
        for(let key in items[row]){
          // @ts-ignore
          csv += items[row][key] + (keysCounter+1 < keysAmount ? ',' : '\r\n' );
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

  onMount (async () => {
    try {
        axios.defaults.withCredentials = true;
        const instance = axios.create({ baseURL: baseURL });
        const res = await instance.get('/get-analyzable-data');
        console.log(res.data);
        //dictCSVFiles = res.data.dict_csv_files;
        //perfVarsList = res.data.perf_vars
    } catch (err) {
      console.log(err);
    }
  });
</script>

<!--Check vars to display in table-->
<Card>
  <ul class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x divide-gray-200 dark:divide-gray-600">
    {#each perfVarsList as perfVar}
      <li class="w-full">
        <Checkbox bind:group value={perfVar}> {perfVar} </Checkbox>
      </li>
    {/each}
  </ul>
  {#if group.length !== 0}
    <Button on:click={getChecks}>Save</Button>
  {/if}
  {#if renderTable}
    <Button color="yellow" on:click={reset}>Reset</Button>
    <Button color="green" on:click={exportToCsv}>Export</Button>
  {/if}
</Card>

<!--Data table-->
<Table color="green" striped={true} hoverable={true} shadow>
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
  