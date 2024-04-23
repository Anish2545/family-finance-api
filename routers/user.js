const express = require('express')
const router = express.Router();
const {getProfile,
updateProfile,
signin,
signup,
checkMobileNo} = require("../controllers/user-controller")
const {auth} = require("../middleware/auth")


router.get("/profile", getProfile);

router.put("/profile/:id",updateProfile);

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/check-mobile-no", checkMobileNo);


// router.use("/user-api");
module.exports = router;