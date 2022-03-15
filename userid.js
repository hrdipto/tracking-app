/////////////////////////////////////////////////////////
///////////////////////// INDEX.HTML
/////////////////////////////////////////////////////////
var formSubmit = document.getElementById("formSubmit");
if (formSubmit) {
  formSubmit.addEventListener("click", () => {
    console.log("CLICK");
    var userID = document.getElementById("xid").value;
    ipcRenderer.send("userid", userID);
  });
}
