const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const { addPasswordValidator } = require("../middlewares/validation");

router.post("/register", addPasswordValidator, authController.Register);
router.post("/signin", authController.signIn);
router.get("/isauth", auth(), authController.isAuth);

module.exports = router;
