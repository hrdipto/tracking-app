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

function listAllTask(tasklist = tasks) {
  console.log(temp);
  var taskRef = document.getElementsByClassName("taskName");
  [].forEach.call(taskRef, function (task, idx) {
    task.innerText = tasklist[idx];
  });
  // taskRef.map((task, idx) => {
  //   task.innerText = tasks[idx];
  // });
}

function listAllProject() {
  var projectRef = document.getElementById("project");
  var projects = temp["projects"];
  var htmlText = "";
  projects.map((project) => {
    htmlText +=
      "<option value='" +
      project["name"] +
      "' >" +
      project["name"] +
      "</option>";
  });
  projectRef.innerHTML = htmlText;
  // taskRef.map((task, idx) => {
  //   task.innerText = tasks[idx];
  // });
}

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
  projects.map((project) => {
    if (project === projectRef) {
      htmlText +=
        "<option value='" +
        project["name"] +
        "' >" +
        project["name"] +
        "</option>";
    }
    htmlText +=
      "<option value='" +
      project["name"] +
      "' >" +
      project["name"] +
      "</option>";
  });
}

function boardUpdate(projectRef) {
  console.log("Update");
  var boardRef = document.getElementById("board");
  var projects = temp["projects"];
  var htmlText = "";
  for (var i = 0; i < projects.length; i++) {
    if (projects[i]["name"] === projectRef) {
      var boards = temp["projects"][i]["boards"];
      for (var j = 0; j < boards.length; j++) {
        htmlText +=
          "<option value='" +
          boards[j]["name"] +
          "' >" +
          boards[j]["name"] +
          "</option>";
      }

      boardRef.innerHTML = htmlText;
      break;
    }
  }
  projects.map((project) => {
    if (project === projectRef) {
      htmlText +=
        "<option value='" +
        project["name"] +
        "' >" +
        project["name"] +
        "</option>";
    }
    htmlText +=
      "<option value='" +
      project["name"] +
      "' >" +
      project["name"] +
      "</option>";
  });
  // projectRef.innerHTML = htmlText;
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
listAllProject();
listAllTask();

document.getElementById("startTimer").addEventListener("click", () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 1000);
});

document.getElementById("project").addEventListener("change", (event) => {
  boardUpdate(event.target.value);
});
document.getElementById("board").addEventListener("change", (event) => {
  cardUpdate(event.target.value, document.getElementById("project").value);
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

document.getElementById("taskbtn").onclick = function () {
  var markedCheckbox = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  var tasklist = [];
  for (var checkbox of markedCheckbox) {
    tasklist.push(checkbox.value);
  }

  listAllTask(tasklist);
  listAllSoftware();
};
