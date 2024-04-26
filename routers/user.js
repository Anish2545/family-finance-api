const express = require('express')
const router = express.Router();
const { getProfile,
    updateProfile,
    signin,
    signup,
    checkMobileNo } = require("../controllers/user-controller")
const auth = require("../middleware/admin_auth")


router.get("/profile", auth, getProfile);

router.post("/updateprofile", auth, updateProfile);

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/check-mobile-no", checkMobileNo);


// router.use("/user-api");
module.exports = router;