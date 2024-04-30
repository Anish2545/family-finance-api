const trip = require("../models/TripExpense");
const {
  genResFormat,
  genResWithObjectFormat,
  generalListData,
} = require("../custom_modules/util");

exports.addTrip = async (req, res) => {
  const { title, date } = req.body;

  const resp = await trip.create({
    title: title,
    date: date,
  });

  genResWithObjectFormat(res, true, "Transaction Added Successfully.", {
    tripId: resp._id,
  });
};

exports.getTripListData = async (req, res) => {
    const first = parseInt(req.body.first) || 0;
    const rows = parseInt(req.body.rows) || 10;
    const { userId } = req.user;
    let globalFilter;
    //= { id:userId };
  
    const count = await trip.countDocuments(globalFilter);
  
    const listtrips = await trip.find(globalFilter)
    .sort({ date: -1 })
    .skip(first)
    .limit(rows)
    .exec();
  
    let tripList = [];
  
    listtrips.forEach((element) => {
      tripList.push({
        _id: element._id || "",
        title: element.title || "",
        date: element.date || "",
      });
    });
  
    console.log(tripList)
  
    generalListData(res, count, tripList);
  }