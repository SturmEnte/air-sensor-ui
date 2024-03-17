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
}

updateSensorData();
setInterval(updateSensorData, 10000);
