const temperatureElem = document.getElementById("temperature-data");
const relativeHumidityElem = document.getElementById("relative-humidity-data");
const absoluteHumidityElem = document.getElementById("absolute-humidity-data");
const eco2Elem = document.getElementById("eco2-data");
const tvocElem = document.getElementById("tvoc-data");

const settings = JSON.parse(localStorage.getItem("settings"));

async function updateSensorData() {
	const response = await fetch(settings.url, { method: "get" });

	if (!response || response.status > 299) {
		console.log("Failed to fetch sensor data");
		return;
	}

	if (!response.headers.has("content-type") || response.headers.get("content-type") != "application/json") {
		console.log("Wrong response type");
		return;
	}

	const data = await response.json();

	console.log(data);

	temperatureElem.innerHTML = data.temperature + " °C";
	relativeHumidityElem.innerHTML = data.relative_humidity + " %";
	absoluteHumidityElem.innerHTML = data.absolute_humidity + " g/m³";
	eco2Elem.innerHTML = data.eco2 + " ppm";
	tvocElem.innerHTML = data.tvoc + " ppb";
}

updateSensorData();
setInterval(updateSensorData, 10000);
