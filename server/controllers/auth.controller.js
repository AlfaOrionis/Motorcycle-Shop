const { authService } = require("../services");
const { User } = require("../models/user.model");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const sendEmail = require("../services/email.service");
const authController = {
  async Register(req, res, next) {
    try {
      const { email, password } = req.body;

      if (await User.emailTaken(email)) {
        throw new ApiError(
          "This Email is already taken",
          httpStatus.BAD_REQUEST
        );
      }

      const user = await authService.createUser(email, password);

      const token = await authService.genAuthToken(user);
      await sendEmail(email, user, token, "Register");

      res
        .cookie("x-access-token", token)
        .status(httpStatus.CREATED)
        .send({
          user: {
            ...user._doc,
            _id: "",
            password: "",
          },
          token,
        });
    } catch (err) {
      next(err);
    }
  },

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await authService.findAndVerifyUser(email, password);

      const token = await authService.genAuthToken(user);

      res
        .cookie("x-access-token", token)
        .status(httpStatus.OK)
        .send({ user, token });
    } catch (err) {
      next(err);
    }
  },

  async isAuth(req, res, next) {
    try {
      res.json(req.user);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = authController;
