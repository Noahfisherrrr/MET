function calculateCalories() {
  const weight = parseFloat(document.getElementById("weight").value);
  const duration = parseFloat(document.getElementById("duration").value);
  const elevation = parseFloat(document.getElementById("elevation").value);
  const bikeType = document.getElementById("bikeType").value;
  const rideImage = document.getElementById("rideImage").files[0];

  const MET = getMET(elevation, duration, bikeType);
  const calories = MET * weight * duration;

  // Estimate carbohydrate burn percentage based on MET
  let carbPercent;
  if (MET <= 6) carbPercent = 0.5;
  else if (MET <= 9) carbPercent = 0.65;
  else if (MET <= 11) carbPercent = 0.75;
  else carbPercent = 0.85;

  const carbCalories = calories * carbPercent;
  const carbsBurned = carbCalories / 4; // 1g carbs = 4 kcal

  const bikeName = {
    road: "Road Bike",
    gravel: "Gravel Bike",
    mtb: "Mountain Bike"
  }[bikeType];

  document.getElementById("result").innerHTML =
    `🔥 <strong>${calories.toFixed(0)} kcal</strong> burned<br>
     🚴 ${bikeName} | MET: ${MET}<br>
     🍞 Carbs burned: <strong>${carbsBurned.toFixed(0)}g</strong> (~${Math.round(carbPercent * 100)}% of energy)`;

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
