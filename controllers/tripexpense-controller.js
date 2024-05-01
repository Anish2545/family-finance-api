const tripexpense = require("../models/TripExpense");
const {
  genResFormat,
  genResWithObjectFormat,
  generalListData,
} = require("../custom_modules/util");

exports.addTripExpense = async (req, res) => {
  const { amount, description } = req.body;

  const resp = await tripexpense.create({
    amount: amount,
    description: description,
  });

  genResWithObjectFormat(res, true, "Expense Added Successfully.", {
    tripexpenseId: resp._id,
  });
};

exports.getTripExpenseList = async (req, res) => {
  const { tripid } = req.params;
  const expense = await tripexpense.findById(tripid, {
    amount: 1,
    description: 1,
  });
  if (!expense) {
    genResFormat(res, false, "Expense not found");
    return;
  }

  genResWithObjectFormat(res, true, "Trip Expense", expense);
};