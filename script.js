function predictFuture() {
  let score = 0;

  let city = document.getElementById("city").value;
  let transport = document.getElementById("transport").value;
  let electricity = document.getElementById("electricity").value;
  let plastic = document.getElementById("plastic").value;
  let trees = document.getElementById("trees").checked;
  let renewable = document.getElementById("renewable").checked;

  if (transport === "Car") score -= 10;
  if (transport === "Public") score += 5;
  if (transport === "EV") score += 8;

  if (electricity === "High") score -= 10;
  if (electricity === "Medium") score += 0;
  if (electricity === "Low") score += 5;

  if (plastic === "High") score -= 8;
  if (plastic === "Medium") score -= 3;
  if (plastic === "Low") score += 5;

  if (trees) score += 10;
  if (renewable) score += 8;

  let scenario = "Moderate";
  let temperature = 2;
  let aqi = 180;
  let healthPercent = 50;

  if (score > 15) {
    scenario = "Green Future 🌿";
    temperature = -1.5;
    aqi = 60;
    healthPercent = 85;
    document.body.style.background = "linear-gradient(to right, #065f46, #10b981)";
  } else if (score < 0) {
    scenario = "Polluted Future 🔥";
    temperature = 3;
    aqi = 300;
    healthPercent = 20;
    document.body.style.background = "linear-gradient(to right, #7f1d1d, #dc2626)";
  } else {
    scenario = "Moderate Future ⚠";
    document.body.style.background = "linear-gradient(to right, #78350f, #f59e0b)";
  }

  document.getElementById("form-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");

  document.getElementById("future-title").innerText =
    city + " in 2045 — " + scenario;

  document.getElementById("score").innerText = "Climate Score: " + score;
  document.getElementById("temperature").innerText =
    "Temperature Change: " + temperature + "°C";
  document.getElementById("aqi").innerText =
    "AQI Level: " + aqi;

  let healthBar = document.getElementById("health-bar");
  healthBar.style.width = healthPercent + "%";

  if (healthPercent > 70) healthBar.style.background = "#22c55e";
  else if (healthPercent > 40) healthBar.style.background = "#f59e0b";
  else healthBar.style.background = "#dc2626";
}

function reset() {
  document.getElementById("result-section").classList.add("hidden");
  document.getElementById("form-section").classList.remove("hidden");
  document.body.style.background = "linear-gradient(to right, #0f172a, #1e293b)";
}




