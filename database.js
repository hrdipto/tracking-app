const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/my_database", 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then((db) => console.log("DB is connected", db))
  .catch((err) => console.log(err));


