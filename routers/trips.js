const express = require("express");
const router = express.Router();
const {
  addTrip,
  getTripListData,
} = require("../controllers/trips-contoller");
const auth = require("../middleware/admin_auth");

router.post("/addtrip", auth, addTrip);
router.post("/gettriplist", auth, getTripListData);

module.exports = router;
