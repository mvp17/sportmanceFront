<svelte:head>
	<title>Upload CSV File</title>
</svelte:head>

<script>
    import { Fileupload, Card, Label, Input, Button, Select, Checkbox } from 'flowbite-svelte';
    import axios from 'axios';
    import { baseURL } from '../../environment';
    
    let /** @type {string} */ fileValue = "";
    let /** @type {number} */ frequency;
    let /** @type {string} */ title;
    let /** @type {string} */ athlete;
    let /** @type {boolean} */ isEventsFile = false;

    let frequencies = [
        { value: 1, name: '1 Hz' },
        { value: 5, name: '5 Hz' },
        { value: 10, name: '10 Hz' },
        { value: 25, name: '25 Hz' },
        { value: 100, name: '100 Hz' },
        { value: 1000, name: '1000 Hz' }
    ];

    async function handleSubmit () {
		try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
			const data = {title: title, athlete: athlete, csv: fileValue, is_event_file: isEventsFile, frequency: frequency};
			const res = await instance.post('/register-data-input', data, { headers: { 'Content-Type': 'multipart/form-data' } });
			console.log(res.data)
		} catch (err) {
			console.log(err);
		}
	}
</script>

    <!--form upload file-->
    <Card>
        <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-6">
                <Label for="title" class="mb-2">Title</Label>
                <Input type="text" id="title" placeholder="" bind:value={title} required />
            </div>
            <div class="mb-6">
                <Label for="athlete" class="mb-2">Athlete</Label>
                <Input type="text" id="athlete" placeholder="" bind:value={athlete} required />
            </div>
            <div class="mb-6">
                <Label>
                    Frequency
                    <Select class="mt-2" items={frequencies} bind:value={frequency} />
                </Label>
            </div>
            <div class="mb-6">
                <Label class="space-y-2 mb-2">
                    <span>Upload CSV file</span>
                    <Fileupload bind:fileValue />
                </Label>
                <Label>File: {fileValue}</Label>
            </div>
            <div class="mb-6">
                <Checkbox checked={isEventsFile}>Is events file?</Checkbox>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    </Card>
