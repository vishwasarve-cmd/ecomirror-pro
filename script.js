let chartInstance = null;

function scrollToDemo() {
    document.getElementById("demo").scrollIntoView({ behavior: "smooth" });
}

function runSimulation() {

    const timelineElement = document.getElementById("timeline");

    if (!timelineElement) {
        alert("Timeline selector not found.");
        return;
    }

    const years = parseInt(timelineElement.value);

    const projectedAQI = 120 + years * 3;
    const tempRise = (1.2 + years * 0.05).toFixed(2);
    const riskScore = Math.min(100, years * 4);

    document.getElementById("aqiBox").innerHTML =
        "<h3>Projected AQI</h3><h2>" + projectedAQI + "</h2>";

    document.getElementById("tempBox").innerHTML =
        "<h3>Temperature Rise</h3><h2>+" + tempRise + "°C</h2>";

    document.getElementById("riskBox").innerHTML =
        "<h3>Climate Risk Index</h3><h2>" + riskScore + "/100</h2>";

    const ctx = document.getElementById("chart").getContext("2d");

    // Destroy previous chart if exists
    if (chartInstance !== null) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Now", "Mid-Term", "Future"],
            datasets: [{
                label: "AQI Projection",
                data: [120, 150, projectedAQI],
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.1)",
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}



