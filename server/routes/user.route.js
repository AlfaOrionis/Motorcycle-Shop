const express = require("express");
const newsletterController = require("../controllers/newsletter.controller");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const auth = require("../middlewares/auth");

router
  .route("/profile")
  .get(auth(["readOwn", "profile"]), usersController.getProfile)
  .patch(auth(["updateOwn", "profile"]), usersController.updateProfile);

router.patch(
  "/email",
  auth(["updateOwn", "profile"]),
  usersController.updateEmail
);

router.patch(
  "/password",
  auth(["updateOwn", "profile"]),
  usersController.updatePassword
);

router.get("/verify", usersController.verifyAccount);
router.post("/forgot_password", usersController.forgotPassword);
router.patch("/reset_password", usersController.resetPassword);

router.post("/news_letter", newsletterController.newsLetter);
router.post("/news_letter_sign_up", newsletterController.newsLetterSignUp);
module.exports = router;
