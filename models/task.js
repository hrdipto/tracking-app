const { model, Schema, SchemaTypes } = require("mongoose");

const newTaskSchema = new Schema({
    
  project: [{
      id: Number,
      name: String,
      boards: [{
          id: Number,
          name: String,
          tasks:[{
            id: Number,
            name: String,
            times: [{
                start: Date,
                end: Date
            }],
            softwares: [String]
          }]
      }]
  }],
});

module.exports = model("Task", newTaskSchema);
