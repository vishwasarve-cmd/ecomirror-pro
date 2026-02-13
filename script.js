let chart;

function predict() {

    let temp = (Math.random()*3 + 1).toFixed(1);

    document.getElementById("tempVal").innerHTML = temp + "°C";

    if(chart) chart.destroy();

    chart = new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
            labels: ["2025","2030","2035","2040","2045"],
            datasets: [{
                label: "Temperature Rise Projection",
                data: [1,1.5,2,2.5,temp],
                borderColor: "#00f260",
                tension: 0.4
            }]
        },
        options: {
            plugins: {
                legend: { labels: { color: "white" } }
            },
            scales: {
                x: { ticks: { color: "white" } },
                y: { ticks: { color: "white" } }
            }
        }
    });
}









