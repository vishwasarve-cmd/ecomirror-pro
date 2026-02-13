let chart;

function createChart(dataPoints) {

    const ctx = document.getElementById('climateChart').getContext('2d');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2025','2030','2035','2040','2045','2050'],
            datasets: [{
                label: 'Projected Temperature Rise (°C)',
                data: dataPoints,
                borderColor: '#00c853',
                borderWidth: 3,
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: { color: 'white' }
                }
            },
            scales: {
                x: { ticks: { color: 'white' }},
                y: { ticks: { color: 'white' }}
            }
        }
    });
}

function updateSimulation() {

    let baseTemp = parseFloat(document.getElementById("city").value);

    let reduction = 0;

    if (solar.checked) reduction += 0.4;
    if (metro.checked) reduction += 0.3;
    if (trees.checked) reduction += 0.5;
    if (tax.checked) reduction += 0.2;

    let finalTemp = (baseTemp - reduction).toFixed(2);

    document.getElementById("temp").innerText = finalTemp + " °C";

    let score = Math.max(0, Math.min(100, 100 - (finalTemp * 20)));
    document.getElementById("scoreValue").innerText = score;

    let degree = score * 3.6;
    document.getElementById("scoreCircle").style.background =
        `conic-gradient(#00c853 ${degree}deg, #1e293b ${degree}deg)`;

    let projection = [
        1.2,
        1.8,
        2.4,
        finalTemp - 0.5,
        finalTemp - 0.2,
        parseFloat(finalTemp)
    ];

    createChart(projection);
}

updateSimulation();











