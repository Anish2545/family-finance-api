const express = require("express");
const cors = require("cors");
const userAppRoute = require("../routers/user");
const errorHandler = require("../middleware/error-handler");
const notFound = require("../middleware/not-found");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/familyfinance/user-api", userAppRoute);
  app.use(errorHandler);
  app.use(notFound);
};