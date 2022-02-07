const User = require("../models/user.model");

const createUser = (req, res, next) => {
  const newUser = {
    email: req.email,
    password: req.password,
  };

  User.save(newUser);
};

module.exports = {
  createUser,
};
