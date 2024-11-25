import {
  deleteUser,
  getUsers,
  login,
  register,
  updateUser,
  logout,
} from "../controllers/userController.js";
import express from "express";
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.post("/logout", logout);
Router.delete("/delete/:id", deleteUser);
Router.put("/update/:id", updateUser);
Router.get("/getUsers", getUsers);

export default Router;
