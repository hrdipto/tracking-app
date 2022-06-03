const { ipcRenderer } = require("electron");

/////////////////////////////////////////////////////////
///////////////////////// task-pick.HTML
/////////////////////////////////////////////////////////
var tasks = new Set();
var set_project;

var temp = {

  projects: [
    {
      id: 1,
      name: "Automated Time Entry",
      boards: [
        {
          name: "Sprint 1",
          tasks: [
            {
              id: 41,
              name: "Learn and explore electron",
            },
            {
              id: 42,
              name: "Build App",
            },
          ],
        },
        {
          name: "Sprint 2",
        
          tasks: [
            {
              id: 41,
              name: "Learn and explore electron",
            },
            {
              id: 42,
              name: "Register NPM packages",
            },
          ],
        
        },
      ],
    },
    {
      id: 2,
      name: "Chat Bot",
      boards: [
        {
          name: "Sprint 2",
          // cards: [
          //   {
          //     name: "Create a task tracker app using Electron",
          //     e: "Create an app",
          tasks: [
            {
              id: 41,
              name: "RnD Chat Bot",
            },
            {
              id: 42,
              name: "RnD pypuppeter",
            },
          ],
          //   },
          // ],
        },
        {
          name: "Sprint 3",
          // cards: [
          //   {
          //     name: "Radassist Update",
          //     e: "Create an app",
          tasks: [
            {
              id: 41,
              name: "Learn and explore electron",
            },
            {
              id: 42,
              name: "1d 4h",
            },
          ],
          // },
          // {
          //   name: "Keycloak setup",
          //   e: "Create an app",
          // tasks: [
          //   {
          //     id: 41,
          //     name: "Learn and explore electron",
          //     time: "2d",
          //     softwares: ["chrome", "vs code"],
          //   },
          //   {
          //     id: 42,
          //     nam: "1d 4h",
          //     softwares: ["vs code", "chrome"],
          //   },
          // ],
          //   },
          // ],
        },
      ],
    },
  ],
  "commit": [
    {
      "root": "az8by28g6agh1j27s65t",
      "tree": "aslks8aha8s6A8amza",
      "blob": ["a8ai2k2ika9aa", "aka8a6a1", "akai1i1isa86"]
    },
    {
      "root": "b81ka89a67j2k2hag",
      "tree": "c3nbls8akqjahgskah",
      "blob": ["f2asdmasjhdsjk", "j38ak2a6a1", "aks82jk11isa86"]
    }
  ]
};



////////////////////    Project      //////////////////


function listAllProject() {
  var projectRef = document.getElementById("project");
  var projects = temp["projects"];
  var htmlText = "<option value=''>Project</option>";
  projects.map((project) => {
    htmlText +=
      "<option value='" +
      project["name"] +
      "'>" +
      project["name"] +
      "</option>";
  });
  projectRef.innerHTML = htmlText;

  /// Save Task

  //// Button Dropdown
}

listAllProject();

////////////////////    Board      //////////////////

function boardUpdate(projectRef) {
  console.log("Update");
  console.log(projectRef);
  var boardRef = document.getElementById("board");
  var projects = temp["projects"];
  var htmlText = "<option value=''>Board</option>";
  for (var i = 0; i < projects.length; i++) {
    if (projects[i]["name"] === projectRef) {
      var boards = temp["projects"][i]["boards"];
      for (var j = 0; j < boards.length; j++) {
        htmlText +=
          "<option value='" +
          boards[j]["name"] +
          "'>" +
          boards[j]["name"] +
          "</option>";
      }

      boardRef.innerHTML = htmlText;
      break;
    }
  }


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
          tasks = boards[j]["tasks"];
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

  };

}

function listAllTask(tasklist = tasks) {
  console.log(temp);
  console.log(tasklist);
  var taskRef = document.getElementById("taskName");
  var temp = ipcRenderer.sendSync("tasklist", "Grabbing task");
  total_taskList = new Set([...tasklist, ...temp]);
  total_taskList = [...total_taskList];
  var htmlText = "";
  total_taskList.map((task) => {
    if (task) {
      tasks.add(task);
      htmlText +=
        "<li><div class='taskList'><span class='taskName'>" + ": " + task;
      +"</span><button id='removeTask'>Remove</button></div> </li>";
    }
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

listAllTask(ipcRenderer.sendSync("tasklist", "Grabbing task"));



function chainSelect(current, target){
  console.log(current, target);
  
  var value1 = $(current).on('change', function(){
    if($(this).find(':selected').val() != ''){
      $(target).removeAttr('disabled');
      var value = $(this).find(':selected').text();
      console.log(value);
      if(target == '#board') {
        console.log('board update');
        set_project = value;
        boardUpdate(value);
      } else {
        console.log('card update:', value, set_project);
        cardUpdate(value, set_project);
      }
    }else{
      $(target).prop('disabled', 'disabled').val(null);
    }
  return value;
  });
  return value1;
}
size = chainSelect('select#project', '#board');
color = chainSelect('select#board', '#tasks');

