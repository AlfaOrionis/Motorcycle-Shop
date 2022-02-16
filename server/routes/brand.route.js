const express = require("express");
const router = express.Router();
const brandsController = require("../controllers/brands.controller");
const auth = require("../middlewares/auth");

router
  .route("/brand/:id")
  .get(brandsController.getBrand)
  .delete(auth(["deleteAny", "brand"]), brandsController.deleteBrand);

router.post("/brand", auth(["createAny", "brand"]), brandsController.addBrand);
router.get("/all", brandsController.getAll);

module.exports = router;
