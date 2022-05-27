const mongoose = require("mongoose");

mongoose
<<<<<<< HEAD
  .connect("mongodb://127.0.0.1:27017/my_database", 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then((db) => console.log("DB is connected", db))
  .catch((err) => console.log(err));


=======
  .connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

>>>>>>> 4e7bcfd86d23fff7d51b1fec62197adb60dab991
