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

  let dietImpact = diet === "meat" ? 50 :
                   diet === "mixed" ? 20 :
                   diet === "vegetarian" ? -10 : -25;

  const travelImpact = travel * 0.4;
  const electricityImpact = electricity * 0.06;

  const totalCarbon = travelImpact + electricityImpact + dietImpact;

  const yearsAhead = year - 2025;

  const tempRise = base.baseTemp + (totalCarbon / 120) * (yearsAhead / 5);
  const aqi = Math.round(base.baseAQI + totalCarbon);

  const heatDays = Math.round(tempRise * 12);
  const floodRisk = Math.min(100, Math.round(tempRise * 15));
  const greenCover = Math.max(10, 100 - totalCarbon);

  const sustainabilityScore = Math.max(0, 100 - totalCarbon);
  const riskIndex = Math.min(100, Math.round((aqi / 4) + tempRise * 8));

  const asthmaRisk = Math.min(100, Math.round(aqi / 3));
  const economicLoss = Math.round(tempRise * 50);

  const carbonBudget = Math.max(0, Math.round(20 - tempRise * 3));

  const resultsGrid = document.getElementById("resultsGrid");

  resultsGrid.innerHTML = `
    ${card("🌡 Temperature Rise", "+" + tempRise.toFixed(2) + "°C")}
    ${card("🌫 AQI Projection", aqi)}
    ${card("🔥 Extreme Heat Days", heatDays)}
    ${card("🌊 Flood Risk %", floodRisk + "%")}
    ${card("🌳 Green Cover", greenCover + "%")}
    ${card("⚠ Climate Risk Index", riskIndex + "/100")}
    ${card("🟢 Sustainability Score", sustainabilityScore + "/100")}
    ${card("🫁 Asthma Risk", asthmaRisk + "%")}
    ${card("💰 Economic Loss (B$)", economicLoss)}
    ${card("⏳ Carbon Budget Left (yrs)", carbonBudget)}
  `;

  generatePieChart(travelImpact, electricityImpact, dietImpact);
  generateLineChart(tempRise);
}

function card(title, value) {
  return `
    <div class="metric-card">
      <h3>${title}</h3>
      <p>${value}</p>
    </div>
  `;
}

function generatePieChart(travel, electricity, diet) {
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

function generateLineChart(tempRise) {
  if (lineChart) lineChart.destroy();

  lineChart = new Chart(document.getElementById("lineChart"), {
    type: 'line',
    data: {
      labels: ['2025', '2035', '2045', '2055', '2070'],
      datasets: [{
        label: 'Temperature Rise (°C)',
        data: [
          0.8,
          tempRise / 2,
          tempRise,
          tempRise * 1.2,
          tempRise * 1.4
        ],
        borderColor: '#10b981',
        borderWidth: 3,
        tension: 0.4,
        fill: false
      }]
    }
  });
}













