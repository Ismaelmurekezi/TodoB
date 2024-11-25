import taskModel from "../models/taskModel.js";
import express from "express";

export const addTask = async (req, res) => {
  const { task, status, user } = req.body;
  try {
    const taskExist = await taskModel.findOne({ task });
    if (taskExist) {
      return res.status(403).json({ message: "Task title already exist" });
    }

    const inputTask = new taskModel({
      task,
      status,
      user,
    });

    await inputTask.save();
    const populatedTask = await taskModel
      .findById(inputTask._id)
      .populate("user", "username email _id");

    return res.status(201).json({
      success: true,
      message: "Task added successfully",
      populatedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getTask = async (req, res) => {
  const { userId } = req.params;
  try {
    const userTask = await await taskModel
      .find({ user: userId })
      .populate("user", "username email _id");
    if (!userTask) {
      return res.status(404).json({ message: "User task not found" });
    }
    return res
      .status(200)
      .json({ userTask, message: "user tasks retrieved successfully" });
  } catch (error) {
    return res.status(500).json({ error, message: "Something went wrong" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    return res
      .status(200)
      .json([{ success: true, message: "Task retrieved successfully", tasks }]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskExist = await taskModel.findByIdAndDelete({ _id: id });

    if (!taskExist) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    // await taskModel.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, error: error.message });
  }
};

// export const updateTask = async (req, res) => {
//     const { id } = req.params
//     const{task}=req.body
//     try {
//         const taskExist = await taskModel.findById({ _id: id })
//             if (!taskExist) {
//                 res.status(404).json({success:false,message:"Task not found"})
//             }
//         if (taskExist) {
//             taskExist.task=task
//         }
//         await taskExist.save()
//         res.status(201).json({success:true,message:"Task updated successfully"})

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({success:true,error:error.message})

//     }
// }

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = req.body;
    const taskExist = await taskModel.findByIdAndUpdate(id, task, {
      new: true,
    });
    if (!taskExist) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res
      .status(201)
      .json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, error: error.message });
  }
};
