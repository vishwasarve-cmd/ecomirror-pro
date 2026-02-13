let pieChart, lineChart;

function predict() {

  const country = document.getElementById("country").value;
  const transport = document.getElementById("transport").value;
  const industry = document.getElementById("industry").value;
  const renewable = document.getElementById("renewable").value;

  let score = 0;

  if (transport === "High") score -= 10;
  if (transport === "Low") score += 10;

  if (industry === "High") score -= 10;
  if (industry === "Low") score += 10;

  if (renewable === "High") score += 15;
  if (renewable === "Low") score -= 10;

  let temperature = score > 10 ? -1 : score < 0 ? 4 : 2;
  let aqi = score > 10 ? 60 : score < 0 ? 320 : 180;
  let sea = score > 10 ? 4 : score < 0 ? 30 : 12;

  document.getElementById("form-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");

  document.getElementById("future-title").innerText =
    country + " Climate Outlook 2045";

  document.getElementById("temp").innerHTML =
    "🌡 Temp: <strong>" + temperature + "°C</strong>";

  document.getElementById("aqi").innerHTML =
    "🌫 AQI: <strong>" + aqi + "</strong>";

  document.getElementById("sea").innerHTML =
    "🌊 Sea Rise: <strong>" + sea + " cm</strong>";

  createCharts(aqi, temperature);
}

function createCharts(aqi, temperature) {

  if (pieChart) pieChart.destroy();
  if (lineChart) lineChart.destroy();

  // PIE CHART - Air Quality
  pieChart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Clean Air", "Pollution"],
      datasets: [{
        data: [100 - (aqi/4), aqi/4],
        backgroundColor: ["#22c55e", "#dc2626"]
      }]
    },
    options: {
      responsive: true
    }
  });

  // LINE CHART - Temperature Trend
  lineChart = new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: ["2025", "2030", "2035", "2040", "2045"],
      datasets: [{
        label: "Temperature Trend (°C)",
        data: [1, 1.5, 2, 2.5, temperature],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.2)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function reset(){
  document.getElementById("result-section").classList.add("hidden");
  document.getElementById("form-section").classList.remove("hidden");
}





