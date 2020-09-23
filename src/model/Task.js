const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let task = new Schema(
  {
    value: {
      type: String
    },
    status :{
        type : Number
    },
    is_editing :{
        type : Boolean
    }
  },
  { collection: "tasks" }
);

module.exports = mongoose.model("Task", task);