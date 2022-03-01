const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const Product = require("../models/product.model");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const fs = require("fs");

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_USER}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});

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
      shipping: body.shipping,
      properties: body.properties,
      description: body.description,
    });

    await product.save();
    //If the product is succesfully created, i also want to upload the images, i will do it in a function below

    return product;
  } catch (err) {
    throw err;
  }
};

const getProduct = async (id) => {
  try {
    const product = await Product.findById(id)
      .populate("category")
      .populate("brand");

    if (!product) {
      throw new ApiError("Product not found", httpStatus.NOT_FOUND);
    }

    return product;
  } catch (err) {
    throw err;
  }
};

const deleteProduct = async (req) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    for (step = 0; step < product.images.length; step++) {
      try {
        await cloudinary.uploader.destroy(product.images[step].publicId);
      } catch (err) {
        console.log(err);
        //If removing the images is not completed (sometimes it throws an error and a few pictures are still left in cloudinary), then i want to throw an error, and not remove the product from database. SO the product will still be on the list, and admin can click "remove" again and fire the function again so it finally success.
        throw new ApiError(
          "Removing is not complete, pls click remove again!",
          httpStatus.BAD_REQUEST
        );
      }
    }

    const deletedProduct = await Product.findByIdAndRemove(id);
    if (!deletedProduct) {
      throw new ApiError("Product not found", httpStatus.NOT_FOUND);
    }

    return deletedProduct;
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

const imgUpload = async (req) => {
  try {
    if (!req.files.length > 0) {
      //Product can have no images, so its not an error
      return { message: "Looks like you didnt upload any images" };
    }

    const imgResponse = [];
    for (i = 0; i < req.files.length; i++) {
      try {
        const uploaded = await cloudinary.uploader.upload(req.files[i].path, {
          public_id: `${Date.now()}`,
          folder: "MotorcycleShop_img",
        });

        fs.unlinkSync(req.files[i].path);
        imgResponse.push({ url: uploaded.url, publicId: uploaded.public_id });
      } catch (err) {
        //Sometimes error occurs, but i still want to upload the images that are already on cloudinary, and show in the error how many of them were uploaded, its the best i can do right now
        await updateProduct(req.body.id, {
          images: imgResponse,
        });
        throw new ApiError(
          `Only ${i} pictures were uploaded`,
          httpStatus.REQUEST_TIMEOUT
        );
      }
    }

    // I am updating the created product by putting the images data recieved from cloudinary to its images
    const product = await updateProduct(req.body.id, { images: imgResponse });

    return { product };
  } catch (err) {
    console.log(err);
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
      let categoriesArray = req.body.categories.map((cat) =>
        mongoose.Types.ObjectId(cat)
      );
      aggQueryArray.push({
        $match: { category: { $in: categoriesArray } },
      });
    }

    if (req.body.size && req.body.size.length > 0) {
      const sizes = req.body.size;

      let sizesArray = [];

      for (step = 0; step < sizes.length; step++) {
        sizesArray.push({ [`size.${sizes[step]}`]: { $gt: 0 } });
      }

      aggQueryArray.push({
        $match: {
          $or: [...sizesArray],
        },
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
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$brand" },
      { $unwind: "$category" }
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
  deleteProduct,
  updateProduct,
  getAll,
  paginateProducts,
  imgUpload,
};
