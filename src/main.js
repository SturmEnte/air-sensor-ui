const settings = JSON.parse(localStorage.getItem("settings"));

async function updateSensorData() {
	fetch(settings.url, {
		method: "get",
		mode: "no-cors",
		headers: {
			Accept: "*/*",
			Connection: "keep-alive",
		},
	})
		.then((res) => {
			res
				.json()
				.then((data) => {
					console.log(data);
				})
				.catch((err) => {
					console.error("Error while turning body into json object:", "\n" + err);
				});
		})
		.catch((err) => {
			console.error("Error while fetching sensor data:", "\n" + err);
		});

	// if (!response || response.status > 299) {
	// 	console.log("Failed to fetch sensor data");
	// 	return;
	// }

	// // if (!response.headers.has("content-type") || response.headers.get("content-type") != "application/json") {
	// // 	console.log("Wrong response type");
	// // 	return;
	// // }

	// response.headers.forEach((header) => {
	// 	console.log(header);
	// });

	// console.log(await response.text());

	// const data = await response.json();

	// console.log(data);
}

updateSensorData();
setInterval(updateSensorData, 10000);
