import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

// Pre-Function
// Hash user password before saving in DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    next(error);
  }
});

// Compare password before logging
userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
