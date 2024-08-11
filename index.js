import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config.js/db.js";
import taskRouter from "./routes/taskRoute.js";
import UserRouter from "./routes/userRoute.js";

dotenv.config();

//DB connection
connectDB()



const PORT = process.env.PORT || "4000";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({message:"Welcome to Api endpoints",success:true})
});
app.use("/api/task", taskRouter);
app.use("/api/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});


// mongodb+srv://ishmure:ismael123@cluster0.rmxcz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0