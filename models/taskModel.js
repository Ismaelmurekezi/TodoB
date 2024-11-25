import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default:false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.models.task || mongoose.model("task", taskSchema);

export default taskModel;
