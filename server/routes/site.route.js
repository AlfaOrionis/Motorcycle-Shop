const express = require("express");
const router = express.Router();
const siteController = require("../controllers/site.controller");
const auth = require("../middlewares/auth");

router
  .route("/site")
  .post(auth(["updateAny", "site"]), siteController.updateSite)
  .get(siteController.getSite);

module.exports = router;
