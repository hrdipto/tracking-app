const { ipcRenderer } = require("electron");
const { getAllInstalledSoftware } = require("fetch-installed-software");

var currentTask = [];
var time = "";

var softwareList = null;
var softwareHTMLList = "";
var softwareForProject = [];
task_list = [];

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
            {
              name: "Update Module",
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
        {
          name: "Sprint 2",
          cards: [
            {
              name: "Built knowledge base dialog",
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
            {
              name: "deploy base dialog",
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
    {
      id: 1,
      name: "Automated Life Entry",
      boards: [
        {
          name: "Sprint 2",
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
        {
          name: "Sprint 3",
          cards: [
            {
              name: "Radassist Update",
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
            {
              name: "Keycloak setup",
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

function timeEntry() {
  var timeTask = [];
  var taskRef = document.getElementById("taskList");
  let reply = ipcRenderer.sendSync("tasklist", "Grabbing task");
  console.log(reply);
  var htmlText = "";
  reply.map((task, idx) => {
    if (task) {
      currentTask.push(task);
      htmlText +=
        "<li><div class='taskList'><span class='taskName taskName" +
        idx +
        "'>" +
        task +
        "</span><span class='timerDisplay'>00 : 00 : 00 </span><button id='pauseTimer'>Pause</button><button class='startTimer' onclick='startTimer(" +
        idx +
        ")'>Start</button><button id='stopTimer'>Stop</button></div><div><p>Current software: <span class='currentSoftware'></span></p></div><div class='softwareList'><label for='software'>Choose a software:</label> <select id='software' class='software'></select><button id='addSoftware'>Add</button></div></li>";
    }
  });
  taskRef.innerHTML = htmlText;
}
timeEntry();
var [seconds, minutes, hours] = [0, 0, 0];

function displayTimer(idx = 0) {
  var timerRef = document.getElementsByClassName("timerDisplay")[idx];
  // if (task_list.includes())

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

  timerRef.innerText = ` ${h} : ${m} : ${s} `;
  time = `${h}h${m}m${s}s`;
}

function startTimer(idx) {
  console.log("click");
  // let int = null;

  // if (int !== null) {
  //   clearInterval(int);
  // }
  // int =
}

setInterval(displayTimer, 1000);

// var startTimer = document.getElementById("startTimer");
// console.log("click");

// if (startTimer) {
//   document.getElementById("startTimer").addEventListener("click", () => {});
// }

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

listAllSoftware();

let currentSoftwareRef = document.querySelector(".currentSoftware");

document.getElementById("addSoftware").addEventListener("click", () => {
  var e = document.getElementById("software");
  softwareForProject.push(e.value);
  currentSoftwareRef.innerHTML = currentSoftwareRef.innerHTML + e.value + ", ";

  console.log("Current Software for this project: ", softwareForProject);
});

document.getElementById("stopTimer").addEventListener("click", () => {
  var timeTask = [];

  var taskRef = document.getElementsByClassName("taskName");
  [].forEach.call(taskRef, function (task, idx) {
    var dummy = {
      id: idx,
      name: task.innerText,
      time: time,
      softwares: softwareForProject,
    };

    timeTask.push(dummy);
  });

  temp["projects"][0]["boards"][0]["cards"][0]["tasks"][0] = timeTask;

  console.log(temp);

  console.log("object: ", timeTask);
});
