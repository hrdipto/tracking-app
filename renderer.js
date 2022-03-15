const fs = require("fs");
const { ipcRenderer } = require("electron");
let timerRef = document.querySelector(".timerDisplay");
let [seconds, minutes, hours] = [0, 0, 0];

let currentSoftwareRef = document.querySelector(".currentSoftware");
let int = null;
var softwareList = null;
var softwareHTMLList = "";
var softwareForProject = [];

var tasks = new Set();

/////////////////////////////////////////////////////////
///////////////////////// time-entry.HTML
/////////////////////////////////////////////////////////

// function listAllTask(tasklist = tasks) {
//   console.log(temp);
//   var taskRef = document.getElementsByClassName("taskName");
//   [].forEach.call(taskRef, function (task, idx) {
//     task.innerText = tasklist[idx];
//   });
//   // taskRef.map((task, idx) => {
//   //   task.innerText = tasks[idx];
//   // });
// }

// function listAllProject() {
//   var projectRef = document.getElementById("project");
//   var projects = temp["projects"];
//   var htmlText = "";
//   projects.map((project) => {
//     htmlText +=
//       "<option value='" +
//       project["name"] +
//       "' >" +
//       project["name"] +
//       "</option>";
//   });
//   projectRef.innerHTML = htmlText;
//   // taskRef.map((task, idx) => {
//   //   task.innerText = tasks[idx];
//   // });
// }

// listAllProject();
// listAllTask();

document.getElementById("project").addEventListener("change", (event) => {
  boardUpdate(event.target.value);
});
document.getElementById("board").addEventListener("change", (event) => {
  cardUpdate(event.target.value, document.getElementById("project").value);
});

var pauseTimer = document.getElementById("pauseTimer");

if (pauseTimer) {
  document.getElementById("pauseTimer").addEventListener("click", () => {
    clearInterval(int);
  });
}

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

// document.getElementById("taskbtn").onclick = function () {
//   var markedCheckbox = document.querySelectorAll(
//     'input[type="checkbox"]:checked'
//   );
//   var tasklist = [];
//   for (var checkbox of markedCheckbox) {
//     tasklist.push(checkbox.value);
//   }

//   listAllTask(tasklist);
//   listAllSoftware();
// };
