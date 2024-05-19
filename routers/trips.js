const express = require("express");
const router = express.Router();
const {
  addTrip,
  getTripListData,
  addTripPeople,
  getTripPeopleList,
  splitAmount,
  fetchSettlementList,
  getUserContributions,
} = require("../controllers/trips-contoller");
const auth = require("../middleware/admin_auth");

router.post("/addtrip", auth, addTrip);
router.post("/gettriplist", auth, getTripListData);
router.post("/addtrippeople", auth, addTripPeople);
router.get("/gettrippeoplelist/:tripId", auth, getTripPeopleList);
router.get("/split-amount/:tripId", auth, splitAmount);
router.get("/fetch-settlement-list/:tripId", auth, fetchSettlementList);
router.get("/get-user-contributions/:tripId", auth, getUserContributions);

module.exports = router;
