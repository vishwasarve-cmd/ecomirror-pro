function scrollToDemo() {
    document.getElementById("demo").scrollIntoView({ behavior: "smooth" });
}

function runSimulation() {

    const years = +document.getElementById("timeline").value;

    const projectedAQI = 120 + years * 3;
    const tempRise = (1.2 + years * 0.05).toFixed(2);
    const riskScore = Math.min(100, years * 4);

    document.getElementById("aqiBox").innerHTML =
        "<h3>Projected AQI</h3><h2>" + projectedAQI + "</h2>";

    document.getElementById("tempBox").innerHTML =
        "<h3>Temperature Rise</h3><h2>+" + tempRise + "°C</h2>";

    document.getElementById("riskBox").innerHTML =
        "<h3>Climate Risk Index</h3><h2>" + riskScore + "/100</h2>";

    new Chart(document.getElementById("chart"), {
        type: "line",
        data: {
            labels: ["Now", "Mid-Term", "Future"],
            datasets: [{
                label: "AQI Projection",
                data: [120, 150, projectedAQI],
                borderColor: "#2563eb",
                tension: 0.4
            }]
        }
    });
}


