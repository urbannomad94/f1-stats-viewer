document.querySelector(".season-button").addEventListener("click", getRaces);

function getRaces() {
  let season = document.querySelector(".season").value;

  //Checking that user provided a valid season
  if (season < 1950 || season > 2022) {
    document.querySelector("label").innerText =
      "Not a valid season. Please choose a date between 1950 and 2022.";
    document.querySelector("label").classList.add("invalid");
    return;
  }

  document.querySelector("label").innerText = "Select Season";
  document.querySelector("label").classList.remove("invalid");

  //Creating dropdown for user to select race from desired season
  let raceInput = document.createElement("div");
  raceInput.classList.add("race-input");

  let raceSelect = document.createElement("select");
  raceSelect.setAttribute("name", "race");
  raceSelect.classList.add("race-select");

  let raceLabel = document.createElement("label");
  raceLabel.setAttribute = ("for", "race");
  raceLabel.innerText = "Select Race";

  let raceButton = document.createElement("button");
  raceButton.classList.add("race-button");
  raceButton.innerText = "See Stats";

  raceInput.appendChild(raceSelect);
  raceInput.appendChild(raceLabel);
  raceInput.appendChild(raceButton);

  document.querySelector(".user-inputs").appendChild(raceInput);

  document.querySelector(".race-button").addEventListener("click", getStats);

  //Fetching race list from desired season
  fetch(`http://ergast.com/api/f1/${season}.json`)
    .then((res) => res.json())
    .then((data) => {
      let raceData = data.MRData.RaceTable.Races;

      //Populate select element with races from the season
      for (let i = 0; i < raceData.length; i++) {
        const option = document.createElement("option");
        option.value = raceData[i].round;
        option.innerText = `Round ${raceData[i].round}: ${raceData[i].raceName}`;
        raceSelect.appendChild(option);
      }
    });
}

function getStats() {
  let season = document.querySelector(".season").value;
  let race = document.querySelector("option:checked").value;

  fetch(`http://ergast.com/api/f1/${season}/${race}.json`)
    .then((res) => res.json())
    .then((data) => {
      let raceData = data.MRData.RaceTable.Races[0];
      console.log(raceData);

      document.querySelector(".name").innerText = `Race: ${raceData.raceName}`;
      document.querySelector(".date").innerText = `Date: ${raceData.date}`;
      document.querySelector(
        ".location"
      ).innerText = `Location: ${raceData.Circuit.Location.locality}, ${raceData.Circuit.Location.country}`;
    });
}
