const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth");

router
  .route("/order")
  .post(auth(["createAny", "order"]), orderController.createOrder)
  .get(auth(["createAny", "order"]), orderController.getUserOrders);

module.exports = router;
