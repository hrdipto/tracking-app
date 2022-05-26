/////////////////////////////////////////////////////////
///////////////////////// INDEX.HTML
/////////////////////////////////////////////////////////
const { ipcRenderer } = require("electron");
const sudo = require("sudo-prompt");
const process = require("process");

var formSubmit = document.getElementById("formSubmit");
if (formSubmit) {
  formSubmit.addEventListener("click", () => {
    console.log("CLICK");
    var userID = document.getElementById("xid").value;
    ipcRenderer.send("userid", userID);
  });
}

///////////////////////////////////////////////////////
////////////////////// Installer

// const exec = require('child_process').exec

var options = {
  name: "Electron",
  icns: "/Applications/Electron.app/Contents/Resources/Electron.icns", // (optional)
};

const btn_installer = document.getElementById("btn-installer");

// This function execute a command in system terminal
function executeCommand(cmd) {
  sudo.exec(cmd, options, function (error, stdout, stderr) {
    if (error) throw error;
    console.log("stdout: " + stdout);
  });
}

btn_installer.addEventListener("click", (e) => {
  let os = navigator.platform; // Detect user's Operating system
  let path = `/bin/`; // default path of git.exe in linux
  let interceptor_path = `./git_file/linux/git`; // our own git_interceptor path
  console.log("button clicked");
  console.log(os);
  // If user use Linux OS
  if (os.includes("Linux")) {
    // If user use Linux
    console.log("Linux block executed");
    path = `/bin/`;
    interceptor_path = `${process.cwd()}/git_file/linux/git`;

    let response = ipcRenderer.sendSync("file-exist", `${path}gitold`);
    if (response) {
      console.log(`gitold exist`);
      executeCommand(`cp ${interceptor_path} ${path}`);
    } else {
      console.log(`gitold doesn't exist`);
      executeCommand(`cp ${path}git ${path}gitold`);
      executeCommand(`cp ${interceptor_path} ${path}`);
    }
  }

  // if User use Windows OS
  else if (os.includes("Win32")) {
    console.log(`Windows block executed`);
    path = "'C:\\Program Files\\Git\\mingw64\\bin\\'";
    interceptor_path = `${process.cwd()}\\git_file\\windows\\git`;
    let response = ipcRenderer.sendSync("file-exist", `${path}gitold`);
    if (response) {
      console.log(`gitold exist`);
      executeCommand(`cp ${interceptor_path} ${path}`);
    } else {
      console.log(`gitold doesn't exist`);
      console.log(`cp ${path}git ${path}gitold`);
      executeCommand(`cp ${path}git ${path}gitold`);
      executeCommand(`cp ${interceptor_path} ${path}`);
    }
  }
});
