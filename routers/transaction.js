const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransaction,
  getTransactionById,
  getTransactionListData,
  deleteTransaction,
  getIncome
} = require("../controllers/transaction-controller");
const auth = require("../middleware/admin_auth")
// const productId = require("../../middlewares/product");

router.get("/transaction:id", auth, getTransactionById);
router.get("/transaction", auth, getTransaction);
router.post("/addtransaction", auth, addTransaction);
router.post("/transactionlist", auth, getTransactionListData);
router.delete("/transactionlist/:transactionId",auth,deleteTransaction);
router.post("/getIncome", auth, getIncome);


module.exports = router;