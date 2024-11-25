import {
  addTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";


const Router = express.Router();

Router.post("/add", verifyToken, addTask);
Router.get("/getAllTasks",getTasks);
Router.get("/getTask/:userId", verifyToken, getTask);
Router.delete("/deleteTask/:id", verifyToken, deleteTask);
Router.put("/updateTask/:id", verifyToken, updateTask);

export default Router;
