let pieChart;
let lineChart;

const countrySelect = document.getElementById("countrySelect");

// Load ALL countries
fetch("https://restcountries.com/v3.1/all")
.then(response => response.json())
.then(data => {

    countrySelect.innerHTML = "";

    data
      .sort((a,b) => a.name.common.localeCompare(b.name.common))
      .forEach(country => {

        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;

        countrySelect.appendChild(option);
    });
})
.catch(error => {
    countrySelect.innerHTML = "<option>Error loading countries</option>";
    console.error(error);
});


function runProjection() {

    const selectedCountry = countrySelect.value;

    // Simulated AI Model (Hackathon MVP logic)
    const base = selectedCountry.length;

    const temperature = (1 + (base % 5) * 0.5).toFixed(1);
    const aqi = 50 + (base % 10) * 15;
    const carbon = 200 + (base % 7) * 100;

    updateMetrics(temperature, aqi, carbon);
    updateCharts(aqi, temperature);
}


function updateMetrics(temp, aqi, carbon) {

    document.getElementById("tempValue").innerHTML = temp + " °C";
    document.getElementById("aqiValue").innerHTML = aqi;
    document.getElementById("carbonValue").innerHTML = carbon + " Mt";
}


function updateCharts(aqi, temperature) {

    if(pieChart) pieChart.destroy();
    if(lineChart) lineChart.destroy();

    // PIE CHART
    pieChart = new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: ["Sustainable", "Pollution"],
            datasets: [{
                data: [100 - (aqi/2), aqi/2],
                backgroundColor: ["#2ecc71", "#e74c3c"]
            }]
        }
    });

    // LINE GRAPH
    lineChart = new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
            labels: ["2025","2030","2035","2040","2045"],
            datasets: [{
                label: "Temperature Projection",
                data: [1,1.5,2,2.5,temperature],
                borderColor: "#00c6ff",
                tension: 0.4,
                fill: false
            }]
        }
    });
}










