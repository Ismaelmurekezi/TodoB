import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://ishmure:ismael123@cluster0.rmxcz.mongodb.net/Todo?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(() => {
        console.log("Database connected successfull");
      });
  } catch (error) {
      console.log(error)
  }
};


export default connectDB