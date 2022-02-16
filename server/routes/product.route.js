const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const auth = require("../middlewares/auth");
const { addProductValidator } = require("../middlewares/validation");

router.post(
  "/product",
  auth(["createAny", "product"]),
  addProductValidator,
  productsController.addProduct
);

router
  .route("/product/:id")
  .get(productsController.getProduct)
  .delete(auth(["deleteAny", "product"]), productsController.deleteProduct)
  .patch(auth(["updateAny", "product"]), productsController.updateProduct);

router.get("/all", productsController.getAll);
router.post("/paginate/all", productsController.paginateProducts);

module.exports = router;
