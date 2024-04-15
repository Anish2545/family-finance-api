const express = require("express")
const router = express.Router();

const userRoute = require("../routers/user/user");
const transactionRoute = require("../routers/user/transaction");

router.use("/",userRoute);
router.use("/",transactionRoute);

module.exports = router;
