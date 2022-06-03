const { model, Schema, SchemaTypes } = require("mongoose");
const User = require("./user")

const newTaskSchema = new Schema(
  {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      tasks:[{
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          // required: true,
        },
        time: String,
        softwares: [String]
      }]
    });

module.exports = model("Task", newTaskSchema);
