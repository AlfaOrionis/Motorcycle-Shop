const { User } = require("../models/user.model");
require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const verify = async (jwt_payload, done) => {
  try {
    console.log(jwt_payload);
    const user = await User.findById(jwt_payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(options, verify);

module.exports = {
  jwtStrategy,
};
