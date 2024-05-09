const User = require('../models/User');
const MonthlyBalance = require('../models/monthlyBalance')

const {
    genResFormat,
    genResWithObjectFormat,
    generalListData,
  } = require("../custom_modules/util");


exports.getOverallBalance = async(req,res)=>{
    const {userId} = req.user;
    const user = await User.findOne({ _id:userId }, {balanceAmount:1});
    if (!user) {
        genResFormat(res, false, "User not found");
        return;
    }
    genResWithObjectFormat(res, true, "Balance Amount.", user);
}

exports.getMonthlyBalance = async(req,res)=>{
    const { month,year } = req.body;
    const monthlyBalance = await MonthlyBalance.findOne({ month, year },{balance:1,
        income:1,
        expense:1
    });

    if (!monthlyBalance) {
        genResFormat(res, false, "User not found");
        return;
    }
    genResWithObjectFormat(res, true, "Balance Amount.", monthlyBalance);
}

// exports.getMonthlyIncome = async(req,res)=>{
//     const { month,year } = req.body;
//     const monthlyIncome = await MonthlyBalance.findOne({ month, year },{income:1});

//     if (!monthlyIncome) {
//         genResFormat(res, false, "User not found");
//         return;
//     }
//     genResWithObjectFormat(res, true, "Balance Amount.", monthlyIncome);
// }

// exports.getMonthlyExpense = async(req,res)=>{
//     const { month,year } = req.body;
//     const monthlyExpense = await MonthlyBalance.findOne({ month, year },{expense:1});

//     if (!monthlyExpense) {
//         genResFormat(res, false, "User not found");
//         return;
//     }
//     genResWithObjectFormat(res, true, "Balance Amount.", monthlyExpense);
// }

