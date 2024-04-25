const express = require('express');
const router = express.Router();
const{
    addSubUser,
    getSubUserListData
}=require('../controllers/subuser-controller');
const auth= require ('../middleware/admin_auth');

router.post("/addsubuser",auth,addSubUser);
router.post("/getsubuserlist",auth,getSubUserListData);

module.exports=router;