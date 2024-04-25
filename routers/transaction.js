const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransaction,
  getTransactionById,
  getTransactionListData
} = require("../controllers/transaction-controller");
const auth = require("../middleware/admin_auth")
// const productId = require("../../middlewares/product");

router.get("/transaction:id", auth, getTransactionById);
router.get("/transaction", auth, getTransaction);
router.post("/addtransaction", auth, addTransaction);
router.post("/transactionlist", auth, getTransactionListData);

module.exports = router;