const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    itemName: { type: String, required: true },
    targetDueDate: { type: Date, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
