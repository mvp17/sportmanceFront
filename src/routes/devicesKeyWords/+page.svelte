<svelte:head>
	<title>Devices Key Words</title>
</svelte:head>

<script>
  import { Card, Input, Label, Helper, Button } from 'flowbite-svelte';
  let messages = [];
  let perfVars = [];
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
<div class='row'>
    <div class="column">
        <h5 class="alert alert-primary" style="width: 475px; margin: 15px">
            The column names for this devices file are: </h5>
        {#each perfVars as perfVar}
            <p style="margin-bottom: 3px"> {perfVar} </p>
        {/each}
    </div>
    <div class="column">
        <h5 class="alert alert-success" style="width: 475px; margin: 15px"> Fill out the form with the corresponding info: </h5>
        <Card>
            <form>
                <div class="mb-6">
                    <Label for="time_name" class="mb-2">Column name of Time of DEVICES files</Label>
                    <Input type="text" id="time_name" placeholder="Time" required />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Card>
    </div>
</div>
{/if}
