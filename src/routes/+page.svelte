<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { baseURL } from '../environment';
	
	let /** @type {string} */ chartPerfVars;
	let /** @type {string} */ durationTimeMsNameEvents;
	let /** @type {number} */ finTime;
	let /** @type {number} */ frequency;
	let /** @type {number} */ initTime;
	let /** @type {number} */ isThereChartPerfVars;
	let /** @type {number} */ isThereKeyWordsDevices;
	let /** @type {number} */ isThereKeyWordsEvents;
	let /** @type {number} */ isThereConfig;
	let /** @type {string} */ timeMsNameEvents;
	let /** @type {string} */ timeNameDevices;

	onMount(async () => {
        try {
			axios.defaults.withCredentials = true;
			const instance = axios.create({ baseURL: baseURL });
			const res = await instance.get('/get-session-data');
			initTime = res.data.init_time;
			finTime = res.data.fin_time;
			isThereConfig = res.data.is_there_settings;
			isThereKeyWordsEvents = res.data.is_there_key_words_events;
			isThereChartPerfVars = res.data.is_there_chart_perf_vars;
			isThereKeyWordsDevices = res.data.is_there_key_words_devices;
			frequency = res.data.frequency;
			chartPerfVars = res.data.chart_perf_vars;
			durationTimeMsNameEvents = res.data.duration_time_ms_name_events;
			timeMsNameEvents = res.data.time_ms_name_events;
			timeNameDevices = res.data.time_name_devices;
		} catch (err) {
			console.log(err);
		}
    });
</script>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
	</h1>

	<h2> The format for saving the files must be of the type "CSV (delimited by commas) (* .csv)".</h2>

	{#if isThereConfig === 1}
		<h2> There are settings configured. The parameters are as followed. Please if they are not for your 
			analysis session go to settings and change them.
		</h2>
		
		<h2> The initial filtering time is: {initTime} milliseconds</h2>
		
		<h2> The final filtering time is: {finTime} milliseconds</h2>
		
		<h2> The settings frequency is: {frequency} Hz</h2>
	{/if}

	{#if isThereKeyWordsEvents === 1}
		<h2> There are key words for events file registered. Please if they are not for your analysis 
			session go to the file list section and change them.
		</h2>
		<h2> The key word time name is: {timeMsNameEvents} </h2>
		<h2> The key word duration time name is: {durationTimeMsNameEvents} </h2>
		
		{#if isThereChartPerfVars === 0}
			<h2> The variables for chart data are: {chartPerfVars} </h2>
		{:else}
			<h2> There are no variables for chart data registered. Please if you want to visualize data in chart, 
				set the variables in the key words for events file section.
			</h2>
		{/if}

	{/if}

	{#if isThereKeyWordsDevices === 1}
		<h2> There are key words for devices file/s registered. Please if they are not for your analysis session 
			go to the file list section and change them.</h2>
		<h2> The key word time name is: {timeNameDevices} </h2>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
