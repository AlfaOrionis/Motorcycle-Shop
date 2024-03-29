const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const { ApiError } = require("../middlewares/apiError");
const { User } = require("../models/user.model");
const usersService = require("../services/users.service");
const authService = require("../services/auth.service");
const sendEmail = require("../services/email.service");
require("dotenv").config();
const usersController = {
  async getProfile(req, res, next) {
    try {
      res.json(res.locals.permission.filter(req.user._doc));
    } catch (err) {
      console.log(err);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const { newFirstName, newLastName } = req.body;
      //so i've just noticed that trim() method does not remove empty spaces between characters, so i had to come up with a function that would do that, its probably not needed, but i will just leave it

      const validatedFirstName = await usersService.validateName(newFirstName);
      const validatedSecondName = await usersService.validateName(newLastName);

      const user = await User.findOneAndUpdate(
        { _id: req.user._id, email: req.user.email },
        {
          $set: {
            firstname: validatedFirstName,
            lastname: validatedSecondName,
          },
        },
        { new: true }
      );

      res.json({ user: { ...user._doc, _id: "", password: "" } });
    } catch (err) {
      next(err);
    }
  },

  async updateEmail(req, res, next) {
    try {
      const { password, newEmail } = req.body;

      const match = await bcrypt.compare(password, req.user.password);

      if (!match) {
        throw new ApiError("Wrong Password", httpStatus.UNAUTHORIZED);
      }

      //validation
      await usersService.validateEmail(newEmail);
      //updating the email

      const user = await User.findOneAndUpdate(
        {
          _id: req.user._id,
          email: req.user.email,
        },
        {
          $set: {
            email: newEmail,
            verified: false,
          },
        },
        { new: true }
      );

      const token = await authService.genAuthToken(user);

      await sendEmail(newEmail, user, token, "Register");

      res
        .cookie("x-acces-token", token)
        .send({ user: { ...user._doc, _id: "", password: "" }, token });
    } catch (err) {
      next(err);
    }
  },

  async updatePassword(req, res, next) {
    try {
      const user = await usersService.updatePassword(req);

      res.status(httpStatus.CREATED).send({
        user: { ...user._doc, _id: "", password: "" },
      });
    } catch (err) {
      next(err);
    }
  },

  async forgotPassword(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        throw new ApiError(
          "Nie istnieje użytkownik o takim adresie email",
          httpStatus.NOT_FOUND
        );
      }

      const token = await authService.genResetPassToken(user);

      await sendEmail(req.body.email, user, token, "ResetPassword");

      res
        .status(httpStatus.CREATED)
        .send({ message: "Reset password email has been sent" });
    } catch (err) {
      next(err);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const token = await usersService.validateResetPassToken(req.body.token);
      const user = await User.findById(token.sub);
      if (!user) throw new ApiError("User not found", httpStatus.NOT_FOUND);
      //I am implementing my own logic, that will make token NOT reuasable, but single-use
      //I think i dont have to use bcrypt in this case, cuz both values are crypted
      //If the user.password is diffrent than the password crypted in token, he must have already resetted his password
      if (user.password !== token.pass) {
        throw new ApiError(
          "Ten link stracił ważność! Skorzystaj ponownie z funkcji zapomniałem hasła.",
          httpStatus.NOT_ACCEPTABLE
        );
      }

      user.password = req.body.newPassword;
      await user.save();

      res
        .status(httpStatus.CREATED)
        .send({ message: "Password has been reset" });
    } catch (err) {
      next(err);
    }
  },

  async verifyAccount(req, res, next) {
    try {
      const token = await usersService.validateAuthToken(req.query.validation);
      const user = await User.findById(token.sub);

      //validation
      if (!user) throw new ApiError("User not found", httpStatus.NOT_FOUND);
      if (user.verified)
        throw new ApiError("Already verified", httpStatus.BAD_REQUEST);

      user.verified = true;
      user.save();

      res.status(httpStatus.CREATED).send({
        user: { ...user._doc, _id: "", password: "" },
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = usersController;
