const Transaction = require("../models/Transaction");
const MonthlyBalance = require("../models/monthlyBalance");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// const capacity = require("../../models/seller/capacity");
const {
  genResFormat,
  genResWithObjectFormat,
  generalListData,
} = require("../custom_modules/util");

// exports.addProduct = async (req, res) => {
//   const product = await Products.create(req.body);
//   console.log(req.body);
//   res.status(201).json({ product });
// };

exports.addTransaction = async (req, res) => {
  const { userId } = req.user;
  const { isIncome, transactionDate, amount, expenseCategory } = req.body;

  const resp = await Transaction.create({
    isIncome: isIncome,
    transactionDate: transactionDate,
    amount: amount,
    expenseCategory: expenseCategory,
    userId: userId,
  });

  genResWithObjectFormat(res, true, "Transaction Added Successfully.", {
    transactionId: resp._id,
  });

  const { month, year } = getMonthAndYear(transactionDate);

  calculateMonthlySummary(userId, month, year);
};

exports.getTransaction = async (req, res) => {
  const { userId } = req.user;
  const transactions = await transaction.find({ userId: id });
  if (!transactions) {
    genResFormat(res, false, "Transaction Data not found");
    return;
  }
  genResWithObjectFormat(res, true, "Transaction Data.", transactions);
};

exports.getTransactionListData = async (req, res) => {
  const first = parseInt(req.body.first) || 0;
  const rows = parseInt(req.body.rows) || 10;
  const { userId } = req.user;
  let globalFilter = { userId: userId };

  try {
    const count = await Transaction.countDocuments(globalFilter);

    const listtransactions = await Transaction.find(globalFilter)
      .sort({ transactionDate: -1 })
      .skip(first)
      .limit(rows)
      .exec();

    let transactionList = [];

    for (let element of listtransactions) {
      // Fetch expenses associated with the trip
      const income = await Transaction.find({ isIncome: "income" });

      // Calculate totalAmount for the trip
      let totalincome = 0;
      income.forEach((Income) => {
        totalincome += Income.amount;
      });

      const expenses = await Transaction.find({ isIncome: "expense" });

      let totalexpense = 0;
      expenses.forEach((Expense) => {
        totalexpense += Expense.amount;
      });

      let balance = totalincome - totalexpense;

      transactionList.push({
        _id: element._id || "",
        transactionDate: element.transactionDate || "",
        amount: element.amount || "",
        expenseCategory: element.expenseCategory || "",
        isIncome: element.isIncome || "",
        totalincome: totalincome,
        totalexpense: totalexpense,
        balance: balance,
      });
    }
    // Push trip details along with totalAmount to tripList array

    generalListData(res, count, transactionList);
  } catch (error) {
    res.status(500).json({ flag: false, message: "Internal server error" });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const { userId } = req.user;
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    genResFormat(res, false, "Transaction not found");
    return;
  }
  await Transaction.deleteOne({
    _id: transactionId,
  });

  genResFormat(res, true, "Transaction Deleted Successfully.");

  const { month, year } = getMonthAndYear(transaction.transactionDate);
  calculateMonthlySummary(userId, month, year);
};

exports.getTransactionById = async (req, res) => {
  const id = req.query;
  const Transaction = await Transaction.findById({
    _id: id,
  });
  if (!Transaction) {
    genResFormat(res, false, "Transaction not found");
    return;
  }
  genResWithObjectFormat(res, true, "Transaction Data.", Transaction);
};

exports.getIncome = async (req, res) => {
  try {
    const { userId } = req.user;
    const Income = await Transaction.find({
      userId: userId,
      isIncome: "income",
    });

    let totalincome = 0;
    Income.forEach((income) => {
      totalincome += income.amount;
    });
    genResWithObjectFormat(res, true, "Total income.", totalincome);
  } catch (error) {
    // Handle any errors
    console.error("Error in getBalance:", error);
    genResWithObjectFormat(
      res,
      false,
      "Error occurred while fetching balance."
    );
  }
};

async function calculateMonthlySummary(userId, month, year) {
  try {
    // Start and end dates for the given month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Aggregate transactions to calculate total income and expenses
    const transactions = await Transaction.aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
          transactionDate: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$isIncome", "income"] }, "$amount", 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$isIncome", "expense"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    const { totalIncome = 0, totalExpense = 0 } = transactions[0] || {};

    const balance = totalIncome - totalExpense;

    let monthName = getMonthName(month);
    // Update or create the monthly balance record
    await MonthlyBalance.findOneAndUpdate(
      { user: new ObjectId(userId), month: monthName, year },
      { income: totalIncome, expense: totalExpense, balance },
      { upsert: true, new: true }
    );

    console.log(
      `Monthly summary for ${month}/${year} has been calculated and stored.`
    );
  } catch (error) {
    console.error("Error calculating monthly summary:", error);
  }
}

function getMonthAndYear(date) {
  let d = new Date(date);
  const month = d.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const year = d.getFullYear();
  return { month, year };
}

function getMonthName(monthNumber) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[monthNumber - 1];
}
