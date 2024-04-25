const Transaction = require("../models/Transaction");
// const capacity = require("../../models/seller/capacity");
const {
  genResFormat,
  genResWithObjectFormat,generalListData
} = require("../custom_modules/util");

// exports.addProduct = async (req, res) => {
//   const product = await Products.create(req.body);
//   console.log(req.body);
//   res.status(201).json({ product });
// };

exports.addTransaction = async (req, res) => {
  const { isIncome, transactionDate, amount, expenseCategory } = req.body;

  const resp = await Transaction.create({
    isIncome: isIncome,
    transactionDate: transactionDate,
    amount: amount,
    expenseCategory: expenseCategory
  });

  genResWithObjectFormat(res, true, "Transaction Added Successfully.", {
    transactionId: resp._id,
  });
};

exports.getTransaction = async (req, res) => {
  const id = req.query;
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
  let globalFilter;
  //= { id:userId };

  const count = await Transaction.countDocuments(globalFilter);

  const listtransactions = await Transaction.find(globalFilter)
  .sort({ transactionDate: -1 })
  .skip(first)
  .limit(rows)
  .exec();

  let transactionList = [];

  listtransactions.forEach((element) => {
    transactionList.push({
      _id: element._id || "",
      transactionDate: element.transactionDate || "",
      amount: element.amount || "",
      expenseCategory: element.expenseCategory || "",
      isIncome: element.isIncome || "",
    });
  });

  console.log(transactionList)

  generalListData(res, count, transactionList);
}

// exports.getNotificationsForCustomer = async (req, res) => {
//   const first = parseInt(req.body.first) || 0;
//   const rows = parseInt(req.body.rows) || 10;
//   const { customerId } = req.user;

//   let globalFilter = { customer: customerId };

//   const count = await Notification.countDocuments(globalFilter);

//   const notifications = await Notification.find(globalFilter)
//     .sort({ createdAt: -1 })
//     .skip(first)
//     .limit(rows)
//     .exec();

//   let notificationList = [];

//   notifications.forEach((element) => {
//     notificationList.push({
//       _id: element._id || "",
//       title: element.title || "",
//       message: element.message || "",
//       image: element.image || "",
//       createdAt: element.createdAt || "",
//     });
//   });

//   generalListData(res, count, notificationList);
// };

exports.getTransactionById = async (req, res) => {
  const id = req.query;
  const Transaction = await transaction.findById({
    _id: id,
  });
  if (!Transaction) {
    genResFormat(res, false, "Transaction not found");
    return;
  }
  genResWithObjectFormat(res, true, "Transaction Data.", Transaction);
};

