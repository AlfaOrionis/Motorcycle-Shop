const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
require("dotenv").config();
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    default: "",
  },
  lastname: {
    type: String,
    trim: true,
    default: "",
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 30,
    unique: true,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  verified: { type: Boolean, default: false },
  cart: { type: Array, default: [] },
  history: { type: Array, default: [] },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    await bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
    });
  }

  next();
});

userSchema.methods.generateAuthToken = function () {
  let user = this;
  const userObj = { sub: user._id.toHexString() };
  const token = jwt.sign(userObj, process.env.SECRET, { expiresIn: "1d" });
  return token;
};

userSchema.statics.emailTaken = async (email) => {
  const user = await User.findOne({ email: email });

  return !!user;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
