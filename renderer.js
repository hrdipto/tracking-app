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

/////////////////////////////////////////////////////////
///////////////////////// INDEX.HTML
/////////////////////////////////////////////////////////
var formSubmit = document.getElementById("formSubmit");
if (formSubmit) {
  formSubmit.addEventListener("click", () => {
    console.log("CLICK");
    var userID = document.getElementById("xid").value;
    ipcRenderer.send("userid", userID);
  });
}

/////////////////////////////////////////////////////////
///////////////////////// task-pick.HTML
/////////////////////////////////////////////////////////

////////////////////    Project      //////////////////

function listAllProject() {
  var projectRef = document.getElementById("project");
  var projects = temp["projects"];
  var htmlText = "";
  projects.map((project) => {
    htmlText +=
      "<span class='project-option custom-option' data-value='" +
      project["name"] +
      "'>" +
      project["name"] +
      "</span>";
  });
  projectRef.innerHTML = htmlText;

  /// Save Task

  //// Button Dropdown

  for (const dropdown of document.querySelectorAll(".project-select-wrapper")) {
    dropdown.addEventListener("click", function () {
      this.querySelector(".project-select").classList.toggle("open");
    });
  }

  for (const option of document.querySelectorAll(".project-option")) {
    option.addEventListener("click", function () {
      if (!this.classList.contains("selected")) {
        if (this.parentNode.querySelector(".project-option.selected")) {
          this.parentNode
            .querySelector(".project-option.selected")
            .classList.remove("selected");
        }
        this.classList.add("selected");
        this.closest(".project-select").querySelector(
          ".project-select__trigger span"
        ).textContent = this.textContent;

        boardUpdate(this.textContent);
      }
    });
  }
  window.addEventListener("click", function (e) {
    for (const select of document.querySelectorAll(".project-select")) {
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    }
  });

  function selectOption(index) {
    var optionOnIdx = document.querySelector(
      ".project-option:nth-child(" + index + ")"
    );
    var optionSelected = document.querySelector(".project-option.selected");
    if (optionOnIdx !== optionSelected) {
      if (
        this.parentNode &&
        this.parentNode.querySelector(".project-option.selected")
      ) {
        optionSelected.parentNode
          .querySelector(".project-option.selected")
          .classList.remove("selected");
      }
      optionOnIdx.classList.add("selected");
      optionOnIdx
        .closest(".project-select")
        .querySelector(".project-select__trigger span").textContent =
        optionOnIdx.textContent;
    }
  }
}

listAllProject();

////////////////////    Board      //////////////////

function boardUpdate(projectRef) {
  console.log("Update");
  console.log(projectRef);
  var boardRef = document.getElementById("board");
  var projects = temp["projects"];
  var htmlText = "";
  for (var i = 0; i < projects.length; i++) {
    if (projects[i]["name"] === projectRef) {
      var boards = temp["projects"][i]["boards"];
      for (var j = 0; j < boards.length; j++) {
        htmlText +=
          "<span class='board-option custom-option' data-value='" +
          boards[j]["name"] +
          "'>" +
          boards[j]["name"] +
          "</span>";
      }

      boardRef.innerHTML = htmlText;
      break;
    }
  }

  //// Button Dropdown

  for (const dropdown of document.querySelectorAll(".board-select-wrapper")) {
    dropdown.addEventListener("click", function () {
      this.querySelector(".board-select").classList.toggle("open");
    });
  }

  for (const option of document.querySelectorAll(".board-option")) {
    option.addEventListener("click", function () {
      if (!this.classList.contains("selected")) {
        if (this.parentNode.querySelector(".board-option.selected")) {
          this.parentNode
            .querySelector(".board-option.selected")
            .classList.remove("selected");
        }
        this.classList.add("selected");
        this.closest(".board-select").querySelector(
          ".board-select__trigger span"
        ).textContent = this.textContent;

        boardUpdate(this.textContent);
        cardUpdate(this.textContent, projectRef);
      }
    });
  }
  window.addEventListener("click", function (e) {
    for (const select of document.querySelectorAll(".board-select")) {
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    }
  });

  function selectOption(index) {
    var optionOnIdx = document.querySelector(
      ".board-option:nth-child(" + index + ")"
    );
    var optionSelected = document.querySelector(".board-option.selected");
    if (
      this.parentNode &&
      this.parentNode.querySelector(".project-option.selected")
    ) {
      if (optionOnIdx !== optionSelected) {
        optionSelected.parentNode
          .querySelector(".board-option.selected")
          .classList.remove("selected");
      }
      optionOnIdx.classList.add("selected");
      optionOnIdx
        .closest(".board-select")
        .querySelector(".board-select__trigger span").textContent =
        optionOnIdx.textContent;
    }
  }

  // projects.map((project) => {
  //   if (project === projectRef) {
  //     htmlText +=
  //       "<option value='" +
  //       project["name"] +
  //       "' >" +
  //       project["name"] +
  //       "</option>";
  //   }
  //   htmlText +=
  //     "<option value='" +
  //     project["name"] +
  //     "' >" +
  //     project["name"] +
  //     "</option>";
  // });
  // projectRef.innerHTML = htmlText;
}

////////////////////    Task List      //////////////////

function cardUpdate(boardRef, projectRef) {
  console.log("Update: ", boardRef, projectRef);
  var taskRef = document.getElementById("taskList");
  var projects = temp["projects"];
  var htmlText = "";
  var tasks = "";
  for (var i = 0; i < projects.length; i++) {
    if (projects[i]["name"] === projectRef) {
      var boards = temp["projects"][i]["boards"];
      for (var j = 0; j < boards.length; j++) {
        if (boards[j]["name"] === boardRef) {
          tasks = boards[j]["cards"];
          for (var k = 0; k < tasks.length; k++) {
            htmlText +=
              "<input type='checkbox' name='task_list' value='" +
              tasks[k]["name"] +
              "'>" +
              tasks[k]["name"] +
              "<br><br> ";
          }
          taskRef.innerHTML = htmlText;

          break;
        }
      }
    }
  }

  document.getElementById("taskbtn").onclick = function () {
    var markedCheckbox = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    var tasklist = [];
    for (var checkbox of markedCheckbox) {
      tasklist.push(checkbox.value);
    }

    listAllTask(tasklist);
    // listAllSoftware();
  };
  // projects.map((project) => {
  //   if (project === projectRef) {
  //     htmlText +=
  //       "<option value='" +
  //       project["name"] +
  //       "' >" +
  //       project["name"] +
  //       "</option>";
  //   }
  //   htmlText +=
  //     "<option value='" +
  //     project["name"] +
  //     "' >" +
  //     project["name"] +
  //     "</option>";
  // });
}

function listAllTask(tasklist = tasks) {
  console.log(temp);
  var taskRef = document.getElementById("taskName");

  var htmlText = "";
  tasklist.map((task, idx) => {
    tasks.add(task);
    htmlText +=
      "<li><div class='taskList'><span class='taskName'>" +
      parseInt(idx) +
      1 +
      ": " +
      task;
    +"</span><button id='removeTask'>Remove</button></div> </li>";
  });

  taskRef.innerHTML = htmlText;

  var taskSave = document.getElementById("saveTask");

  if (taskSave) {
    taskSave.addEventListener("click", () => {
      console.log("CLICK", tasks);
      ipcRenderer.send("savetask", tasks);
    });
  }
}

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
