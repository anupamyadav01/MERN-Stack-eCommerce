import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    requireed: true,
    enum: ["customer", "admin", "seller"],
  },
  token: {
    type: String,
    required: false,
    default: "",
  },
  otp: {
    type: String,
    default: null,
  },
});

export const UserModel = mongoose.model("user", userSchema);
