const Todo = require("../models/todoModel");

const createTodo = async (req, res) => {
  try {
    const { itemName, targetDueDate, completed } = req.body;
    const todoItem = await Todo.create({ itemName, targetDueDate, completed });
    res.status(201).json({ todo: todoItem });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const getTodoList = async (req, res) => {
  try {
    const todoList = await Todo.find();
    res.status(200).json({ todoList });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const modifyTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { itemName, targetDueDate, completed } = req.body;
    const updates = {};
    if (itemName !== undefined) updates.itemName = itemName;
    if (targetDueDate !== undefined) updates.targetDueDate = targetDueDate;
    if (completed !== undefined) updates.completed = completed;

    const updatedItem = await Todo.findByIdAndUpdate(id, updates, {
      new: true, //return the updated value
      runValidators: true, // run the schema validators rule
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Not found this TODO" });
    }
    res.status(200).json({ updatedTodo: updatedItem });
  } catch (error) {
    console.error("modify: ", error);
    if (error.name === "ValidationError") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await Todo.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Not found this TODO" });
    }
    res.status(200).json({ deletedTodo: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTodo, getTodoList, modifyTodo, deleteTodo };
