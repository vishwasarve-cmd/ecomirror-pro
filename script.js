document.addEventListener("DOMContentLoaded", function () {

  // Navigation Animation
  const buttons = document.querySelectorAll(".nav-btn");
  const pages = document.querySelectorAll(".page");

  buttons.forEach(btn => {
    btn.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      pages.forEach(p => p.classList.remove("active"));
      document.getElementById(target).classList.add("active");
    });
  });

  // Animated Chart
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
          backgroundColor: "rgba(0,255,174,0.3)",
          fill: true
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000
        }
      }
    });
  }

  // Slider Animation
  const renewable = document.getElementById("renewable");
  const green = document.getElementById("green");

  renewable.addEventListener("input", function () {
    document.getElementById("renewableValue").innerText = this.value + "%";
  });

  green.addEventListener("input", function () {
    document.getElementById("greenValue").innerText = this.value + "%";
  });

  document.getElementById("simulateBtn").addEventListener("click", function () {
    let result = renewable.value * 0.6 + green.value * 0.4;

    document.getElementById("simResult").innerText =
      "Projected Carbon Reduction: " + result.toFixed(2) + "% 🌱";
  });

});













