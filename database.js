const mongoose = require("mongoose");
const fs = require("fs");
const Task = require("./models/task")
const User = require("./models/user")
// const dbUrl = "mongodb://127.0.0.1:27017/my_database"

// Remote connection
const dbUrl = "mongodb+srv://test:test@cluster0.imemt.mongodb.net/?retryWrites=true&w=majority"
const connectionParam = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
let rawdata = fs.readFileSync('uid.txt');
const currentUser = JSON.parse(rawdata);


mongoose
  .connect(dbUrl, connectionParam)
  .then(() => console.info("DB is connected"))
  .catch((err) => console.log(err));


// run()
async function run(){
  try{
    const out = await User.where("id").equals(currentUser.id).select("_id")
    console.log(out[0]._id)
  }
  catch(e){
    console.log(e);
  }
}
