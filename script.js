function generateFuture() {
  let travel = parseInt(document.getElementById("travel").value);
  let electricity = parseInt(document.getElementById("electricity").value);
  let diet = document.getElementById("diet").value;
  let timeline = parseInt(document.getElementById("timeline").value);

  let score = travel * 0.3 + electricity * 0.05;

  if (diet === "meat") score += 50;
  if (diet === "vegetarian") score -= 20;
  if (diet === "vegan") score -= 40;

  let yearsAhead = timeline - 2025;

  let temperatureRise = (score / 100) * (yearsAhead / 5);
  let aqi = 50 + score;
  let greenery = Math.max(10, 100 - score);

  let resultCard = document.getElementById("resultCard");
  let futureData = document.getElementById("futureData");

  if (score < 120) {
    document.body.className = "green-bg";
    resultCard.style.background = "#064e3b";

    futureData.innerHTML = `
      <h3>🌱 Green Future (${timeline})</h3>
      <p>🌡 Temperature Rise: +${temperatureRise.toFixed(1)}°C</p>
      <p>🌫 AQI: ${aqi}</p>
      <p>🌳 Green Cover: ${greenery}%</p>
      <p><strong>AI Insight:</strong> Your sustainable choices are helping stabilise climate conditions.</p>
    `;
  } else {
    document.body.className = "polluted-bg";
    resultCard.style.background = "#7f1d1d";

    futureData.innerHTML = `
      <h3>🌫 Polluted Scenario (${timeline})</h3>
      <p>🌡 Temperature Rise: +${temperatureRise.toFixed(1)}°C</p>
      <p>🌫 AQI: ${aqi}</p>
      <p>🌳 Green Cover: ${greenery}%</p>
      <p><strong>AI Insight:</strong> Without intervention, extreme heat waves and pollution may intensify.</p>
    `;
  }
}











