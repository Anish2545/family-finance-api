const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    expenseSplitterId: { type: String },
    title: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now() },
    totalAmount: { type: Number },
    noOfUser: { type: Number },
    phone: { type: Number },
    isSettlementDone: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    userIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    settlements: [
      {
        from: { type: Schema.Types.ObjectId, ref: "User" },
        to: { type: Schema.Types.ObjectId, ref: "User" },
        amount: { type: Number },
      },
    ],
    userContributions: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        amount: { type: Number },
      },
    ],
  },
  {
    collection: "trips",
  }
);

module.exports = mongoose.model("Trips", tripSchema);
