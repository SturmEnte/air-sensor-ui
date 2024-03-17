const lastUpdateElement = document.getElementById("server-last-update");
const temperatureElem = document.getElementById("temperature-data");
const relativeHumidityElem = document.getElementById("relative-humidity-data");
const absoluteHumidityElem = document.getElementById("absolute-humidity-data");
const eco2Elem = document.getElementById("eco2-data");
const tvocElem = document.getElementById("tvoc-data");

const settings = JSON.parse(localStorage.getItem("settings"));

document.getElementById("server-address").innerHTML += " " + settings.url;

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

	lastUpdateElement.innerHTML = "Last Successful Update: " + formatDate(new Date());
	temperatureElem.innerHTML = data.temperature + " °C";
	relativeHumidityElem.innerHTML = data.relative_humidity + " %";
	absoluteHumidityElem.innerHTML = data.absolute_humidity + " g/m³";
	eco2Elem.innerHTML = data.eco2 + " ppm";
	tvocElem.innerHTML = data.tvoc + " ppb";
}

updateSensorData();
setInterval(updateSensorData, 10000);

// Utils
function formatDate(date) {
	const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed (January = 0)
	const year = date.getFullYear();

	const hour = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${day}.${month}.${year} ${hour}:${minutes}:${seconds}`;
}
