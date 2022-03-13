const express = require("express");
const router = express.Router();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const brandRoute = require("./brand.route");
const productRoute = require("./product.route");
const siteRoutes = require("./site.route");
const orderRoutes = require("./order.route");
const categoriesRoute = require("./category.route");
const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/brands",
    route: brandRoute,
  },
  {
    path: "/categories",
    route: categoriesRoute,
  },
  {
    path: "/products",
    route: productRoute,
  },
  {
    path: "/site",
    route: siteRoutes,
  },
  {
    path: "/order",
    route: orderRoutes,
  },
];

routesIndex.forEach((route) => router.use(route.path, route.route));

module.exports = router;
