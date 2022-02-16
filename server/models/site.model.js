const mongoose = require("mongoose");

const siteSchema = mongoose.Schema({
  address: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
  },
  email: {
    required: true,
    type: String,
  },
  facebook: {
    type: String,
    default: "",
  },
});

const Site = mongoose.model("Site", siteSchema);
module.exports = { Site };
