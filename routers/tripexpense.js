const express = require("express");
const router = express.Router();
const {
  addTripExpense,
  getTripExpenseList,
  deleteTripExpense
} = require("../controllers/tripexpense-controller");
const auth = require("../middleware/admin_auth");

router.post("/addtripexpense", auth, addTripExpense);
router.get("/gettriplistexpense/:tripId", auth, getTripExpenseList);
router.delete("/gettriplistexpense/:tripexpenseId",auth,deleteTripExpense)


module.exports = router;
