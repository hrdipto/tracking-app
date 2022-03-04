const { getAllInstalledSoftware } = require("fetch-installed-software");
let [seconds, minutes, hours] = [0, 0, 0];
let timerRef = document.querySelector(".timerDisplay");
let currentSoftwareRef = document.querySelector(".currentSoftware");
let int = null;
var softwareList = null;
var softwareHTMLList = "";
var softwareForProject = [];

var tasks = ["Learn and explore electron", "Create an app"];

var temp = {
  user: {
    username: "habiburrahmandipto",
    id: 987654321,
    email: "dipto@brainstation-23.com",
  },
  projects: [
    {
      id: 1,
      name: "Automated Time Entry",
      boards: [
        {
          name: "Sprint 1",
          cards: [
            {
              name: "Create a task tracker app using Electron",
              e: "Create an app",
              tasks: [
                {
                  id: 41,
                  name: "Learn and explore electron",
                  time: "2d",
                  softwares: ["chrome", "vs code"],
                },
                {
                  id: 42,
                  nam: "1d 4h",
                  softwares: ["vs code", "chrome"],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function listAllTask() {
  console.log(temp);
  var taskRef = document.getElementsByClassName("taskName");
  [].forEach.call(taskRef, function (task, idx) {
    task.innerText = tasks[idx];
  });
  // taskRef.map((task, idx) => {
  //   task.innerText = tasks[idx];
  // });
}

function listAllSoftware() {
  var items = document.getElementsByClassName("taskName");
  console.log(items);
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
        // document.querySelector(".software").innerHTML = softwareHTMLList;

        var softwareRef = document.getElementsByClassName("software");
        [].forEach.call(softwareRef, function (task, idx) {
          task.innerHTML = softwareHTMLList;
        });
      }
    });
  }
}
listAllTask();

listAllSoftware();

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
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let time = `${h}h${m}m${s}s`;

  var timeTask = [];
  var taskRef = document.getElementsByClassName("taskName");
  [].forEach.call(taskRef, function (task, idx) {
    var dummy = {
      id: idx,
      name: task,
      time: time,
      softwares: softwareForProject,
    };

    timeTask.push(dummy);
  });

  temp["projects"][0]["boards"][0]["cards"][0]["tasks"][0] = timeTask;

  console.log(temp);

  console.log("Time: ", time);
  console.log("Current Software for this project: ", softwareForProject);
});
