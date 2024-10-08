import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryt.hashSync(password, 10);
  const newUser = new userModel({
    username,
    email,
    password: hashPassword,
  });
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(200)
        .json({ success: true, message: "User already exist" });
    }
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "user created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await userModel.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ success: true, message: "user not found" });
    }
    const validPassword = bcryt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res
        .status(500)
        .json({ success: true, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(validUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userExist = await userModel.findByIdAndDelete({ _id: id });
    if (!userExist) {
      return res.status(404).json({ success: true, message: "User not found" });
    }

    res
      .status(201)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, error: error.message });
  }
};
