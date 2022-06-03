// Modules
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const User = require("./models/user");
const Task = require("./models/task");
const sudo = require("sudo-prompt");

var options = {
  name: "Electron",
  icns: "/Applications/Electron.app/Contents/Resources/Electron.icns", // (optional)
};

function executeCommand(cmd) {
  sudo.exec(cmd, options, function (error, stdout, stderr) {
    if (error) throw error;
    console.log("stdout: " + stdout);
  });
}

const { mongoose, Schema, SchemaType } = require("mongoose");
require("./database");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let userSaved;

let rawdata = fs.readFileSync('uid.txt');
const currentUser = JSON.parse(rawdata);
// console.log(currentUser.id);

console.log(process.platform)
// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}


ipcMain.on("activeTask", async (e, activeTask) => {
  console.log("Task Recieved", activeTask);
  const taskUser = await User.where("id").equals(currentUser.id).select("_id")
  taskUid = taskUser[0]._id
  let newTask = {
    user: taskUid,
    tasks: []
  }
  activeTask.map((task) => {
    const temp = {
      id: task.idx,
      name: task.taskName,
      times: task.times,
      softwares: task.software,
    }
    newTask.tasks.push(temp)
  })
  const t = await Task.create(newTask);
  if (process.platform === 'linux')  {
    fs.writeFile("tasks.json", JSON.stringify(newTask), (err) => {
      // console.log(user);
      if (err) {
        console.error(err);
        return;
      }
    });

    executeCommand(`cp ./tasks.json /home/tasks.json`);

    
  } else if (process.platform === 'win32') {
    fs.writeFile("tasks.json", JSON.stringify(newTask), (err) => {
      // console.log(user);
      if (err) {
        console.error(err);
        return;
      }
    });

    executeCommand(`copy .\\tasks.json C:\\tasks.json`);

  }
  

  console.log(`time entry added ${newTask}`);
});


ipcMain.on("users", async (e, user) => {
  fs.writeFile("uid.json", JSON.stringify(user), (err) => {
    // console.log(user);
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });

  if (process.platform === 'linux')  {

    executeCommand(`cp ./uid.json /home/uid.json`);

    
  } else if (process.platform === 'win32') {

    executeCommand(`copy .\\uid.json C:\\uid.json`);

  }
  
  // const newUser = User(demo);
  // console.log(newUser);

  // const userSaved = await newUser.save(function (error) {
  //   if (error) console.log(error);
  //   console.log("user saved");
  // });
  // console.log(await User.exists({ id: userID }))
  if (! await User.exists({ id: user.id })) {
    userSaved = await User.create(user)
    console.log("new user created", userSaved);
  }
  else {
    console.log(`user exist`)
  }
});

ipcMain.on("savetask", async (e, saveTask) => {
  var file = fs.createWriteStream("tasks.txt");
  console.log("main.js" + saveTask);
  var array = fs.readFileSync("tasks.txt", "utf8").split("\n");
  const filterArray = array.filter(element => {
    return element !== '' && element !== '\n';
  });

  array = new Set(filterArray);

  saveTask = new Set([...array, ...saveTask]);
  for (let task of saveTask) {
    file.write(task + "\n");
  }
  file.end();
  const taskUser = await User.where("id").equals(currentUser.id).select("_id")
  taskUid = taskUser[0]._id
  let selected_task = []
  for (let task_name of saveTask){
    // console.log(task_name)
    tem = {
      id: Math.floor(Math.random() * 100),
      name: task_name
    }
    selected_task.push(tem);
  }
  // console.log(selected_task)


  if (! await Task.exists({ user: taskUid })) {
    let task = {
      user: taskUid,
      tasks: selected_task
    }
    const taskSaved = await Task.create(task)
    console.log("new task created", taskSaved);
  }
  else{
    let task = await Task.findOne({user: taskUid});
    task.tasks = selected_task;
    console.log('task updated')
  }
  

  

});

ipcMain.on("tasklist", function (event, arg) {
  var array = fs.readFileSync("tasks.txt", "utf8").split("\n");
  var trimmedArray = array.filter(function (e) {return e != null;});

  event.returnValue = trimmedArray;
});

// check if a file/ directory exist or not
ipcMain.on("file-exist", (e, path) => {
  e.returnValue = fs.existsSync(path);
});

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
