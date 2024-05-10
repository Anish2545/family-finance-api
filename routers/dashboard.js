const express = require('express');
const router = express.Router();
const {
    getOverallBalance,
    getMonthlyBalance,
    getMonthlyIncome,
    getMonthlyExpense
}=require('../controllers/dashboard-controller')

const auth= require ('../middleware/admin_auth');

router.get("/getoverallbalance",auth,getOverallBalance);
router.post("/getmonthlybalance",auth,getMonthlyBalance);
// router.get("/getmonthlyincome",auth,getMonthlyIncome);
// router.get("/getmonthlyexpense",auth,getMonthlyExpense);

module.exports=router;