import { deleteUser, login, register } from "../controllers/userController.js";
import express from "express";
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.delete("/delete/:id", deleteUser);

export default Router;
