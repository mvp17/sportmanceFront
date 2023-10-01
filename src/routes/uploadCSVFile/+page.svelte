<svelte:head>
	<title>Upload CSV File</title>
</svelte:head>

<script>
    import { Fileupload, Card, Label, Input, Button, Select } from 'flowbite-svelte';
    let messages = [];
    let value;
    let selected;
    let frequencies = [
        { value: 1, name: '1 Hz' },
        { value: 5, name: '5 Hz' },
        { value: 10, name: '10 Hz' },
        { value: 25, name: '25 Hz' },
        { value: 100, name: '100 Hz' },
        { value: 1000, name: '1000 Hz' }
    ];
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
    <!--form upload file-->
    <Card>
        <form>
            <div class="mb-6">
                <Label for="title" class="mb-2">Title</Label>
                <Input type="text" id="title" placeholder="" required />
            </div>
            <div class="mb-6">
                <Label for="athlete" class="mb-2">Athlete</Label>
                <Input type="text" id="athlete" placeholder="" required />
            </div>
            <div class="mb-6">
                <Label>
                    Frequency
                    <Select class="mt-2" items={frequencies} bind:value={selected} />
                </Label>
            </div>
            <div class="mb-6">
                <Label class="space-y-2 mb-2">
                    <span>Upload CSV file</span>
                    <Fileupload bind:value />
                </Label>
                <Label>File: {value}</Label>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    </Card>
{/if}
