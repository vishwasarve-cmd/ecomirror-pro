function scrollToSimulation() {
    document.getElementById("simulation").scrollIntoView({ behavior: "smooth" });
}

function runSimulation() {

    const city = document.getElementById("city").value || "Selected City";
    const years = +document.getElementById("timeline").value;

    const greenAQI = Math.max(40, 100 - years * 1.2);
    const pollutedAQI = Math.min(250, 120 + years * 2);

    const greenTemp = (1 + years * 0.03).toFixed(2);
    const pollutedTemp = (1.2 + years * 0.07).toFixed(2);

    document.getElementById("greenAQI").innerText =
        "Projected AQI: " + greenAQI;

    document.getElementById("greenTemp").innerText =
        "Temperature Rise: +" + greenTemp + "°C";

    document.getElementById("pollutedAQI").innerText =
        "Projected AQI: " + pollutedAQI;

    document.getElementById("pollutedTemp").innerText =
        "Temperature Rise: +" + pollutedTemp + "°C";

    new Chart(document.getElementById("trendChart"), {
        type: "line",
        data: {
            labels: ["Now", "Mid-Term", "Long-Term"],
            datasets: [
                {
                    label: "Sustainable Path",
                    data: [100, 80, greenAQI],
                    borderColor: "#22c55e",
                    tension: 0.4
                },
                {
                    label: "Current Trajectory",
                    data: [120, 160, pollutedAQI],
                    borderColor: "#ef4444",
                    tension: 0.4
                }
            ]
        }
    });
}

