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
  token: {
    type: String,
  },
  otp: {
    type: String,
    default: null,
  },
});

export const UserModel = mongoose.model("User", userSchema);
