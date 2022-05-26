/////////////////////////////////////////////////////////
///////////////////////// INDEX.HTML
/////////////////////////////////////////////////////////
const { ipcRenderer } = require("electron");
const sudo = require("sudo-prompt");
const process = require('process');
const { connected } = require("process");

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

// This function execute a command in system terminal
function executeCommand(cmd) {
  sudo.exec(cmd, options, function (error, stdout, stderr) {
    if (error) throw error;
    console.log("stdout: " + stdout);
  });
}

btn_installer.addEventListener("click", (e) => {
  if (btn_installer.textContent == 'Install') {
    btn_installer.textContent = 'Installing...';
    console.log(`installing...`)
    let os = navigator.platform;  // Detect user's Operating system
    let path = `/bin/`; // default path of git.exe in linux
    let interceptor_path = `./git_file/linux/git`; // our own git_interceptor path
    console.log(os)
    // If user use Linux OS
    if (os.includes('Linux'))  // If user use Linux
    {
      console.log('Linux block executed');
      path = `/bin/`;
      interceptor_path = `${process.cwd()}/git_file/linux/git`;

      let response = ipcRenderer.sendSync('file-exist', `${path}gitold`)
      if (response) {
        console.log(`gitold exist`);
        executeCommand(`cp ${interceptor_path} ${path}`);
      } else {
        console.log(`gitold doesn't exist`);
        executeCommand(`cp ${path}git ${path}gitold`);
        executeCommand(`cp ${interceptor_path} ${path}`);
      }
      btn_installer.textContent = 'Uninstall';
    }

    // if User use Windows OS
    else if (os.includes('Win')) {
      console.log(`Windows block executed`);
      path = `C:\\Program Files\\Git\\mingw64\\bin\\`;
      interceptor_path = `${process.cwd()}\\git_file\\windows\\git.exe`;
      let response = ipcRenderer.sendSync('file-exist', `${path}gitold.exe`)
      console.log(response)
      if (response) {
        console.log(`gitold exist`);
        executeCommand(`copy "${interceptor_path}" "${path}" /y`);
      } else {
        console.log(`gitold doesn't exist`);
        executeCommand(`copy "${path}git.exe" "${path}gitold.exe" /y`);
        executeCommand(`copy "${interceptor_path}" "${path}" /y`);
      }
      btn_installer.textContent = 'Uninstall';
    }

  }

  else {
    btn_installer.textContent = 'Uninstalling...';
    console.log(`Uninstalling...`)
    let os = navigator.platform;  // Detect user's Operating system
    let path = `/bin/`; // default path of git.exe in linux
    let interceptor_path = `./git_file/linux/git`; // our own git_interceptor path

    // If user use Linux OS
    if (os.includes('Linux'))  // If user use Linux
    {
      console.log('Linux block executed');
      path = `/bin/`;
      interceptor_path = `${process.cwd()}/git_file/linux/git`;

      let response = ipcRenderer.sendSync('file-exist', `${path}gitold`)
      if (response) {
        // console.log(`gitold exist`);
        executeCommand(`cp ${path}gitold ${path}git`);
        executeCommand(`rm ${path}gitold`);
      } else {
        console.log(`git interceptor not installed in your device`);
      }
      btn_installer.textContent = 'Install';
    }

    // if User use Windows OS
    else if (os.includes('Win')) {
      console.log(`Windows block executed`);
      path = `C:\\Program Files\\Git\\mingw64\\bin\\`;
      interceptor_path = `${process.cwd()}\\git_file\\windows\\git.exe`;
      let response = ipcRenderer.sendSync('file-exist', `${path}gitold.exe`)
      console.log(response)
      if (response) {
        console.log(`gitold exist`);
        console.log('e0')
        executeCommand(`copy "${path}gitold.exe" "${path}git.exe" /y`);
        console.log('e1')
        executeCommand(`del "${path}gitold.exe"`);
        console.log('e2')
      } else {
        console.log(`git interceptor not installed in your device`);
      }
      btn_installer.textContent = 'Install';
    }

  }
});



