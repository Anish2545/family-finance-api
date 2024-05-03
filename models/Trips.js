const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    expenseSplitterId: { type: String },
    title: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now() },
    totalAmount: { type: Number },
    noOfUser: { type: Number },
    isSettlementDone: { type: Boolean, default: false },
  },
  {
    collection: "trips",
  }
);

module.exports = mongoose.model("Trips", tripSchema);
