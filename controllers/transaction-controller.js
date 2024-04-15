const transaction = require("../models/Transaction");
// const capacity = require("../../models/seller/capacity");
const {
  genResFormat,
  genResWithObjectFormat,
} = require("../custom_modules/util");

// exports.addProduct = async (req, res) => {
//   const product = await Products.create(req.body);
//   console.log(req.body);
//   res.status(201).json({ product });
// };

exports.addTransaction = async (req, res) => {
  const { isIncome, transactionDate, amount, expenseCategory,userId } = req.body;

  const resp = await transaction.create({
    isIncome: isIncome,
    transactionDate: transactionDate,
    amount: amount,
    expenseCategory: expenseCategory,
    userId : userId
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

exports.getTransactionListData = async (req,res)=>{
    const listtransactions =  await transaction.find({ userId:id },{
        transactionDate:1,
        amount:1,
        expenseCategory:1,
        isIncome:1
    });
    genResWithObjectFormat(res,true,"Transaction Data",listtransactions)
}

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

