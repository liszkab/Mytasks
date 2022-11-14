const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const connectDB = require("./db");
const asyncHendler = require("express-async-handler");
const Todo = require("./models/todoModel");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  asyncHendler(async (req, res) => {
    const todos = await Todo.find();
    res.send(todos);
  })
);

app.post(
  "/new",
  asyncHendler(async (req, res) => {
    const { title } = req.body;
    const todo = await Todo.create({ title });
    res.status(201).send(todo);
  })
);

app.patch(
  "/:id",
  asyncHendler(async (req, res) => {
    console.log("receivedTodo", req.body.updatedTodo);
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body.updatedTodo,
      {
        runValidators: true,
        new: true,
      }
    );

    console.log(updatedTodo);

    res.send(updatedTodo);
  })
);

app.delete(
  "/:id",
  asyncHendler(async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.send("Todo deleted");
  })
);

app.listen(4444, () => {
  console.log("Server is running on port 4444");
});
