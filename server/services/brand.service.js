const Brand = require("../models/brand.model");
const bcrypt = require("bcrypt");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

const getBrand = async (id) => {
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      throw new ApiError("Brand not found", httpStatus.NOT_FOUND);
    }

    return brand;
  } catch (err) {
    throw err;
  }
};

const getBrands = async (query) => {
  try {
    const limit = query.limit ? query.limit : 5;
    const sortBy = query.sortBy ? query.sortBy : "_id";
    const order = query.order ? query.order : "asc";

    const brands = await Brand.find({})
      .sort([[sortBy, order]])
      .limit(limit);

    if (!brands) {
      throw new ApiError("Brands not found", httpStatus.NOT_FOUND);
    }
    return brands;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getBrand,
  getBrands,
};
