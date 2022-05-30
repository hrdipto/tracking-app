const { model, Schema, SchemaTypes } = require("mongoose");

const newUserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = model("User", newUserSchema);
