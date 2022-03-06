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
    maxlength: 20,
  },
  lastname: {
    type: String,
    trim: true,
    default: "",
    maxlength: 20,
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
    minlength: 6,
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
  const token = jwt.sign(userObj, process.env.SECRET_AUTH, { expiresIn: "8h" });
  return token;
};

userSchema.methods.generateResetPassToken = function () {
  let user = this;
  const userObj = {
    sub: user._id.toHexString(),
    pass: user.password,
  };
  const token = jwt.sign(userObj, process.env.SECRET_RESET_PASS, {
    expiresIn: "3h",
  });
  return token;
};

userSchema.methods.generateResetEmailToken = function () {
  let user = this;
  const userObj = { sub: user.email.toHexString() };
  const token = jwt.sign(userObj, process.env.SECRET_RESET_EMAIL, {
    expiresIn: "3h",
  });
  return token;
};

userSchema.statics.emailTaken = async (email) => {
  const user = await User.findOne({ email: email });

  return !!user;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
