const { authService } = require("../services");
const { User } = require("../models/user.model");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const sendEmail = require("../services/email.service");
const crypto = require("crypto");
const https = require("https");

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
      const { access_token } = req.body;
      const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;

      function fetch(url) {
        return new Promise((resolve, reject) => {
          const req = https.get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => {
              data += chunk;
            });
            res.on("end", () => {
              if (JSON.parse(data).error) {
                reject(new ApiError("UNAUTHORIZED", httpStatus.UNAUTHORIZED));
              }
              resolve(JSON.parse(data));
            });
          });
          req.on("error", (err) => {});
          req.end();
        });
      }

      // const response = await fetch(
      //   `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${access_token}`,
      //       Accept: "application/json",
      //     },
      //   }
      // );

      const {
        email,
        given_name: firstname,
        family_name: lastname,
      } = await fetch(url);

      let user = await User.findOne({ email });

      if (!user) {
        user = new User({
          firstname,
          lastname,
          email,
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
