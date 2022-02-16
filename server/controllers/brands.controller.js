const Brand = require("../models/brand.model");
const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");
const { brandsService } = require("../services");

const brandsController = {
  async addBrand(req, res, next) {
    try {
      const { brandName } = req.body;

      const brand = await Brand.findOne({ name: brandName });

      if (brand) {
        throw new ApiError(
          "This brand already exists",
          httpStatus.NOT_ACCEPTABLE
        );
      }
      const newBrand = new Brand({
        name: brandName,
      });

      await newBrand.save();
      res.json(newBrand);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },

  async getBrand(req, res, next) {
    try {
      const id = req.params.id;

      const brand = await brandsService.getBrand(id);

      res.json(brand);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },

  async deleteBrand(req, res, next) {
    try {
      const id = req.params.id;

      const brand = await Brand.findByIdAndRemove(id);
      if (!brand) {
        throw new ApiError("Product not found", httpStatus.NOT_FOUND);
      }

      res.json(brand);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const brands = await brandsService.getBrands(req.query);

      res.json(brands);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = brandsController;
