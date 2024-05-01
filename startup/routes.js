const express = require("express");
const cors = require("cors");
const userAppRoute = require("../routers/user");
const transactionRoute = require("../routers/transaction");
const subuserRoute = require("../routers/subuser");
const tripexpenseRoute = require("../routers/trips");
const tripexpenseamountRoute = require("../routers/tripexpense");
const errorHandler = require("../middleware/error-handler");
const notFound = require("../middleware/not-found");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/user", userAppRoute);
  app.use("/transaction",transactionRoute);
  app.use("/subuser",subuserRoute);
  app.use("/tripexpense",tripexpenseRoute);
  app.use("/tripexpenseamount",tripexpenseamountRoute);
  app.use(errorHandler);
  app.use(notFound);
};