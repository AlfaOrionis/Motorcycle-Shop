const { authService } = require("../services");

const authController = {
  async userRegister(req, res, next) {
    const user = await authService.createUser(req.newuser);
  },
};

module.exports = authController;
