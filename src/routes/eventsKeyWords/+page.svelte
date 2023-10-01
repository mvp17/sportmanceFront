<svelte:head>
	<title>Events Key Words</title>
</svelte:head>

<script>
    import { Card, Input, Label, Helper, Button, Textarea } from 'flowbite-svelte';
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
            The column names for this events file are: </h5>
        {#each perfVars as perfVar}
            <p style="margin-bottom: 3px"> {perfVar} </p>
        {/each}
    </div>
    <div class="column">
        <h5 class="alert alert-success" style="width: 475px; margin: 15px"> Fill out the form with the corresponding info: </h5>
        <Card>
            <form>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <Label for="time_ms_name" class="mb-2">Column name of time in milli-seconds values</Label>
                    <Input type="text" id="time_ms_name" placeholder="Time" required />
                </div>
                <div>
                    <Label for="duration_time_ms_name" class="mb-2">Column name of Time Duration in milli-seconds values</Label>
                    <Input type="text" id="duration_time_ms_name" placeholder="Time Duration" required />
                </div>
            </div>
            <div class="mb-6">
                <Label for="chart_perf_vars" class="mb-2">Chart Performance variables</Label>
                <Textarea type="text" id="chart_perf_vars" placeholder="" required />
                <Helper class="text-sm mt-2">
                    Performance variables separated by comma for showing their data to the chart data. Use white spaces if you like. Please put the variables in the same order as they are shown.
                </Helper>
            </div>
            <Button type="submit">Submit</Button>
            </form>
        </Card>
    </div>
</div>
{/if}
