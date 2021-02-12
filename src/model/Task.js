const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    value: String,
    status : Number,
    is_editing :Boolean
  }
)

const TaskModel = mongoose.model('Task', TaskSchema)
module.exports = TaskModel
