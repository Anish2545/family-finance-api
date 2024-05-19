const trip = require("../models/Trips");
const User = require("../models/User");
const tripexpense = require("../models/TripExpense");
const {
  genResFormat,
  genResWithObjectFormat,
  generalListData,
  genResWithDataArrayFormat,
} = require("../custom_modules/util");
const tripperson = require("../models/tripperson");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.addTrip = async (req, res) => {
  const { userId } = req.user;
  const { title, date, tripid } = req.body;

  const resp = await trip.create({
    title: title,
    date: date,
    tripid: tripid,
    user: userId,
    userIds: [new ObjectId(userId)],
  });

  genResWithObjectFormat(res, true, "Trip Added Successfully.", {
    tripId: resp._id,
  });
};

exports.getTripListData = async (req, res) => {
  const first = parseInt(req.body.first) || 0;
  const rows = parseInt(req.body.rows) || 10;
  const { userId } = req.user;
  // Convert userId to ObjectId if it's not already
  const userObjectId = new ObjectId(userId);

  let globalFilter = {
    $or: [{ user: userObjectId }, { userIds: userObjectId }],
  };

  try {
    // Get count of all trips
    const count = await trip.countDocuments(globalFilter);

    // Find trips with expenses and calculate totalAmount for each trip
    const listtrips = await trip
      .find(globalFilter)
      .sort({ date: -1 })
      .skip(first)
      .limit(rows)
      .exec();

    // Define an array to store trip details with totalAmount
    let tripList = [];

    // Iterate through each trip
    for (let element of listtrips) {
      // Push trip details along with totalAmount to tripList array
      tripList.push({
        _id: element._id || "",
        title: element.title || "",
        date: element.date || "",
        totalAmount: element.totalAmount, // Add totalAmount property
      });
    }

    // Send the list of trips with totalAmount to the client
    generalListData(res, count, tripList);
  } catch (error) {
    console.error("Error fetching trip list:", error);
    res.status(500).json({ flag: false, message: "Internal server error" });
  }
};

exports.addTripPeople = async (req, res) => {
  const { userId } = req.user;
  const { phone, tripId, name } = req.body;

  const user = await User.findOne({ mobileNo: phone });

  const resp = await tripperson.create({
    name: name,
    phone: phone,
    userId: user._id,
    tripId: tripId,
  });

  // Add the user ID to the userIds array
  await trip.findByIdAndUpdate(tripId, {
    $addToSet: { userIds: new ObjectId(user._id) },
  });

  updateNoOfUsersForTrip(tripId);

  genResWithObjectFormat(res, true, "Person Added Successfully.", {
    person: resp._id,
  });
};

exports.getTripPeopleList = async (req, res) => {
  const { tripId } = req.params;
  const people = await tripperson.find(
    { tripId: tripId },
    {
      name: 1,
      phone: 1,
      amount: 1,
    }
  );

  if (!people) {
    genResFormat(res, false, "No People");
    return;
  }

  genResWithObjectFormat(res, true, "People", people);
};

exports.splitAmount = async (req, res) => {
  const { tripId } = req.params;
  // Fetch the trip details
  const tripO = await trip.findById(tripId).exec();
  if (!tripO) throw new Error("Trip not found");

  const { totalAmount, noOfUser } = tripO;
  const splitAmount = totalAmount / noOfUser;

  // Fetch the expenses for the trip
  const expenses = await tripexpense.find({ trip: tripId }).exec();

  // Calculate how much each user has paid
  const userExpenses = {};
  expenses.forEach((expense) => {
    if (!userExpenses[expense.user]) {
      userExpenses[expense.user] = 0;
    }
    userExpenses[expense.user] += expense.amount;
  });

  // Calculate the amount each user should pay or receive
  const userBalances = {};
  const users = Object.keys(userExpenses);
  users.forEach((user) => {
    userBalances[user] = userExpenses[user] - splitAmount;
  });

  // Determine the transactions needed to settle debts
  const transactions = [];
  const payers = Object.keys(userBalances).filter(
    (user) => userBalances[user] < 0
  );
  const receivers = Object.keys(userBalances).filter(
    (user) => userBalances[user] > 0
  );

  payers.forEach((payer) => {
    while (userBalances[payer] < 0) {
      for (let i = 0; i < receivers.length; i++) {
        const receiver = receivers[i];
        if (userBalances[receiver] > 0) {
          const amount = Math.min(
            Math.abs(userBalances[payer]),
            userBalances[receiver]
          );
          transactions.push({
            from: payer,
            to: receiver,
            amount,
          });
          userBalances[payer] += amount;
          userBalances[receiver] -= amount;
          if (userBalances[receiver] <= 0) break;
        }
      }
    }
  });

  // Store the settlement details in the trip document
  tripO.isSettlementDone = true;
  tripO.settlements = transactions;
  await tripO.save();

  genResFormat(res, true, "Amount Splitted Successfully");
};

exports.fetchSettlementList = async (req, res) => {
  const { tripId } = req.params;

  // Fetch the trip with settlements
  const tripO = await trip
    .findById(tripId)
    .populate("settlements.from settlements.to")
    .exec();
  if (!tripO) throw new Error("Trip not found");

  // Map to store user details by user ID
  const userDetails = {};

  // Fetch user details for all users involved in settlements
  const userIds = [
    ...new Set([
      ...tripO.settlements.map((settlement) => settlement.from),
      ...tripO.settlements.map((settlement) => settlement.to),
    ]),
  ];

  // Fetch user details from TripPerson collection
  const users = await User.find({
    _id: { $in: userIds },
  }).exec();

  users.forEach((person) => {
    userDetails[person._id.toString()] = {
      name: person.name,
      mobileNo: person.mobileNo,
    };
  });

  // Prepare the settlement list with user details
  const settlementsWithDetails = tripO.settlements.map((settlement) => ({
    from: {
      userId: settlement.from._id,
      name: userDetails[settlement.from._id.toString()].name,
      mobileNo: userDetails[settlement.from._id.toString()].mobileNo,
    },
    to: {
      userId: settlement.to._id,
      name: userDetails[settlement.to._id.toString()].name,
      mobileNo: userDetails[settlement.to._id.toString()].mobileNo,
    },
    amount: settlement.amount,
  }));

  genResWithDataArrayFormat(res, true, "", settlementsWithDetails);
};

exports.getUserContributions = async (req, res) => {
  const { tripId } = req.params;
  // Fetch the trip with user contributions
  const tripO = await trip
    .findById(tripId)
    .populate("userContributions.user")
    .exec();
  if (!tripO) throw new Error("Trip not found");

  // Fetch user details for all users involved in contributions
  const userIds = tripO.userContributions.map(
    (contribution) => contribution.user._id
  );

  const users = await User.find({
    _id: { $in: userIds },
  }).exec();

  const userDetails = {};
  users.forEach((person) => {
    userDetails[person._id.toString()] = {
      name: person.name,
      phone: person.mobileNo,
    };
  });

  // Prepare the user contributions list with detailed user information
  const userContributionsWithDetails = tripO.userContributions.map(
    (contribution) => ({
      user: {
        userId: contribution.user._id,
        name: userDetails[contribution.user._id.toString()].name,
        phone: userDetails[contribution.user._id.toString()].phone,
      },
      amount: contribution.amount,
    })
  );

  genResWithDataArrayFormat(res, true, "", userContributionsWithDetails);
};

async function updateNoOfUsersForTrip(tripId) {
  try {
    // Fetch the specific trip
    const tripO = await trip.findById(tripId);

    if (!tripO) {
      console.error(`Trip with ID ${tripId} not found.`);
      return;
    }

    // Calculate the total number of users
    const totalUsers = tripO.userIds ? tripO.userIds.length : 0;

    // Update the noOfUser field in the trip
    tripO.noOfUser = totalUsers;
    await tripO.save();

    console.log(
      `Total number of users for trip ${tripId} updated to ${totalUsers}.`
    );
  } catch (error) {
    console.error("Error updating number of users for trip:", error);
  }
}
