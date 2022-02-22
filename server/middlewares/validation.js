const { check, validationResult } = require("express-validator");
const httpStatus = require("http-status");

const addProductValidator = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("You need to add a name")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 character required !")
    .bail(),
  check("brand").trim().not().isEmpty().withMessage("You need to add a brand"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

const addPasswordValidator = [
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("You need password")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 characters!")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        //so at this point i had to adjust the structure of response, so i can extract the message in the same way as from the other errors, otherwise i would have to vary it in the front end,
        message: errors.errors[0].msg,
        param: errors.errors[0].param,
      });
    }
    next();
  },
];

module.exports = {
  addProductValidator,
  addPasswordValidator,
};
