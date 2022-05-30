const mongoose = require("mongoose");


// const dbUrl = "mongodb://127.0.0.1:27017/my_database"

// Remote connection
const dbUrl = "mongodb+srv://test:test@cluster0.imemt.mongodb.net/?retryWrites=true&w=majority"
const connectionParam = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose
  .connect(dbUrl, connectionParam)
  .then(() => console.info("DB is connected"))
  .catch((err) => console.log(err));