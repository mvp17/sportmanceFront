<svelte:head>
	<title>Upload CSV File</title>
</svelte:head>

<script>
    import { Fileupload, Card, Label, Input, Button, Select, Checkbox } from 'flowbite-svelte';
    import axios from 'axios';
    import { baseURL } from '../../environment';
    import { goto } from '$app/navigation';
    import { toast } from 'svelte-sonner';
    import { eventsFile, dataInput } from '../../stores/sessionStore';
    
    let /** @type {FileList} */ files;
    let /** @type {number} */ frequency;
    let /** @type {string} */ title;
    let /** @type {string} */ athlete;
    let /** @type {boolean} */ isEventsFile;

    let frequencies = [
        { value: 1, name: '1 Hz' },
        { value: 5, name: '5 Hz' },
        { value: 10, name: '10 Hz' },
        { value: 25, name: '25 Hz' },
        { value: 100, name: '100 Hz' },
        { value: 1000, name: '1000 Hz' }
    ];
    
    async function registerDataInput () {
		try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
            const formData = new FormData();
            formData.append('csv', files[0]);
            formData.append('title', title);
            formData.append('athlete', athlete);
            formData.append('is_event_file', isEventsFile.toString());
            formData.append('frequency', frequency.toString());
			await instance.post('/register-data-input', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success('Data registered successfully!', { style: 'background: LightGreen; border-color: LightGreen;' });
            if (isEventsFile) eventsFile.set(1);
            dataInput.set(1);
            goto('/dataInput');
		} catch (err) {
			console.log(err);
		}
	}
</script>

<Card>
    <form on:submit|preventDefault={registerDataInput}>
        <div class="mb-6">
            <Label for="title" class="mb-2">Title</Label>
            <Input type="text" id="title" placeholder="" bind:value={title} required />
        </div>
        <div class="mb-6">
            <Label for="athlete" class="mb-2">Athlete</Label>
            <Input type="text" id="athlete" placeholder="" bind:value={athlete} required />
        </div>
        <div class="mb-6">
            <Label class="space-y-2 mb-2">
                <span>Upload CSV file</span>
                <Fileupload bind:files />
            </Label>
        </div>
        <div class="mb-6">
            <Checkbox bind:checked={isEventsFile}>Is events file?</Checkbox>
        </div>
        {#if !isEventsFile}
        <div class="mb-6">
            <Label>
                Frequency
                <Select class="mt-2" items={frequencies} bind:value={frequency} />
            </Label>
        </div>
        {/if}
        <Button type="submit">Submit</Button>
    </form>
</Card>
