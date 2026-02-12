function runSimulation() {

    const renewable = +document.getElementById("renewable").value;
    const green = +document.getElementById("green").value;
    const transport = +document.getElementById("transport").value;
    const emission = +document.getElementById("emission").value;

    const sustainability =
        (renewable * 0.3) +
        (green * 0.25) +
        (transport * 0.25) +
        (emission * 0.2);

    const projectedAQI = Math.round(250 - sustainability * 1.8);
    const tempRise = (5 - sustainability * 0.03).toFixed(2);
    const co2Level = Math.round(450 - sustainability * 1.5);

    document.getElementById("aqiBox").innerHTML =
        "<h3>Projected AQI</h3><h2>" + projectedAQI + "</h2>";

    document.getElementById("tempBox").innerHTML =
        "<h3>Temperature Rise</h3><h2>+" + tempRise + "°C</h2>";

    document.getElementById("co2Box").innerHTML =
        "<h3>CO₂ Concentration</h3><h2>" + co2Level + " ppm</h2>";

    document.getElementById("statusBox").innerHTML =
        "<h3>Environmental Outlook</h3><h2>" +
        (sustainability > 65 ? "Recovering Ecosystem 🌱" :
         sustainability > 40 ? "Climate Stress ⚠️" :
         "Severe Instability 🔥") +
        "</h2>";

    document.getElementById("futureAQI").innerText = "AQI: " + projectedAQI;
    document.getElementById("futureTemp").innerText = "Temp Rise: +" + tempRise + "°C";
    document.getElementById("futureCO2").innerText = "CO₂: " + co2Level + " ppm";

    new Chart(document.getElementById("trendChart"), {
        type: "line",
        data: {
            labels: ["2026", "2028", "2030", "2032", "2035"],
            datasets: [{
                label: "AQI Projection",
                data: [120, 140, 160, 190, projectedAQI],
                borderColor: "#22c55e",
                tension: 0.4
            }]
        }
    });
}

