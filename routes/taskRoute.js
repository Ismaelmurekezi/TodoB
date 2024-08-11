import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import express from "express";

const Router = express.Router();

Router.post("/add", addTask);
Router.get("/getAllTasks", getTasks);
Router.delete("/deleteTask/:id", deleteTask);
Router.put("/updateTask/:id", updateTask);

export default Router;
