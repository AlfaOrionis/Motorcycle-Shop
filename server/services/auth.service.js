const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

const createUser = async (email, password) => {
  try {
    const user = new User({
      email: email,
      password: password,
    });

    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};

const genAuthToken = (user) => {
  const token = user.generateAuthToken();
  return token;
};
const genResetEmailToken = (user) => {
  const token = user.generateResetEmailToken();
  return token;
};
const genResetPassToken = (user) => {
  const token = user.generateResetPassToken();
  return token;
};

const findAndVerifyUser = async (email, password) => {
  try {
    const signInError = new ApiError(
      "Wrong email or password",
      httpStatus.UNAUTHORIZED
    );
    const user = await User.findOne({ email: email });

    if (!user) {
      throw signInError;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw signInError;
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  genAuthToken,
  genResetPassToken,
  genResetEmailToken,
  findAndVerifyUser,
};
