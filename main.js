// Modules
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const User = require("./models/user");
require("./database");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


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

ipcMain.on("userid", async (e, userID) => {
  fs.writeFile("uid.txt", userID, (err) => {
    console.log(userID);
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });

  const demo = {
    username: "habiburrahmandipto",
    id: userID,
    email: "dipto@brainstation-23.com",
  };
  // const newUser = User(demo);
  // console.log(newUser);

  // const userSaved = await newUser.save(function (error) {
  //   if (error) console.log(error);
  //   console.log("user saved");
  // });
  console.log(await User.exists({ id: userID }))
  if (! await User.exists({ id: userID })) {
    const userSaved = await User.create(demo)
    console.log("new user created", userSaved);
  }
  else {
    console.log(`user exist`)
  }
});

ipcMain.on("savetask", (e, saveTask) => {
  var file = fs.createWriteStream("tasks.txt");
  console.log("main.js" + saveTask);
  var array = new Set(fs.readFileSync("tasks.txt", "utf8").split("\n"));
  saveTask = new Set([...array, ...saveTask]);
  for (let task of saveTask) {
    file.write(task + "\n");
  }
  file.end();

  // fs.writeFile("tasks.txt", saveTask, (err) => {
  //   console.log(saveTask);
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   //file written successfully
  // });
  // fs.appendFile("tasks.txt", task + "\n", (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
});

ipcMain.on("tasklist", function (event, arg) {
  var array = fs.readFileSync("tasks.txt", "utf8").split("\n");

  event.returnValue = array;
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
