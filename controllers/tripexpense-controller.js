const tripexpense = require("../models/TripExpense");
const trip = require("../models/Trips")

const {
  genResFormat,
  genResWithObjectFormat,
  generalListData,
} = require("../custom_modules/util");

exports.addTripExpense = async (req, res) => {
  const { userId } = req.user;
  const { amount, description, tripId } = req.body;
  const resp = await tripexpense.create({
    amount: amount,
    description: description,
    tripId: tripId,
    user: userId,
  });

  const expenseList = await tripexpense.find(
    { tripId: tripId },
    {
      amount: 1
    }
  );

  let totalAmount = 0;
  expenseList.forEach(x => {
    totalAmount += x.amount;
  })

  await trip.findByIdAndUpdate(
    tripId,
    { totalAmount:totalAmount }
  )

  genResWithObjectFormat(res, true, "Expense Added Successfully.", {
    tripexpenseId: resp._id,
  });
};

exports.getTripExpenseList = async (req, res) => {
  const { tripId } = req.params;
  const expense = await tripexpense.find(
    { tripId: tripId },
    {
      amount: 1,
      description: 1,
    }
  );
  if (!expense) {
    genResFormat(res, false, "Expense not found");
    return;
  }
  genResWithObjectFormat(res, true, "Trip Expense", expense);
};