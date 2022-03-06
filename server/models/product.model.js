const mongoose = require("mongoose");
const { Schema } = mongoose;

const aggregatePanigate = require("mongoose-aggregate-paginate-v2");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product needs a name"],
    minlength: 3,
    unique: true,
  },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true, maxlength: 100 },
  shipping: {
    type: Boolean,
    required: [true, "Specify if this product has free shipping"],
    default: false,
  },
  itemSold: { type: Number, default: 0 },
  size: {
    s: { type: Number, default: 0, maxlength: 4 },
    m: { type: Number, default: 0, maxlength: 4 },
    l: { type: Number, default: 0, maxlength: 4 },
    xl: { type: Number, default: 0, maxlength: 4 },
    xxl: { type: Number, default: 0, maxlength: 4 },
  },
  description: {
    required: [true, "You need a description"],
    type: String,
    maxlength: 10000,
  },

  images: { type: Array, default: [] },
  date: { type: Date, default: Date.now },

  properties: {
    type: Array,
    default: [],
  },
});

productSchema.plugin(aggregatePanigate);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
