const { ipcRenderer } = require("electron");
const { getAllInstalledSoftware } = require("fetch-installed-software");

var currentTask = [];
var time = "";

var softwareList = null;
var softwareHTMLList = "";
var softwareForProject = [];
task_list = [];

var activeTask = [];

// var temp = {
//   user: {
//     username: "habiburrahmandipto",
//     id: 987654321,
//     email: "dipto@brainstation-23.com",
//   },
//   projects: [
//     {
//       id: 1,
//       name: "Automated Time Entry",
//       boards: [
//         {
//           name: "Sprint 1",
//           cards: [
//             {
//               name: "Create a task tracker app using Electron",
//               e: "Create an app",
//               tasks: [
//                 {
//                   id: 41,
//                   name: "Learn and explore electron",
//                   time: "2d",
//                   softwares: ["chrome", "vs code"],
//                 },
//                 {
//                   id: 42,
//                   nam: "1d 4h",
//                   softwares: ["vs code", "chrome"],
//                 },
//               ],
//             },
//             {
//               name: "Update Module",
//               e: "Create an app",
//               tasks: [
//                 {
//                   id: 41,
//                   name: "Learn and explore electron",
//                   time: "2d",
//                   softwares: ["chrome", "vs code"],
//                 },
//                 {
//                   id: 42,
//                   nam: "1d 4h",
//                   softwares: ["vs code", "chrome"],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           name: "Sprint 2",
//           cards: [
//             {
//               name: "Built knowledge base dialog",
//               e: "Create an app",
//               tasks: [
//                 {
//                   id: 41,
//                   name: "Learn and explore electron",
//                   time: "2d",
//                   softwares: ["chrome", "vs code"],
//                 },
//                 {
//                   id: 42,
//                   nam: "1d 4h",
//                   softwares: ["vs code", "chrome"],
//                 },
//               ],
//             },
//             {
//               name: "deploy base dialog",
//               e: "Create an app",
//               tasks: [
//                 {
//                   id: 41,
//                   name: "Learn and explore electron",
//                   time: "2d",
//                   softwares: ["chrome", "vs code"],
//                 },
//                 {
//                   id: 42,
//                   nam: "1d 4h",
//                   softwares: ["vs code", "chrome"],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 1,
//       name: "Automated Life Entry",
//       boards: [
//         {
//           name: "Sprint 2",
//           cards: [
//             {
//               name: "Create a task tracker app using Electron",
//               e: "Create an app",
//               tasks: [
//                 {
//                   id: 41,
//                   name: "Learn and explore electron",
//                   time: "2d",
//                   softwares: ["chrome", "vs code"],
//                 },
//                 {
//                   id: 42,
//                   nam: "1d 4h",
//                   softwares: ["vs code", "chrome"],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           name: "Sprint 3",
//           cards: [
//             {
//               name: "Radassist Update",
//               e: "Create an app",
//               tasks: [
//                 {
//                   id: 41,
//                   name: "Learn and explore electron",
//                   time: "2d",
//                   softwares: ["chrome", "vs code"],
//                 },
//                 {
//                   id: 42,
//                   nam: "1d 4h",
//                   softwares: ["vs code", "chrome"],
//                 },
//               ],
//             },
//             {
//               name: "Keycloak setup",
//               e: "Create an app",
//               tasks: [
//                 {
//                   id: 41,
//                   name: "Learn and explore electron",
//                   time: "2d",
//                   softwares: ["chrome", "vs code"],
//                 },
//                 {
//                   id: 42,
//                   nam: "1d 4h",
//                   softwares: ["vs code", "chrome"],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

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
        "</span><span class='timerDisplay'>00 : 00 : 00 </span><button id='pauseTimer' onClick='pauseTimer("+idx +")' >Pause</button><button class='startTimer' onclick='startTimer(" +
        idx +
        ")'>Start</button><button onClick='stopTimer(" + idx +")'>Stop</button></div><div><p>Current software: <span class='currentSoftware'></span></p></div><div class='softwareList'><label for='software'>Choose a software:</label> <select id='software' class='software'></select><button id='addSoftware' onClick='addSoftwares("+idx+")'>Add</button></div></li>";
    }
  });
  taskRef.innerHTML = htmlText;
}
timeEntry();
var [seconds, minutes, hours] = [0, 0, 0];

function displayTimer(idx) {
  // if (task_list.includes())

  activeTask.map(task => {

    if (task.active) {
      task.seconds++;


      if (task.seconds == 60) {
        task.seconds = 0;
        task.minutes++;
        if (task.minutes == 60) {
          task.minutes = 0;
          task.hours++;
        }
      }
    
      let h = task.hours < 10 ? "0" + task.hours : task.hours;
      let m = task.minutes < 10 ? "0" + task.minutes : task.minutes;
      let s = task.seconds < 10 ? "0" + task.seconds : task.seconds;
      var timerRef = document.getElementsByClassName("timerDisplay")[task.idx];
    
      timerRef.innerText = ` ${h} : ${m} : ${s} `;
      time = `${h}h${m}m${s}s`;
    }
    

  });
 
}

function startTimer(idx) {
  console.log("click");
  var temp = document.getElementsByClassName("taskName ")[idx];
  if(activeTask.length === 0) {
    var demo = {
      idx: idx,
      taskName: temp.innerText,
      seconds: 0,
      minutes: 0,
      hours: 0,
      times: [{start: new Date().getTime(), end: null}],
      software: [],
      active: true,
    }
    activeTask.push(demo);
    console.log("Task Created");
    console.log(activeTask)
  }
  activeTask.map((task) => {
    if (task.idx === idx) {
      if(!task.active) {
        task.active = true;
        task.times.push({start: new Date().getTime(), end: null}),
        console.log("Task Updated");
        console.log(activeTask);
  
      }
      
    } else {
      var demo = {
        idx: idx,
        taskName: temp.innerText,
        seconds: 0,
        minutes: 0,
        hours: 0,
        startime: 0,
        endTime: 0,
        times: [{start: new Date().getTime(), end: null}],
        software: [],
        active: true,
      }
      activeTask.push(demo);
      console.log("Task Created");
      console.log(activeTask)
    }
  })
  
  // let int = null;

  // if (int !== null) {
  //   clearInterval(int);
  // }
  // int =
}


function pauseTimer(idx) {
  activeTask.map((task) => {
    if (task.idx === idx) {
      task.active = false;
      task.active = false;
      task.times[task.times.length - 1].end = new Date().getTime();
    }
  })

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



function addSoftwares(idx) {
  var currentSoftwareRef = document.getElementsByClassName("currentSoftware")[idx];

  var e = document.getElementsByClassName("software")[idx];
  var temp; 
  activeTask.map((task) => {
    if(idx === task.idx) {
      task.software.push(e.value);

      temp = task.software;
    }
  })
  softwareForProject.push(e.value);
  currentSoftwareRef.innerHTML = currentSoftwareRef.innerHTML + temp.toString() ;

  console.log("Current Software for this project: ", softwareForProject);
}

// document.getElementById("addSoftware").addEventListener("click", () => {
//   var e = document.getElementById("software");
//   softwareForProject.push(e.value);
//   currentSoftwareRef.innerHTML = currentSoftwareRef.innerHTML + e.value + ", ";

//   console.log("Current Software for this project: ", softwareForProject);
// });

function stopTimer(idx) {
  // var timeTask = [];

  // var taskRef = document.getElementsByClassName("taskName");
  // [].forEach.call(taskRef, function (task, idx) {
  //   var dummy = {
  //     id: idx,
  //     name: task.innerText,
  //     time: time,
  //     softwares: softwareForProject,
  //   };

  //   timeTask.push(activeTask);
  // });

  // temp["projects"][0]["boards"][0]["cards"][0]["tasks"][0] = timeTask;

  // console.log(temp);
  activeTask.map((task) => {
    task.time = `${task.hours}:${task.minutes}:${task.seconds}`
  })

  console.log("object: ", activeTask);

  ipcRenderer.send("activeTask", activeTask);
};
