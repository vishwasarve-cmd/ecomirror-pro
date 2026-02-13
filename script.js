let pieChart, lineChart;

const countryData = {
  india: { baseAQI: 120, baseTemp: 1.1, renewableFactor: 0.9 },
  germany: { baseAQI: 40, baseTemp: 0.9, renewableFactor: 0.6 },
  usa: { baseAQI: 60, baseTemp: 1.0, renewableFactor: 0.8 },
  singapore: { baseAQI: 55, baseTemp: 1.2, renewableFactor: 0.7 },
  brazil: { baseAQI: 50, baseTemp: 1.0, renewableFactor: 0.85 }
};

function simulate() {

  const country = document.getElementById("country").value;
  const travel = Number(document.getElementById("travel").value);
  const electricity = Number(document.getElementById("electricity").value);
  const diet = document.getElementById("diet").value;
  const year = Number(document.getElementById("year").value);

  const base = countryData[country];

  let dietImpact = 0;

  if (diet === "meat") dietImpact = 50;
  if (diet === "mixed") dietImpact = 20;
  if (diet === "vegetarian") dietImpact = -10;
  if (diet === "vegan") dietImpact = -25;

  const travelImpact = travel * 0.4;
  const electricityImpact = electricity * 0.06;

  const totalCarbon =
    (travelImpact + electricityImpact + dietImpact) * base.renewableFactor;

  const yearsAhead = year - 2025;

  const tempRise =
    base.baseTemp + (totalCarbon / 120) * (yearsAhead / 5);

  const aqi = Math.round(base.baseAQI + totalCarbon);

  const riskIndex = Math.min(
    100,
    Math.round((aqi / 4) + tempRise * 8)
  );

  document.getElementById("metrics").innerHTML = `
    <p><strong>Country:</strong> ${country.toUpperCase()}</p>
    <p>🌡 Temperature Rise: +${tempRise.toFixed(2)}°C</p>
    <p>🌫 AQI Projection: ${aqi}</p>
    <p>⚠ Climate Risk Index: ${riskIndex}/100</p>
  `;

  generatePieChart(travelImpact, electricityImpact, dietImpact);
  generateLineChart(tempRise);
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












