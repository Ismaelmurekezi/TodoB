import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const taskModel = mongoose.models.food || mongoose.model("task", taskSchema);

export default taskModel;
