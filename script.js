document.addEventListener("DOMContentLoaded", function () {

  // Navigation
  document.querySelectorAll("[data-section]").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let section = this.getAttribute("data-section");
      document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
      document.getElementById(section).classList.add("active");
    });
  });

  // Theme Toggle
  document.getElementById("themeToggle").addEventListener("click", function(){
    document.body.classList.toggle("light");
  });

  // Chart Initialization
  const ctx = document.getElementById("climateChart");
  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2025", "2030", "2040", "2050"],
        datasets: [{
          label: "Carbon Emissions (Gt)",
          data: [35, 42, 55, 70],
          borderColor: "#00ffae",
          backgroundColor: "rgba(0,255,174,0.1)",
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: "white" } } },
        scales: {
          x: { ticks: { color: "white" } },
          y: { ticks: { color: "white" } }
        }
      }
    });
  }

  // Simulator Sliders
  const renewable = document.getElementById("renewable");
  const greenspace = document.getElementById("greenspace");

  renewable.oninput = () => {
    document.getElementById("renewableVal").innerText = renewable.value + "%";
  };

  greenspace.oninput = () => {
    document.getElementById("greenVal").innerText = greenspace.value + "%";
  };

  document.getElementById("simulateBtn").addEventListener("click", function(){
    let result = renewable.value * 0.6 + greenspace.value * 0.4;
    document.getElementById("simulationResult").innerText =
      "Projected Carbon Reduction: " + result.toFixed(2) + "% by 2040 🌍";
  });

  // Carbon Calculator
  document.getElementById("calcCarbon").addEventListener("click", function(){
    let electricity = parseFloat(document.getElementById("electricity").value) || 0;
    let fuel = parseFloat(document.getElementById("fuel").value) || 0;

    let total = (electricity * 0.85) + (fuel * 2.3);
    document.getElementById("carbonOutput").innerText =
      "Estimated Monthly CO₂ Emission: " + total.toFixed(2) + " kg";
  });

});













