const express = require('express')
const router = express.Router();
const UserController = require("../controllers/user-controller")
const {auth} = require("../middleware/auth")


router.post("/signup", UserController.signup);

router.post("/signin", UserController.signin);

// router.use("/user-api");
module.exports = router;