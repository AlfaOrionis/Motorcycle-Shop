const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

const addProduct = async (body) => {
  try {
    if (await Product.findOne({ name: body.name })) {
      throw new ApiError(
        "This product already exists",
        httpStatus.NOT_ACCEPTABLE
      );
    }

    const product = new Product({
      name: body.name,
      brand: body.brand,
      size: body.size,
      category: body.category,
      price: body.price,
      shipping: false,
      properties: body.properties,
      description: body.description,
    });

    await product.save();

    return product;
  } catch (err) {
    throw err;
  }
};

const getProduct = async (id) => {
  try {
    const product = await Product.findById(id).populate("brand");

    if (!product) {
      throw new ApiError("Product not found", httpStatus.NOT_FOUND);
    }

    return product;
  } catch (err) {
    throw err;
  }
};

const getAll = async (query) => {
  try {
    const limit = query.limit ? query.limit : 5;
    const sortBy = query.sortBy ? query.sortBy : "_id";
    const order = query.order ? query.order : "asc";

    const products = await Product.find({})
      .sort([[sortBy, order]])
      .limit(parseInt(limit));

    return products;
  } catch (err) {
    throw err;
  }
};

const updateProduct = async (id, body) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        $set: body,
      },
      { new: true }
    );

    if (!updatedProduct) {
      throw new ApiError("Product not found", httpStatus.NOT_FOUND);
    }
    return updatedProduct;
  } catch (err) {
    throw err;
  }
};

const paginateProducts = async (req) => {
  try {
    let aggQueryArray = [];

    if (req.body.brands && req.body.brands.length > 0) {
      let brandsArray = req.body.brands.map((brand) =>
        mongoose.Types.ObjectId(brand)
      );
      aggQueryArray.push({ $match: { brand: { $in: brandsArray } } });
    }

    if (req.body.categories && req.body.categories.length > 0) {
      aggQueryArray.push({
        $match: { category: { $in: req.body.categories } },
      });
    }

    if (req.body.keywords && req.body.keywords.length > 0) {
      const re = new RegExp(`${req.body.keywords}`, "gi");

      aggQueryArray.push({ $match: { name: { $regex: re } } });
    }
    if (
      (req.body.min && req.body.min > 0) ||
      (req.body.max && req.body.max < 99999)
    ) {
      if (req.body.min) {
        aggQueryArray.push({ $match: { price: { $gt: req.body.min - 1 } } });
      }

      if (req.body.max) {
        aggQueryArray.push({ $match: { price: { $lt: req.body.max + 1 } } });
      }
    }
    aggQueryArray.push(
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      { $unwind: "$brand" }
    );

    let aggQuery = Product.aggregate(aggQueryArray);
    const sortBy = req.body.sortBy ? req.body.sortBy : { date: "desc" };
    const options = {
      page: req.body.page,
      limit: req.body.limit,
      sort: { ...sortBy },
    };

    const products = await Product.aggregatePaginate(aggQuery, options);

    return products;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  getAll,
  paginateProducts,
};
