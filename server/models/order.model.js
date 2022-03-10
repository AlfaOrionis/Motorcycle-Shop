const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
