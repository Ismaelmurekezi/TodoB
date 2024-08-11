import { login, register } from "../controllers/userController.js";
import express from 'express'
const Router = express.Router()

Router.post('/register',register)
Router.post("/login", login);

export default Router;

