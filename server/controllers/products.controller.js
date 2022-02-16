const Product = require("../models/product.model");
const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");
const { productsService } = require("../services");

const productsController = {
  async addProduct(req, res, next) {
    try {
      const product = await productsService.addProduct(req.body);

      res.json(product);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },

  async getProduct(req, res, next) {
    try {
      const id = req.params.id;
      const product = await productsService.getProduct(id);

      res.json(product);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const allProducts = await productsService.getAll(req.query);

      res.json(allProducts);
    } catch (err) {
      next(err);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;

      const deletedProduct = await Product.findByIdAndRemove(id);

      if (!deletedProduct) {
        throw new ApiError("Product not found", httpStatus.NOT_FOUND);
      }

      res.json(deletedProduct);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const id = req.params.id;

      const updatedProduct = await productsService.updateProduct(id, req.body);

      res.json(updatedProduct);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  async paginateProducts(req, res, next) {
    try {
      const products = await productsService.paginateProducts(req);

      res.json(products);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productsController;
