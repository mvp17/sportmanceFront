<script>
    let messages = [];
    let dictCSVFiles = [];
    let perfVarsList = ["var1", "var2"];
  
    function getSelectorChecks() {
      let checks = document.getElementsByClassName("checks");
      let str = [];
  
      for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked === true) {
          str.push(checks[i].value);
        }
      }
      processChecksWithDataToDisplay(str);
    }
  
    function processChecksWithDataToDisplay(str) {
      let list_json = { dictCSVFiles };
      let keys = [];
      let values = [];
      //list_json = {dictCSVFiles};
  
      for (let dict = 0; dict < list_json.length; dict++) {
        for (let key in list_json[dict]) {
          if (list_json[dict].hasOwnProperty(key)) {
            if (str.includes(key)) {
              keys.push(key);
              values.push(list_json[dict][key]);
            }
          }
        }
      }
      generateDataTable(keys, values);
    }
  
    function generateDataTable(columnNames, columnValues) {
      let body = document.body,
        tbl = document.createElement("table");
      let subListLength = 0;
  
      let tr = tbl.insertRow();
      for (let i = 0; i < columnNames.length; i++) {
        let th = document.createElement("TH");
        th.appendChild(document.createTextNode(columnNames[i].toString()));
        tr.appendChild(th);
      }
  
      for (let value in columnValues) {
        if (columnValues.hasOwnProperty(value)) {
          subListLength = columnValues[value].length;
          break;
        }
      }
  
      for (let i = 0; i < subListLength; i++) {
        let tr = tbl.insertRow();
        for (let j = 0; j < columnValues.length; j++) {
          let td = tr.insertCell();
          td.appendChild(document.createTextNode(columnValues[j][0].toString()));
          columnValues[j].shift();
        }
      }
      body.appendChild(tbl);
    }
  
    function exportTableToCSV(filename) {
      let csv = [];
      let rows = document.querySelectorAll("table tr");
  
      for (let i = 0; i < rows.length; i++) {
        let row = [],
          cols = rows[i].querySelectorAll("td, th");
  
        for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);
  
        csv.push(row.join(";"));
      }
      // Download CSV
      downloadCSV(csv.join("\n"), filename);
    }
  
    function downloadCSV(csv, filename) {
      let csvFile;
      let downloadLink;
  
      // CSV FILE
      csvFile = new Blob([csv], { type: "text/csv" });
  
      // Download link
      downloadLink = document.createElement("a");
  
      // File name
      downloadLink.download = filename;
  
      // We have to create a link to the file
      downloadLink.href = window.URL.createObjectURL(csvFile);
  
      // Make sure that the link is not displayed
      downloadLink.style.display = "none";
  
      // Add the link to your DOM
      document.body.appendChild(downloadLink);
  
      downloadLink.click();
    }
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
    <h1>Data analytics</h1>
    <div>
      {#each perfVarsList as perfVar}
        <input type="checkbox" class="checks" value={perfVar}> {perfVar}
      {/each}
      <button class="btn btn-primary" on:click={getSelectorChecks}>Save</button>
    </div>
    <div>
      <button class="btn btn-success example" on:click={() => exportTableToCSV("table.csv")}>
        Export HTML table to CSV file
      </button>
    </div>
  </div>
  {/if}
  