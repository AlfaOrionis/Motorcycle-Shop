const Category = require("../models/category.model");
const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");

const categoryController = {
  async addCategory(req, res, next) {
    try {
      const { categoryName } = req.body;

      const category = await Category.findOne({ name: categoryName });

      if (category) {
        throw new ApiError(
          "This category already exists",
          httpStatus.NOT_ACCEPTABLE
        );
      }
      const newCategory = new Category({
        name: categoryName,
      });

      await newCategory.save();
      res.json(newCategory);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },

  async getCategory(req, res, next) {
    try {
      const id = req.params.id;

      const category = await category.findById(id);
      if (!category) {
        throw new ApiError("Category not found", httpStatus.NOT_FOUND);
      }

      res.json(category);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },

  async deleteCategory(req, res, next) {
    try {
      const id = req.params.id;

      const category = await Category.findByIdAndRemove(id);
      if (!category) {
        throw new ApiError("Category not found", httpStatus.NOT_FOUND);
      }

      res.json(category);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const query = req.query;
      const limit = query.limit ? query.limit : 9999;
      const sortBy = query.sortBy ? query.sortBy : "_id";
      const order = query.order ? query.order : "asc";

      const categories = await Category.find({})
        .sort([[sortBy, order]])
        .limit(limit);

      if (!categories) {
        throw new ApiError("Categories not found", httpStatus.NOT_FOUND);
      }
      res.json(categories);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = categoryController;
