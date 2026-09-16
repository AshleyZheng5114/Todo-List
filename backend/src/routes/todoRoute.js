const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodoList,
  modifyTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", getTodoList);
router.post("/", createTodo);
router.put("/:id", modifyTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
