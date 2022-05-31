// Modules
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const User = require("./models/user");
const Task = require("./models/task");
const { mongoose, Schema, SchemaType } = require("mongoose");
require("./database");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let userSaved;


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
});


ipcMain.on("users", async (e, user) => {
  fs.writeFile("uid.txt", JSON.stringify(user), (err) => {
    console.log(user);
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });


  
  
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
  var array = new Set(fs.readFileSync("tasks.txt", "utf8").split("\n"));
  saveTask = new Set([...array, ...saveTask]);
  for (let task of saveTask) {
    file.write(task + "\n");
  }
  file.end();
  console.log(...saveTask)
  const task = {
    project: {
      id: 2,
      name: "a",
      user: mongoose.Types.ObjectId("6294955631cb460fa82f68e6"),
      boards: [{
        id: 22,
        name: "ab",
        tasks: [{
          id: 1,
          name: "saveTask[1]",
          times: null,
          softwares: ['1', '2']
        }, {
          id: 2,
          name: "saveTask[2]",
          times: null,
          softwares: ['1', '2']
        }]
      }]
    }
  };
  console.log(task)
  const taskSaved = await Task.create(task)
  console.log("new user created", taskSaved);

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
