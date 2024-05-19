const User = require("../models/User");
const MonthlyBalance = require("../models/monthlyBalance");

const {
  genResFormat,
  genResWithObjectFormat,
  generalListData,
} = require("../custom_modules/util");

exports.getOverallBalance = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId }, { balanceAmount: 1 });
  if (!user) {
    genResFormat(res, false, "User not found");
    return;
  }
  genResWithObjectFormat(res, true, "Balance Amount.", user);
};

exports.getMonthlyBalance = async (req, res) => {
  const { userId } = req.user;
  const { month, year } = req.body;

  // Validate incoming data
  if (!month || !year) {
    return genResFormat(res, false, "Month and year are required");
  }

  try {
    // Find the monthly balance record for the given month and year
    const monthlyBalance = await MonthlyBalance.findOne(
      { user: userId, month: month, year: year },
      { balance: 1, expense: 1, income: 1 } // Include expense and income fields
    );

    if (!monthlyBalance) {
      return genResFormat(res, false, "Monthly balance not found");
    }

    // Return the monthly balance data
    genResWithObjectFormat(res, true, "Monthly balance data", monthlyBalance);
  } catch (error) {
    console.error("Error fetching monthly balance:", error);
    genResFormat(res, false, "Error fetching monthly balance");
  }
};

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
