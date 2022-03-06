const passport = require("passport");
const { ApiError } = require("./apiError");
const httpStatus = require("http-status");
const roles = require("../config/roles");

const verify = (req, res, resolve, reject, rights) => async (err, user) => {
  if (err || !user) {
    return reject(new ApiError("Unauthorized", httpStatus.UNAUTHORIZED));
  }

  if (rights) {
    const action = rights[0];
    const resource = rights[1];

    const permission = roles.can(user.role)[action](resource);
    console.log(permission.granted);
    if (!permission.granted) {
      return reject(
        new ApiError("U dont have enought rights", httpStatus.FORBIDDEN)
      );
    }

    res.locals.permission = permission;
  }

  //const filteredUser = permission.filter(user._doc);

  req.user = user;
  resolve();
};

const auth = (rights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verify(req, res, resolve, reject, rights)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
