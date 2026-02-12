let climateChart;

function simulate() {
    const city = document.getElementById("city").value || "Your City";
    const renewable = parseInt(document.getElementById("renewable").value);
    const transport = parseInt(document.getElementById("transport").value);
    const greenCover = parseInt(document.getElementById("greenCover").value);
    const plastic = parseInt(document.getElementById("plastic").value);

    // Sustainability Score Formula
    let score = (renewable * 0.3) + (transport * 0.25) + 
                (greenCover * 0.25) + (plastic * 0.2);

    score = Math.round(score);

    let riskLevel;
    let riskClass;
    let projectedAQI;
    let tempRise;

    if (score >= 70) {
        riskLevel = "Low Climate Risk 🌱";
        riskClass = "low-risk";
        projectedAQI = 40;
        tempRise = 1.2;
    } else if (score >= 40) {
        riskLevel = "Moderate Climate Risk ⚠️";
        riskClass = "medium-risk";
        projectedAQI = 110;
        tempRise = 2.5;
    } else {
        riskLevel = "High Climate Risk 🔥";
        riskClass = "high-risk";
        projectedAQI = 220;
        tempRise = 4.3;
    }

    const scoreBox = document.getElementById("scoreBox");
    scoreBox.className = riskClass;
    scoreBox.innerHTML = `
        <h3>${city} Sustainability Score: ${score}/100</h3>
        <p>${riskLevel}</p>
        <p>Projected AQI (2035): ${projectedAQI}</p>
        <p>Projected Temperature Rise: +${tempRise}°C</p>
    `;

    updateChart(projectedAQI);
}

function updateChart(aqi) {
    const ctx = document.getElementById("chart").getContext("2d");

    if (climateChart) climateChart.destroy();

    climateChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["2026", "2028", "2030", "2032", "2035"],
            datasets: [{
                label: "Projected AQI",
                data: [80, 100, 140, 180, aqi],
                borderColor: "#e74c3c",
                tension: 0.4
            }]
        },
        options: {
            plugins: {
                legend: { labels: { color: "white" } }
            },
            scales: {
                x: { ticks: { color: "white" } },
                y: { ticks: { color: "white" } }
            }
        }
    });
}
