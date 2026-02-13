document.addEventListener("DOMContentLoaded", function () {

  // Navigation
  const buttons = document.querySelectorAll(".nav-btn");
  const pages = document.querySelectorAll(".page");

  buttons.forEach(btn => {
    btn.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      pages.forEach(p => p.classList.remove("active"));
      document.getElementById(target).classList.add("active");
    });
  });

  // Chart
  const ctx = document.getElementById("chartCanvas");
  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2025", "2030", "2040", "2050"],
        datasets: [{
          label: "Carbon Emissions (Gt)",
          data: [35, 45, 60, 75],
          borderColor: "#00ffae",
          backgroundColor: "rgba(0,255,174,0.2)",
          fill: true
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  // Sliders
  const renewable = document.getElementById("renewable");
  const green = document.getElementById("green");

  renewable.addEventListener("input", function () {
    document.getElementById("renewableValue").innerText = this.value + "%";
  });

  green.addEventListener("input", function () {
    document.getElementById("greenValue").innerText = this.value + "%";
  });

  // Simulation
  document.getElementById("simulateBtn").addEventListener("click", function () {
    let result = renewable.value * 0.6 + green.value * 0.4;
    document.getElementById("simResult").innerText =
      "Projected Carbon Reduction: " + result.toFixed(2) + "%";
  });

  // Carbon Calculator
  document.getElementById("calcBtn").addEventListener("click", function () {
    let electricity = parseFloat(document.getElementById("electricity").value) || 0;
    let fuel = parseFloat(document.getElementById("fuel").value) || 0;

    let total = electricity * 0.85 + fuel * 2.3;

    document.getElementById("carbonResult").innerText =
      "Estimated CO₂: " + total.toFixed(2) + " kg/month";
  });

});














