const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const orderSchema = new Schema({
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 0, required: true },
      size: { type: String, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  recipientInfo: {
    firstname: {
      type: String,
      required: true,
      maxlength: 100,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      minlength: 6,
      maxlength: 30,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid Email");
        }
      },
    },
    telephone: {
      type: Number,
      required: true,
      maxlength: 30,
    },
  },

  shipping: { type: String, required: true },
  shippingInfo: {
    address: {
      type: String,
      required: true,
      maxlength: 100,
    },
    city: {
      type: String,
      required: true,
      maxlength: 100,
    },
    postalcode: {
      type: String,
      required: true,
      maxlength: 100,
    },
    inpostAddress: { type: String },
  },

  VAT_DATA: {
    companyOrNameVAT: {
      type: String,
      maxlength: 100,
    },
    cityVAT: {
      type: String,
      maxlength: 100,
    },
    nipVAT: {
      type: String,
      maxlength: 100,
    },
    postalcodeVAT: {
      type: String,
      maxlength: 100,
    },
  },
  orderPrice: { type: Number, required: true },
  ppData: { type: Object },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
