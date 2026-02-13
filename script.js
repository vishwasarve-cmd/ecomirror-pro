function simulate() {

  let travel = Number(document.getElementById("travel").value);
  let electricity = Number(document.getElementById("electricity").value);
  let diet = document.getElementById("diet").value;
  let year = Number(document.getElementById("year").value);

  let ev = document.getElementById("ev").checked;
  let trees = document.getElementById("trees").checked;
  let renewable = document.getElementById("renewable").checked;
  let emissionLaw = document.getElementById("emissionLaw").checked;

  // Base Carbon Score
  let carbon = travel * 0.4 + electricity * 0.06;

  if (diet === "meat") carbon += 50;
  if (diet === "vegetarian") carbon -= 20;
  if (diet === "vegan") carbon -= 40;

  // Policy Reductions
  if (ev) carbon -= 30;
  if (trees) carbon -= 25;
  if (renewable) carbon -= 40;
  if (emissionLaw) carbon -= 35;

  carbon = Math.max(10, carbon);

  let yearsAhead = year - 2025;

  let tempRise = (carbon / 100) * (yearsAhead / 4);
  let aqi = Math.round(60 + carbon);
  let heatDays = Math.round((carbon / 2));
  let greenCover = Math.max(10, Math.round(100 - carbon));

  let riskIndex = Math.min(100, Math.round((aqi / 4) + tempRise * 10));

  let asthmaRisk = Math.min(100, Math.round(aqi / 3));
  let heatStrokeRisk = Math.min(100, Math.round(tempRise * 20));

  let output = document.getElementById("output");

  if (riskIndex < 50) {
    document.body.className = "green";
  } else {
    document.body.className = "red";
  }

  output.innerHTML = `
    <h3>📊 Year ${year} Projection</h3>
    <p>🌡 Temperature Rise: +${tempRise.toFixed(1)}°C</p>
    <p>🌫 AQI: ${aqi}</p>
    <p>🔥 Extreme Heat Days: ${heatDays}</p>
    <p>🌳 Green Cover: ${greenCover}%</p>
    <hr>
    <h3>⚠ Climate Risk Index: ${riskIndex}/100</h3>
    <p>🫁 Asthma Risk: ${asthmaRisk}%</p>
    <p>🌡 Heat Stroke Risk: ${heatStrokeRisk}%</p>
  `;
}












