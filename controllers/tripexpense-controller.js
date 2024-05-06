const tripexpense = require("../models/TripExpense");
const trip = require("../models/Trips")

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

exports.deleteTripExpense = async(req,res) =>{
  const {tripexpenseId} = req.params;
  console.log(tripexpenseId);
  const expense = await tripexpense.findById(tripexpenseId)
  if(!expense){
    genResFormat(res, false, "Expense not found");
    return;
  }
  await tripexpense.deleteOne({
    _id: tripexpenseId,
  })
  genResFormat(res, true, "Expense Deleted Successfully.");
}