import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config.js/db.js";
import taskRouter from "./routes/taskRoute.js";
import UserRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

//DB connection
connectDB();

const PORT = process.env.PORT || "4000";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(cookieParser())

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Api endpoints", success: true });
});
app.use("/api/task", taskRouter);
app.use("/api/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
