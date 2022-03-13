const { authService } = require("../services");
const { User } = require("../models/user.model");
const { Order } = require("../models/order.model");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const sendEmail = require("../services/email.service");
const Product = require("../models/product.model");

const orderController = {
  async createOrder(req, res, next) {
    //I took care of the structure of things in front end, so everything that comes here is actually compatible with the order model
    try {
      const order = new Order({
        recipientInfo: req.body.recipientInfo,
        VAT_DATA: req.body.VAT_DATA,
        orderPrice: req.body.orderPrice,
        cart: req.body.cart,
        shipping: req.body.shipping,
        shippingInfo: req.body.shippingInfo,
        user: req.user._id,
        ppData: req.body.ppData,
      });

      await order.save();

      // Now after i created the order, i wanna put the order to the user history
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          history: [order._id],
        },
      });

      res.json(order);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },

  //I think checking the user history is not something that user does often, so i wont populate on signIn. I will make a special function and only populate when user actually wants to see his history, so i dont always get all his history unnecessary

  async getUserOrders(req, res, next) {
    try {
      const orders = await Order.find({ user: req.user._id }).populate({
        path: "cart",
        populate: { path: "product", model: "Product" },
      });

      //This is an alternative solution, i would just get user from database, populate his history and the product in each order of that history, but its just a bit more of code, and more complicated so idk if its better

      // const user = await User.findById(req.user._id)
      //   .populate("history")
      //   .populate({
      //     path: "history",
      //     populate: {
      //       path: "cart",
      //       populate: { path: "product", model: "Product" },
      //     },
      //   });

      if (!orders) throw new ApiError("Orders not Found", httpStatus.NOT_FOUND);

      res.json(orders);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },
};

module.exports = orderController;
