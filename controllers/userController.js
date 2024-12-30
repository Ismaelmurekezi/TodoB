import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryt from "bcrypt";
import taskModel from "../models/taskModel.js";

export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const hashPassword = bcryt.hashSync(password, 10);
  const newUser = new userModel({
    username,
    email,
    password: hashPassword,
    confirmPassword: hashPassword,
  });
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(200)
        .json({ success: true, message: "User already exist" });
    }
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "user created successfully", newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
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

    const { password:hashPassword, ...rest } = validUser._doc;
    const token = jwt.sign({ rest }, process.env.JWT_SECRET_KEY);
    const expireTime = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expireTime })
      .status(201)
      .json({
        sucsess: true,
        message: "Welcome to addtasker",
        sameSite: "strict",
        token,
        rest,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

//update user

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    const userExist = await userModel.findByIdAndUpdate(id, user, {
      new: true,
    });

    if (!userExist) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(201)
      .json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    console.log(error);
   return res.status(500).json({ success: false, message: "Failed to update User" });
  }
};

//delete user

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userExist = await userModel.findByIdAndDelete({ _id: id });
    await taskModel.deleteMany({ user: id });
    if (!userExist) {
      return res.status(404).json({ success: true, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, error: error.message });
  }
};

//get all user

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res
      .status(200)
      .json({ success: true, message: "Users retrieved successfully", users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all Users" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token").status(200).json({message:"Signout success!"});
};
