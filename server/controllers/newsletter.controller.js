const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");
const sendEmail = require("../services/email.service");
const jwt = require("jsonwebtoken");
const NewsLetter = require("../models/newsletter.model");
require("dotenv").config();

const newsletterController = {
  async newsLetter(req, res, next) {
    try {
      if (!req.body.email.includes("@")) {
        throw new ApiError("Wrong email", httpStatus.NOT_ACCEPTABLE);
      }
      const token = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_NEWSLETTER,
        {
          expiresIn: "24h",
        }
      );

      await sendEmail(req.body.email, "", token, "NewsLetter");

      res
        .status(httpStatus.CREATED)
        .send({ message: "Newsletter email has been sent" });
    } catch (err) {
      next(err);
    }
  },

  async newsLetterSignUp(req, res, next) {
    try {
      const token = jwt.verify(req.body.token, process.env.SECRET_NEWSLETTER);

      const existingNewsLetter = await NewsLetter.findOne({
        email: token.email,
      });

      if (existingNewsLetter) {
        throw new ApiError(
          "This email is already signed up",
          httpStatus.BAD_REQUEST
        );
      }

      const newsLetter = new NewsLetter({
        email: token.email,
      });

      await newsLetter.save();

      res
        .status(httpStatus.CREATED)
        .send({ message: "The email has been successfully signed up" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = newsletterController;
