let pieChart = null;
let lineChart = null;

/* ===========================
   MAIN PREDICT FUNCTION
=========================== */
function predict() {

  const country = document.getElementById("country").value;
  const transport = document.getElementById("transport").value;
  const industry = document.getElementById("industry").value;
  const renewable = document.getElementById("renewable").value;

  // Climate scoring system
  let score = 50; // Start neutral

  score += transport === "Low" ? 10 : -10;
  score += industry === "Low" ? 10 : -10;
  score += renewable === "High" ? 20 : -15;

  // Clamp score between 0–100
  score = Math.max(0, Math.min(100, score));

  // Calculate projections
  const temperature = ((100 - score) / 20).toFixed(1);  // 0–5°C
  const aqi = Math.floor((100 - score) * 3.5);          // 0–350
  const sea = Math.floor((100 - score) * 0.4);          // 0–40 cm

  showResults(country, temperature, aqi, sea, score);
  generateCharts(aqi, temperature);
  applyTheme(score);
}

/* ===========================
   SHOW RESULTS WITH ANIMATION
=========================== */
function showResults(country, temp, aqi, sea, score) {

  document.getElementById("form-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");

  document.getElementById("future-title").innerText =
    `${country} Climate Outlook 2045`;

  animateValue("temp", 0, temp, "°C");
  animateValue("aqi", 0, aqi, "");
  animateValue("sea", 0, sea, " cm");
}

/* ===========================
   NUMBER COUNT ANIMATION
=========================== */
function animateValue(id, start, end, suffix) {

  let duration = 1200;
  let range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = timestamp - startTime;
    let value = Math.min(start + (range * (progress / duration)), end);

    document.getElementById(id).innerHTML =
      `<strong>${value.toFixed(1)}${suffix}</strong>`;

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

/* ===========================
   CHART GENERATION
=========================== */
function generateCharts(aqi, temperature) {

  if (pieChart) pieChart.destroy();
  if (lineChart) lineChart.destroy();

  const cleanAir = Math.max(10, 100 - (aqi / 3.5));
  const pollution = 100 - cleanAir;

  // PIE CHART
  pieChart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Clean Air %", "Pollution %"],
      datasets: [{
        data: [cleanAir, pollution],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 3
      }]
    },
    options: {
      animation: {
        animateScale: true
      }
    }
  });

  // LINE CHART
  lineChart = new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: ["2025", "2030", "2035", "2040", "2045"],
      datasets: [{
        label: "Temperature Rise (°C)",
        data: [
          1,
          1.5,
          2.2,
          3,
          parseFloat(temperature)
        ],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#1d4ed8"
      }]
    },
    options: {
      animation: {
        duration: 1500
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

/* ===========================
   DYNAMIC THEME SWITCH
=========================== */
function applyTheme(score) {

  const container = document.querySelector(".container");

  if (score >= 70) {
    container.style.boxShadow =
      "0 20px 40px rgba(34,197,94,0.4)";
  } 
  else if (score >= 40) {
    container.style.boxShadow =
      "0 20px 40px rgba(59,130,246,0.4)";
  } 
  else {
    container.style.boxShadow =
      "0 20px 40px rgba(239,68,68,0.5)";
  }
}

/* ===========================
   RESET FUNCTION
=========================== */
function reset() {
  document.getElementById("result-section").classList.add("hidden");
  document.getElementById("form-section").classList.remove("hidden");
}






