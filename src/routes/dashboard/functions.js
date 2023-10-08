export function checksToChart() {
	let lists_labels = [];
	let lists_data = [];
	let contexts = [];

	for (let i = 0; i < chartVars.length; i++)
		contexts.push(document.getElementById(chartVars[i]).getContext('2d'));
	// contexts.length = lists_labels.length = lists_data.length = chart_vars.length

	let category = getCheck();
	for (let i = 0; i < contexts.length; i++) {
		setChart(
			contexts[i],
			category,
			lists_labels[i],
			lists_data[i],
			chartVars[i],
			getColors(lists_labels[i])
		);
		document.querySelector('.' + chartVars[i]).addEventListener('click', function () {
			exportDataToCSV(chartVars[i] + '.csv', lists_data[i], lists_labels[i]);
		});
	}
}

function setChart(context, category, labels, data, label, backColor) {
	new Chart(context, {
		// The type of chart we want to create
		type: category,

		// The data for our dataset
		data: {
			labels: labels,
			datasets: [
				{
					label: label,
					backgroundColor: backColor,
					borderColor: backColor,
					data: data
				}
			]
		},

		// Configuration options go here
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true
						}
					}
				]
			},
			legend: {
				display: false
			}
		}
	});
}

function getColors(labels) {
	let totalColors = [
		'rgb(255, 99, 132)',
		'rgb(54, 162, 235)',
		'rgb(255, 206, 86)',
		'rgb(75, 192, 192)',
		'rgb(153, 102, 255)',
		'rgb(255, 159, 64)'
	];
	let colors = [];

	let j = 0;
	for (let i = 0; i < labels.length; i++) {
		if (j === totalColors.length) {
			j = 0;
			colors.push(totalColors[j]);
			j++;
		} else {
			colors.push(totalColors[j]);
			j++;
		}
	}

	return colors;
}

function getCheck() {
	let checks = document.getElementsByClassName('checks');
	let str = [];

	for (let i = 0; i < checks.length; i++) {
		if (checks[i].checked === true) str.push(checks[i].value);
	}

	if (str.length > 1) {
		alert('Error. Two or more chart types have been checked.');
		location.reload();
	} else {
		return str[0];
	}
}

function exportDataToCSV(filename, data, labels) {
	let json = convertArraysToJson(data, labels);
	let csv = convertToCSV(json);
	csv = csv.replace(/,/g, ';');
	// For decimal value labels.
	csv = csv.replace(/\./g, ',');
	downloadCSV(csv, filename);
}

function convertArraysToJson(data, labels) {
	let obj = {};
	let result = [];
	for (let i = 0; i < labels.length; i++) obj[labels[i]] = data[i];

	result.push(obj);
	return result;
}

function convertToCSV(arr) {
	const array = [Object.keys(arr[0])].concat(arr);

	return array
		.map((it) => {
			return Object.values(it).toString();
		})
		.join('\n');
}

function downloadCSV(csv, filename) {
	let csvFile;
	let downloadLink;

	// CSV FILE
	csvFile = new Blob([csv], { type: 'text/csv' });

	// Download link
	downloadLink = document.createElement('a');

	// File name
	downloadLink.download = filename;

	// We have to create a link to the file
	downloadLink.href = window.URL.createObjectURL(csvFile);

	// Make sure that the link is not displayed
	downloadLink.style.display = 'none';

	// Add the link to your DOM
	document.body.appendChild(downloadLink);

	downloadLink.click();
}
