const tripexpense = require("../models/TripExpense");
const trip = require("../models/Trips");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {
  genResFormat,
  genResWithObjectFormat,
  generalListData,
} = require("../custom_modules/util");

exports.addTripExpense = async (req, res) => {
  const { userId } = req.user;
  const { tripId, amount, description } = req.body;

  const resp = await tripexpense.create({
    amount: amount,
    description: description,
    trip: tripId,
    user: userId,
  });

  updateTotalAmountForTrip(tripId);

  calculateAndStoreUserContributions(tripId);

  genResWithObjectFormat(res, true, "Expense Added Successfully.", {
    tripexpenseId: resp._id,
  });
};

exports.getTripExpenseList = async (req, res) => {
  const { tripId } = req.params;
  const expense = await tripexpense.find(
    { trip: tripId },
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

exports.deleteTripExpense = async (req, res) => {
  const { tripexpenseId, tripId } = req.params;

  const expense = await tripexpense.findById(tripexpenseId);
  if (!expense) {
    genResFormat(res, false, "Expense not found");
    return;
  }
  await tripexpense.deleteOne({
    _id: tripexpenseId,
  });

  updateTotalAmountForTrip(tripId);

  calculateAndStoreUserContributions(tripId);

  genResFormat(res, true, "Expense Deleted Successfully.");
};

async function updateTotalAmountForTrip(tripId) {
  try {
    // Aggregate the total amount for the specified trip
    const result = await tripexpense.aggregate([
      { $match: { trip: new ObjectId(tripId) } }, // Match the specific tripId
      {
        $group: {
          _id: "$tripId",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Check if the aggregation result is not empty
    if (result.length > 0) {
      const totalAmount = result[0].totalAmount;

      // Update the totalAmount in the Trips model for the specified trip
      await trip.findByIdAndUpdate(tripId, { totalAmount: totalAmount });

      console.log(
        `Total amount for trip ${tripId} updated successfully to ${totalAmount}.`
      );
    } else {
      console.log(`No expenses found for trip ${tripId}.`);
    }
  } catch (error) {
    console.error("Error updating total amount for trip:", error);
  }
}

async function calculateAndStoreUserContributions(tripId) {
  try {
    // Fetch the trip details
    const tripO = await trip.findById(tripId).exec();
    if (!tripO) throw new Error("Trip not found");

    // Fetch the expenses for the trip
    const expenses = await tripexpense.find({ trip: tripId }).exec();

    // Calculate how much each user has paid
    const userContributions = {};
    expenses.forEach((expense) => {
      if (!userContributions[expense.user]) {
        userContributions[expense.user] = 0;
      }
      userContributions[expense.user] += expense.amount;
    });

    // Prepare the contributions array to store in the trip
    const contributions = Object.keys(userContributions).map((user) => ({
      user: new ObjectId(user),
      amount: userContributions[user],
    }));

    // Store the user contributions in the trip document
    tripO.userContributions = contributions;
    await tripO.save();

    console.log("User contributions calculated and saved:", contributions);
  } catch (error) {
    console.error("Error calculating user contributions:", error);
  }
}
