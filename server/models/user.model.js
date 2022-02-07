import mongoose from "mongoose";
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema({
  firstname: {
    type: String,
    minlength: 2,
    maxlength: 30,
    trim: true,
    default: "",
  },
  lastname: {
    type: String,
    minlength: 2,
    maxlength: 30,
    trim: true,
    default: "",
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 30,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 18,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  verified: { Boolean, default: false },
  cart: { type: Array, default: [] },
  history: { type: Array, default: [] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
