function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

const slider = document.getElementById("energySlider");
const result = document.getElementById("simulationResult");

slider.addEventListener("input", function() {
    let value = slider.value;

    // simple simulation formula
    let tempRise = (4 - value / 40).toFixed(1);
    let carbonReduction = (value * 0.65).toFixed(0);

    result.innerHTML =
        "Future Temperature Rise: +" + tempRise + "°C <br>" +
        "Projected Carbon Reduction: -" + carbonReduction + "%";
});










