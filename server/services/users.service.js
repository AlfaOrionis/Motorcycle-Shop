const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (token) => {
  return jwt.verify(token, process.env.SECRET);
};

const validateName = async (newName) => {
  try {
    const casingError = new ApiError(
      "Please use the right casing, Only first letter must be capitalized",
      httpStatus.NOT_ACCEPTABLE
    );
    //trimming
    let trimmedName = "";

    for (step = 0; step < newName.length; step++) {
      if (newName[step] !== " ") {
        let extractedLetter = newName.slice(step, step + 1);
        trimmedName += extractedLetter;
      }
    }

    //checking length
    if (trimmedName.length < 3 || trimmedName.length > 20) {
      throw new ApiError(
        "Please enter valid firstname and lastname (3-20 characters required)",
        httpStatus.NOT_ACCEPTABLE
      );
    }
    //checking casing
    for (step = 1; step < trimmedName.length; step++) {
      if (trimmedName[step] === trimmedName[step].toUpperCase()) {
        throw casingError;
      }
    }

    if (trimmedName[0] !== trimmedName[0].toUpperCase()) throw casingError;

    return trimmedName;
  } catch (err) {
    throw err;
  }
};

const validateEmail = async (newEmail) => {
  try {
    if (!newEmail.includes("@")) {
      throw new ApiError(
        "Please enter a valid email",
        httpStatus.NOT_ACCEPTABLE
      );
    } else if (await User.emailTaken(newEmail)) {
      throw new ApiError("This Email is already taken", httpStatus.BAD_REQUEST);
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  validateName,
  validateEmail,
  validateToken,
};
