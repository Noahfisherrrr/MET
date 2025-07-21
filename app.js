function getMET(elevation, duration, bikeType) {
  if (bikeType === "road") {
    if (elevation > 300 && duration < 2) return 10;
    if (elevation > 100) return 9;
    return 7.5;
  }

  if (bikeType === "gravel") {
    if (elevation > 300 && duration < 2) return 11;
    if (elevation > 100) return 9.5;
    return 8.5;
  }

  if (bikeType === "mtb") {
    if (elevation > 300 && duration < 2) return 12;
    if (elevation > 100) return 10;
    return 8.5;
  }

  return 8.5; // default fallback
}

function calculateCalories() {
  const weight = parseFloat(document.getElementById("weight").value);
  const duration = parseFloat(document.getElementById("duration").value);
  const elevation = parseFloat(document.getElementById("elevation").value);
  const bikeType = document.getElementById("bikeType").value;
  const rideImage = document.getElementById("rideImage").files[0];

  const MET = getMET(elevation, duration, bikeType);
  const calories = MET * weight * duration;

  const bikeName = {
    road: "Road Bike",
    gravel: "Gravel Bike",
    mtb: "Mountain Bike"
  }[bikeType];

  document.getElementById("result").innerHTML =
    `🔥 Estimated Calories Burned: <strong>${calories.toFixed(0)} kcal</strong><br>(MET: ${MET}, ${bikeName})`;

  if (rideImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("mapPreview").innerHTML =
        `<img src="${e.target.result}" alt="GPS Image" />`;
    };
    reader.readAsDataURL(rideImage);
  } else {
    document.getElementById("mapPreview").innerHTML = "";
  }
}
