const countrySelect = document.getElementById("countrySelect");

fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    data.sort((a,b)=> a.name.common.localeCompare(b.name.common));
    data.forEach(country => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });
  });

let pieChart, lineChart;

function predict() {

  const temperature = (Math.random()*3 + 1).toFixed(1);
  const aqi = Math.floor(Math.random()*200);
  const sea = Math.floor(Math.random()*40);
  const carbon = Math.floor(Math.random()*500);

  // Update Wheel
  document.getElementById("wheel-temp").innerHTML = temperature + "°C";
  document.getElementById("wheel-aqi").innerHTML = aqi;
  document.getElementById("wheel-sea").innerHTML = sea + " cm";
  document.getElementById("wheel-carbon").innerHTML = carbon;

  // Update Cards
  document.getElementById("tempValue").innerHTML = temperature + "°C Rise";
  document.getElementById("aqiValue").innerHTML = "AQI: " + aqi;
  document.getElementById("seaValue").innerHTML = sea + " cm Increase";
  document.getElementById("carbonValue").innerHTML = carbon + " Mt CO₂";

  // Destroy old charts
  if(pieChart) pieChart.destroy();
  if(lineChart) lineChart.destroy();

  // PIE CHART (Green vs Red)
  pieChart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Sustainable", "Pollution"],
      datasets: [{
        data: [100-aqi, aqi],
        backgroundColor: ["#16a34a", "#dc2626"]
      }]
    }
  });

  // LINE CHART (Temp Trend)
  lineChart = new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: ["2025","2030","2035","2040","2045"],
      datasets: [{
        label: "Temperature Rise Projection",
        data: [1.0,1.5,2.0,2.5,temperature],
        borderColor: "#16a34a",
        fill: false,
        tension: 0.4
      }]
    }
  });

}








