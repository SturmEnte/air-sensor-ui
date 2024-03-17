const temperatureElem = document.getElementById("temperature");
const relativeHumidityElem = document.getElementById("relative-humidity");
const absoluteHumidityElem = document.getElementById("absolute-humidity");
const eco2Elem = document.getElementById("eco2");
const tvocElem = document.getElementById("tvoc");

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

	temperatureElem.innerHTML = data.temperature;
	relativeHumidityElem.innerHTML = data.relative_humidity;
	absoluteHumidityElem.innerHTML = data.absolute_humidity;
	eco2Elem.innerHTML = data.eco2;
	tvocElem.innerHTML = data.tvoc;
}

updateSensorData();
setInterval(updateSensorData, 10000);
