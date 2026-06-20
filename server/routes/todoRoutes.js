const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

/* GET ALL TODOS */
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.json(todos);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* CREATE TODO */
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* DELETE TODO */
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    todo.completed = !todo.completed;

    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
/* TOGGLE COMPLETE */
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    todo.completed = !todo.completed;

    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = router;