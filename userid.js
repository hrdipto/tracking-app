/////////////////////////////////////////////////////////
///////////////////////// INDEX.HTML
/////////////////////////////////////////////////////////
const { ipcRenderer } = require("electron");
const sudo = require("sudo-prompt");
const process = require('process');


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
  if (btn_installer.textContent == 'Install'){
    btn_installer.textContent = 'Installing...';
    let os = navigator.platform;  // Detect user's Operating system
    let path = `/bin/`; // default path of git.exe in linux
    let interceptor_path = `./git_file/linux/git`; // our own git_interceptor path

    // If user use Linux OS
    if(os.includes('Linux'))  // If user use Linux
    {
      console.log('Linux block executed');
      path = `/bin/`;
      interceptor_path = `${process.cwd()}/git_file/linux/git`;
      
      let response = ipcRenderer.sendSync( 'file-exist', `${path}gitold`)
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
    else if(os.includes('Windows')){
      console.log(`Windows block executed`);
      path = `C:\\programfiles\\Git\\MingW\\bin\\`;
      interceptor_path = `${process.cwd()}/git_file/windows/git`;
      let response = ipcRenderer.sendSync( 'file-exist', `${path}gitold`)
      if (response) {
        console.log(`gitold exist`);
        executeCommand(`cp ${interceptor_path} ${path}`);
      } else {
        console.log(`gitold doesn't exist`);
        executeCommand(`cp ${path}git ${path}gitold`);
        executeCommand(`cp ${interceptor_path} ${path}`);
      }
    }
    btn_installer.textContent = 'Uninstall';
  }

  else{
    btn_installer.textContent = 'Uninstalling...';
    let os = navigator.platform;  // Detect user's Operating system
    let path = `/bin/`; // default path of git.exe in linux
    let interceptor_path = `./git_file/linux/git`; // our own git_interceptor path

    // If user use Linux OS
    if(os.includes('Linux'))  // If user use Linux
    {
      console.log('Linux block executed');
      path = `/bin/`;
      interceptor_path = `${process.cwd()}/git_file/linux/git`;
      
      let response = ipcRenderer.sendSync( 'file-exist', `${path}gitold`)
      if (response) {
        // console.log(`gitold exist`);
        executeCommand(`cp ${path}gitold ${path}git`);
        executeCommand(`rm ${path}gitold`);
      } else {
        console.log(`git interceptor not installed in your device`);
      }
    }

    // if User use Windows OS
    else if(os.includes('Windows')){
      console.log(`Windows block executed`);
      path = `C:\\programfiles\\Git\\MingW\\bin\\`;
      interceptor_path = `${process.cwd()}/git_file/windows/git`;
      let response = ipcRenderer.sendSync( 'file-exist', `${path}gitold`)
      if (response) {
        // console.log(`gitold exist`);
        executeCommand(`cp ${path}gitold ${path}git`);
        executeCommand(`rm ${path}gitold`);
      } else {
        console.log(`git interceptor not installed in your device`);
      }
    }
    btn_installer.textContent = 'Install';
  }
  
});



