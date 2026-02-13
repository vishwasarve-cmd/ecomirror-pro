let pieChart;
let lineChart;

function predict() {

    let temp = (Math.random() * 3 + 1).toFixed(1);
    let aqi = Math.floor(Math.random() * 200);
    let sea = Math.floor(Math.random() * 50);
    let carbon = Math.floor(Math.random() * 500);

    document.getElementById("tempWheel").innerHTML = temp + "°C";
    document.getElementById("aqiWheel").innerHTML = aqi;
    document.getElementById("seaWheel").innerHTML = sea + "cm";
    document.getElementById("carbonWheel").innerHTML = carbon;

    if (pieChart) pieChart.destroy();
    if (lineChart) lineChart.destroy();

    pieChart = new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: ["Green Zone", "Pollution"],
            datasets: [{
                data: [100 - (aqi/2), aqi/2],
                backgroundColor: ["green", "red"]
            }]
        }
    });

    lineChart = new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
            labels: ["2025","2030","2035","2040","2045"],
            datasets: [{
                label: "Temperature Rise",
                data: [1,1.5,2,2.5,temp],
                borderColor: "green",
                fill: false
            }]
        }
    });

}








