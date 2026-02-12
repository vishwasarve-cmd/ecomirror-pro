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

    const risk = 100 - sustainability;

    const projectedAQI = Math.round(250 - sustainability * 1.8);
    const tempRise = (5 - sustainability * 0.03).toFixed(1);

    new Chart(document.getElementById("scoreChart"), {
        type: "doughnut",
        data: {
            datasets: [{
                data: [sustainability, 100 - sustainability],
                backgroundColor: ["#22c55e", "#475569"]
            }]
        },
        options: { cutout: "75%" }
    });

    new Chart(document.getElementById("riskChart"), {
        type: "doughnut",
        data: {
            datasets: [{
                data: [risk, 100 - risk],
                backgroundColor: ["#ef4444", "#475569"]
            }]
        },
        options: { cutout: "75%" }
    });

    document.getElementById("aqiBox").innerHTML =
        "<h3>Projected AQI</h3><p>" + projectedAQI + "</p>";

    document.getElementById("tempBox").innerHTML =
        "<h3>Temperature Rise</h3><p>+" + tempRise + "°C</p>";

    document.getElementById("statusBox").innerHTML =
        "<h3>Environmental Outlook</h3><p>" +
        (sustainability > 60 ? "Stable Future" :
         sustainability > 40 ? "Moderate Risk" :
         "Severe Instability") +
        "</p>";

    new Chart(document.getElementById("trendChart"), {
        type: "line",
        data: {
            labels: ["2026", "2028", "2030", "2032", "2035"],
            datasets: [{
                label: "AQI Projection",
                data: [90, 130, 160, 190, projectedAQI],
                borderColor: "#0ea5e9",
                tension: 0.4
            }]
        }
    });
}

