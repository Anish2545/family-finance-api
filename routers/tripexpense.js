const express = require("express");
const router = express.Router();
const {
  addTripExpense,
  getTripExpenseList,
} = require("../controllers/tripexpense-controller");
const auth = require("../middleware/admin_auth");

router.post("/addtripexpense", auth, addTripExpense);
router.get("/gettriplistexpense/:tripId", auth, getTripExpenseList);

module.exports = router;
