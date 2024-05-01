const express = require("express");
const router = express.Router();
const {
  addTripExpense,
  getTripExpenseList,
} = require("../controllers/tripexpense-controller");
const auth = require("../middleware/admin_auth");

router.post("/addtripexpense", auth, addTripExpense);
router.post("/gettriplistexpense/:id", auth, getTripExpenseList);

module.exports = router;
