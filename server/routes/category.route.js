const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const auth = require("../middlewares/auth");

router
  .route("/category/:id")
  .get(categoryController.getCategory)
  .delete(auth(["deleteAny", "brand"]), categoryController.deleteCategory);

router.post(
  "/category",
  auth(["createAny", "brand"]),
  categoryController.addCategory
);
router.get("/all", categoryController.getAll);

module.exports = router;

//rights are same as for brand
