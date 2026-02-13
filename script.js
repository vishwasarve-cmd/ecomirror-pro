document.addEventListener("DOMContentLoaded", function () {

  // Scroll to simulation
  document.getElementById("exploreBtn").addEventListener("click", function () {
    document.querySelectorAll(".section")[0].scrollIntoView({
      behavior: "smooth"
    });
  });

  // Counter Animation
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText;
      const increment = target / 100;

      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });

  // Chart
  const ctx = document.getElementById("chartCanvas");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2025", "2030", "2040", "2050"],
      datasets: [{
        label: "Projected Emissions (Gt)",
        data: [35, 50, 70, 90],
        borderColor: "#00ffae",
        backgroundColor: "rgba(0,255,174,0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 2000 }
    }
  });

  // Simulator
  const renewable = document.getElementById("renewable");
  const green = document.getElementById("green");

  renewable.oninput = () => {
    document.getElementById("renewableVal").innerText = renewable.value + "%";
  };

  green.oninput = () => {
    document.getElementById("greenVal").innerText = green.value + "%";
  };

  document.getElementById("simulateBtn").addEventListener("click", function () {
    let reduction = renewable.value * 0.6 + green.value * 0.4;

    document.getElementById("simResult").innerText =
      "Projected Carbon Reduction: " + reduction.toFixed(1) + "% by 2040";
  });

});














