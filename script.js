// Navigation
function showSection(id) {
  document.querySelectorAll('.page').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// Chart Setup
window.onload = function() {
  const ctx = document.getElementById('climateChart');
  if(ctx){
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2025','2030','2040','2050'],
        datasets: [{
          label: 'Carbon Emissions (Gt)',
          data: [35, 40, 52, 70],
          borderColor: '#00ffae',
          fill: false
        }]
      }
    });
  }
}

// Simulation Logic
function simulate(){
  let renewable = document.getElementById("renewable").value;
  let greenspace = document.getElementById("greenspace").value;

  let carbonReduction = renewable * 0.6 + greenspace * 0.4;

  document.getElementById("result").innerHTML =
    "Projected Carbon Reduction: " + carbonReduction.toFixed(2) + "% by 2040 🌍";
}












