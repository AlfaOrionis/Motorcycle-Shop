const { authService } = require("../services");
const { User } = require("../models/user.model");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const sendEmail = require("../services/email.service");
const crypto = require("crypto");
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
        .send({ user: { ...user._doc, password: "", _id: "" }, token });
    } catch (err) {
      next(err);
    }
  },

  async signInGoogle(req, res, next) {
    try {
      const { email, firstname, lastname } = req.body;

      let user = await User.findOne({ email: email });

      if (!user) {
        user = new User({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: crypto.randomBytes(32).toString("hex"),
          verified: true,
        });

        await user.save();
      }
      const token = await authService.genAuthToken(user);

      res
        .cookie("x-access-token", token)
        .status(httpStatus.OK)
        .send({ user: { ...user._doc, password: "", _id: "" }, token });
    } catch (err) {
      next(err);
    }
  },

  async isAuth(req, res, next) {
    try {
      const { user } = req;
      res.json({ ...user._doc, password: "", _id: "" });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = authController;
