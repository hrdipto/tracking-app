const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/my_database", { useMongoClient: true })
  .then((db) => console.log("DB is connected", db))
  .catch((err) => console.log(err));
