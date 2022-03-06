const { siteService } = require("../services");

const siteController = {
  async updateSite(req, res, next) {
    try {
      const updatedSite = await siteService.updateSite(req);

      res.json(updatedSite);
    } catch (err) {
      next(err);
    }
  },

  async getSite(req, res, next) {
    try {
      const site = await siteService.getSite();

      res.json(site);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = siteController;
