const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransaction,
  getTransactionById,
  getTransactionListData
} = require("../../controllers/transaction-controller");
// const productId = require("../../middlewares/product");

router.get("/transaction:id", getTransactionById);
router.get("/transaction", getTransaction);
router.post("/addtransaction", addTransaction);
router.get("/transactionlist", getTransactionListData);

module.exports = router;