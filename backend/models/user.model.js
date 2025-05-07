import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "set up a password"],
      minLength: [6, "Password must be 6 characters long"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
