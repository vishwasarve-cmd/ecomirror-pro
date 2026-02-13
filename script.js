let lineChart, pieChart;

const countryData = {
  india: { baseAQI: 120, baseTemp: 1.1 },
  germany: { baseAQI: 40, baseTemp: 0.9 },
  usa: { baseAQI: 60, baseTemp: 1.0 },
  singapore: { baseAQI: 55, baseTemp: 1.2 },
  brazil: { baseAQI: 50, baseTemp: 1.0 }
};

function simulate() {

  const country = document.getElementById("country").value;
  const travel = Number(document.getElementById("travel").value);
  const electricity = Number(document.getElementById("electricity").value);
  const diet = document.getElementById("diet").value;
  const year = Number(document.getElementById("year").value);

  const base = countryData[country];

  const dietImpact =
    diet === "meat" ? 40 :
    diet === "mixed" ? 15 :
    diet === "vegetarian" ? -10 : -20;

  const carbon = travel * 0.4 + electricity * 0.05 + dietImpact;

  const yearsAhead = year - 2025;

  const tempRise = base.baseTemp + (carbon / 150) * (yearsAhead / 4);
  const aqi = Math.round(base.baseAQI + carbon);
  const riskIndex = Math.min(100, Math.round((aqi / 3) + tempRise * 6));
  const sustainability = Math.max(0, 100 - carbon);

  updateKPIs(tempRise, aqi, riskIndex, sustainability);
  updateCharts(carbon, tempRise);
}

function updateKPIs(temp, aqi, risk, sustain) {

  const metrics = [
    ["Temperature Rise", "+" + temp.toFixed(2) + "°C"],
    ["Projected AQI", aqi],
    ["Climate Risk Index", risk + "/100"],
    ["Sustainability Score", sustain + "/100"]
  ];

  const grid = document.getElementById("kpiGrid");
  grid.innerHTML = "";

  metrics.forEach(m => {
    grid.innerHTML += `
      <div class="kpi-card">
        <h4>${m[0]}</h4>
        <p>${m[1]}</p>
      </div>
    `;
  });
}

function updateCharts(carbon, tempRise) {

  if (lineChart) lineChart.destroy();
  if (pieChart) pieChart.destroy();

  lineChart = new Chart(document.getElementById("lineChart"), {
    type: 'line',
    data: {
      labels: ['2025','2035','2045','2055','2070'],
      datasets: [{
        label: "Temperature Rise",
        data: [0.8, tempRise/2, tempRise, tempRise*1.2, tempRise*1.4],
        borderColor: '#6366f1',
        tension: 0.4
      }]
    }
  });

  pieChart = new Chart(document.getElementById("pieChart"), {
    type: 'doughnut',
    data: {
      labels: ['Carbon Used', 'Remaining Budget'],
      datasets: [{
        data: [carbon, 100-carbon],
        backgroundColor: ['#ef4444','#10b981']
      }]
    }
  });
}












