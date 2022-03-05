const { Site } = require("../models/site.model");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

const notFoundErr = new ApiError("Site not found", httpStatus.NOT_FOUND);

const getSite = async () => {
  try {
    const site = await Site.find({});

    if (!site) {
      throw notFoundErr;
    }

    return site[0];
  } catch (err) {
    throw err;
  }
};

const updateSite = async (req) => {
  try {
    const site = await Site.findOneAndUpdate(
      {},
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!site) {
      throw notFoundErr;
    }

    return site;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  updateSite,
  getSite,
};
