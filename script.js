let pieChart, lineChart;

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

  let dietImpact = diet === "meat" ? 40 :
                   diet === "mixed" ? 15 :
                   diet === "vegetarian" ? -10 : -20;

  const travelImpact = travel * 0.35;
  const electricityImpact = electricity * 0.05;

  const carbonScore = travelImpact + electricityImpact + dietImpact;

  const yearsAhead = year - 2025;

  const tempRise = base.baseTemp + (carbonScore / 150) * (yearsAhead / 4);
  const aqi = Math.round(base.baseAQI + carbonScore);
  const heatDays = Math.round(tempRise * 10);
  const greenCover = Math.max(20, 100 - carbonScore);
  const riskIndex = Math.min(100, Math.round((aqi / 3) + tempRise * 6));

  const metrics = [
    ["Temperature Rise", "+" + tempRise.toFixed(2) + "°C"],
    ["Projected AQI", aqi],
    ["Extreme Heat Days", heatDays],
    ["Green Cover", greenCover + "%"],
    ["Climate Risk Index", riskIndex + "/100"]
  ];

  const grid = document.getElementById("metricsGrid");
  grid.innerHTML = "";

  metrics.forEach(m => {
    grid.innerHTML += `
      <div class="metric-card">
        <h4>${m[0]}</h4>
        <p>${m[1]}</p>
      </div>
    `;
  });

  updatePieChart(travelImpact, electricityImpact, dietImpact);
  updateLineChart(tempRise);
}

function updatePieChart(travel, electricity, diet) {
  if (pieChart) pieChart.destroy();

  pieChart = new Chart(document.getElementById("pieChart"), {
    type: 'pie',
    data: {
      labels: ['Transport', 'Electricity', 'Diet'],
      datasets: [{
        data: [travel, electricity, Math.abs(diet)],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981']
      }]
    }
  });
}

function updateLineChart(tempRise) {
  if (lineChart) lineChart.destroy();

  lineChart = new Chart(document.getElementById("lineChart"), {
    type: 'line',
    data: {
      labels: ['2025','2035','2045','2055','2070'],
      datasets: [{
        label: "Temperature Rise (°C)",
        data: [0.8, tempRise/2, tempRise, tempRise*1.1, tempRise*1.3],
        borderColor: '#10b981',
        borderWidth: 3,
        tension: 0.4
      }]
    }
  });
}












