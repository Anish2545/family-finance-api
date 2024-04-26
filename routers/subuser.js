const express = require('express');
const router = express.Router();
const{
    addSubUser,
    getSubUserListData,
    deleteSubUser
}=require('../controllers/subuser-controller');
const auth= require ('../middleware/admin_auth');

router.post("/addsubuser",auth,addSubUser);
router.post("/getsubuserlist",auth,getSubUserListData);
router.delete("/getsubuserlist/:subuserId",auth,deleteSubUser);

module.exports=router;