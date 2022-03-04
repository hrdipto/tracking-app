const { getAllInstalledSoftware } = require("fetch-installed-software");
let [seconds, minutes, hours] = [0, 0, 0];
let timerRef = document.querySelector(".timerDisplay");
let currentSoftwareRef = document.querySelector(".currentSoftware");
let int = null;
var softwareList = null;
var softwareHTMLList = "";
var softwareForProject = [];

document.getElementById("startTimer").addEventListener("click", () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 1000);
});

document.getElementById("pauseTimer").addEventListener("click", () => {
  clearInterval(int);
});

function displayTimer() {
  seconds++;

  if (!softwareList) {
    getAllInstalledSoftware().then(function (result) {
      console.log("first init", result); // "initResolve"
      softwareList = result;

      if (softwareList) {
        softwareList.map((software) => {
          console.log(software["DisplayName"]);

          if (software["DisplayName"]) {
            softwareHTMLList +=
              "<option value='" +
              software["DisplayName"] +
              "' >" +
              software["DisplayName"] +
              "</option>";
          }
        });

        console.log(softwareList);
        document.querySelector(".software").innerHTML = softwareHTMLList;
      }
    });
  }
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  timerRef.innerHTML = ` ${h} : ${m} : ${s} `;
}

document.getElementById("addSoftware").addEventListener("click", () => {
  var e = document.getElementById("software");
  softwareForProject.push(e.value);
  currentSoftwareRef.innerHTML = currentSoftwareRef.innerHTML + e.value + ", ";

  console.log("Current Software for this project: ", softwareForProject);
});

document.getElementById("stopTimer").addEventListener("click", () => {
  console.log("Time: ", hours, minutes, seconds);
  console.log("Current Software for this project: ", softwareForProject);
});
