const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const auth = require("../middlewares/auth");
const { addProductValidator } = require("../middlewares/validation");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/product",
  auth(["createAny", "product"]),
  addProductValidator,
  upload.array("filesss", 12),
  productsController.addProduct
);

router
  .route("/product/:id")
  .get(productsController.getProduct)
  .delete(auth(["deleteAny", "product"]), productsController.deleteProduct)
  .patch(auth(["updateAny", "product"]), productsController.updateProduct);

router.get("/all", productsController.getAll);
router.post("/paginate/all", productsController.paginateProducts);

router.get(
  "/get_products_from_main_categories",
  productsController.getProdsFromAllCats
);

router.post(
  "/upload_img",
  auth(["createAny", "product"]),
  upload.array("filesss", 10),
  productsController.imgUpload
);

module.exports = router;
