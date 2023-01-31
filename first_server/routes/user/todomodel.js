const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoListItemSchema = new Schema({
  completed: { type: Boolean, default: false },
  sub: { type: String, required: true },
  id: { type: Number, required: true },
});

const TodoListSchema = new Schema({
  userId: { type: String, required: true },
  items: [TodoListItemSchema],
});

const TodoList = mongoose.model("TodoList", TodoListSchema);

module.exports = TodoList;
