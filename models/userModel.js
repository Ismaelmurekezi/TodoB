import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,

      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
  },
  { timestamps: true }
);


//Middleware to delete confirm password before saving
userSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

const userModel = mongoose.models.user || mongoose.model("User", userSchema);
export default userModel;
