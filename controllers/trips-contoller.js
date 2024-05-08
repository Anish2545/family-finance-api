const trip = require("../models/Trips");
const tripexpense = require("../models/TripExpense");
const {
  genResFormat,
  genResWithObjectFormat,
  generalListData,
} = require("../custom_modules/util");
const tripperson = require("../models/tripperson");

exports.addTrip = async (req, res) => {
  const { title, date, tripid } = req.body;

  const resp = await trip.create({
    title: title,
    date: date,
    tripid: tripid,
  });

  genResWithObjectFormat(res, true, "Trip Added Successfully.", {
    tripId: resp._id,
  });
};

exports.getTripListData = async (req, res) => {
  const first = parseInt(req.body.first) || 0;
  const rows = parseInt(req.body.rows) || 10;
  const { tripid } = req.user;
  let globalFilter;
  //= { id:userId };

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
      // Fetch expenses associated with the trip
      const expenseList = await tripexpense.find({ tripId: element._id });

      // Calculate totalAmount for the trip
      let totalAmount = 0;
      expenseList.forEach((expense) => {
        totalAmount += expense.amount;
      });

      // Push trip details along with totalAmount to tripList array
      tripList.push({
        _id: element._id || "",
        title: element.title || "",
        date: element.date || "",
        totalAmount: totalAmount, // Add totalAmount property
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

  const {userId} = req.user;
  const { phone, tripId } = req.body;

  const resp = await tripperson.create({
    phone: phone,
    userId: userId,
    tripId: tripId,
  });

  genResWithObjectFormat(res, true, "Person Added Successfully.", {
    person: resp._id,
  });
};

exports.getTripPeopleList = async (req, res) => {
  const { tripId } = req.params;
  const people = await tripperson.find(
    { tripId: tripId },
    {
      phone: 1,
    }
  );
  if (!people) {
    genResFormat(res, false, "No People");
    return;
  }
  genResWithObjectFormat(res, true, "People", people);
};



// exports.getTripListData = async (req, res) => {
//   const first = parseInt(req.body.first) || 0;
//   const rows = parseInt(req.body.rows) || 10;
//   const { tripid } = req.user;
//   let globalFilter;
//   //= { id:userId };

//   const count = await trip.countDocuments(globalFilter);

//   const listtrips = await trip
//     .find(globalFilter)
//     .sort({ date: -1 })
//     .skip(first)
//     .limit(rows)
//     .exec();

//   let tripList = [];

//   listtrips.forEach((element) => {
//     tripList.push({
//       _id: element._id || "",
//       title: element.title || "",
//       date: element.date || "",
//     });
//   });

//   console.log(tripList);

//   generalListData(res, count, tripList);
// };
