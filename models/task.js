const { model, Schema, SchemaTypes } = require("mongoose");

const newTaskSchema = new Schema({

  project: {
    id: {
      type: Number,
      // required: true,
      // unique: true
    },
    name: {
      type: String,
      // required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    boards: [{
      id: {
        type: Number,
        required: true,
        // unique: true
      },
      name: {
        type: String,
        required: true,
      },
      tasks: [{
        id: {
          type: Number,
          required: true,
          // unique: true
        },
        name: {
          type: String,
          required: true,
        },
        times: [{
          start: Date,
          end: Date
        }],
        softwares: [String]
      }]
    }]
  },
});

module.exports = model("Task", newTaskSchema);
