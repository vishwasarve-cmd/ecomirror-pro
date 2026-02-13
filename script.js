let pieChart = null;
let lineChart = null;

function predict() {

  const country = document.getElementById("country").value;
  const transport = document.getElementById("transport").value;
  const industry = document.getElementById("industry").value;
  const renewable = document.getElementById("renewable").value;

  let score = 50;
  score += transport === "Low" ? 10 : -10;
  score += industry === "Low" ? 10 : -10;
  score += renewable === "High" ? 20 : -15;
  score = Math.max(0, Math.min(100, score));

  const temperature = ((100 - score) / 20).toFixed(1);
  const aqi = Math.floor((100 - score) * 3.5);
  const sea = Math.floor((100 - score) * 0.4);
  const carbon = Math.floor((100 - score) * 1.5);
  const healthRisk = score > 70 ? "Low" : score > 40 ? "Moderate" : "High";

  document.getElementById("form-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");

  document.getElementById("future-title").innerText =
    country + " Climate Outlook 2045";

  document.getElementById("temp").innerHTML = temperature + "°C";
  document.getElementById("aqi").innerHTML = aqi;
  document.getElementById("sea").innerHTML = sea + " cm";
  document.getElementById("carbon").innerHTML = carbon;
  document.getElementById("health").innerHTML = healthRisk;
  document.getElementById("scoreValue").innerHTML = score;

  document.querySelector(".score-circle").style.background =
    `conic-gradient(#22c55e ${score}%, #e5e7eb ${score}%)`;

  document.getElementById("temp-bar").style.width = (temperature * 20) + "%";
  document.getElementById("aqi-bar").style.width = (aqi / 3.5) + "%";
  document.getElementById("sea-bar").style.width = (sea * 2.5) + "%";
  document.getElementById("carbon-bar").style.width = carbon + "%";
  document.getElementById("wheel-temp").innerHTML = temperature + "°C";
document.getElementById("wheel-aqi").innerHTML = aqi;
document.getElementById("wheel-sea").innerHTML = sea + " cm";
document.getElementById("wheel-carbon").innerHTML = carbon;

  applyColor("temp-card", temperature > 3 ? "bad" : "good");
  applyColor("aqi-card", aqi > 200 ? "bad" : "medium");
  applyColor("sea-card", sea > 20 ? "bad" : "medium");
  applyColor("carbon-card", carbon > 60 ? "bad" : "good");
  applyColor("health-card", healthRisk === "High" ? "bad" : "good");

  createCharts(aqi, temperature);
}

function applyColor(id, status) {
  const card = document.getElementById(id);
  card.classList.remove("good", "medium", "bad");
  card.classList.add(status);
}

function createCharts(aqi, temperature) {

  if (pieChart) pieChart.destroy();
  if (lineChart) lineChart.destroy();

  const pollutionPercent = Math.min(100, aqi / 3.5);
  const cleanPercent = 100 - pollutionPercent;

  pieChart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Clean Air", "Pollution"],
      datasets: [{
        data: [cleanPercent, pollutionPercent],
        backgroundColor: ["#16a34a", "#dc2626"]
      }]
    }
  });

  lineChart = new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: ["2025", "2030", "2035", "2040", "2045"],
      datasets: [{
        label: "Projected Temperature Rise (°C)",
        data: [1, 1.6, 2.3, 3.1, parseFloat(temperature)],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.4
      }]
    }
  });
}

function reset() {
  document.getElementById("result-section").classList.add("hidden");
  document.getElementById("form-section").classList.remove("hidden");
}








