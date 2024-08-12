import taskModel from "../models/taskModel.js";
import express from "express";

export const addTask = async (req, res) => {
    const userId = req.user.id;
  const task = new taskModel({
    task: req.body.task,
    user:userId
  });
  try {
    await task.save();
    res
      .status(201)
      .json({ success: true, message: "Task added successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res
      .status(200)
      .json({ success: true, message: "Task retrieved successfully", tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskExist = await taskModel.findByIdAndDelete({ _id: id });

    if (!taskExist) {
      res.status(404).json({ success: false, message: "Task not found" });
    }
    // await taskModel.findByIdAndDelete(id);
    res
      .status(201)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, error: error.message });
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
      const  task  = req.body;
    const taskExist = await taskModel.findByIdAndUpdate(id,task, {
      new: true,
    });
    if (!taskExist) {
      res.status(404).json({ success: false, message: "Task not found" });
    }

    res
      .status(201)
      .json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, error: error.message });
  }
};
