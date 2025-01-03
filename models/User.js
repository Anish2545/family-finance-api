const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    mobileNo: { type: String, required: true },
    emailId: { type: String },
    item: { type: String },
    occupation: { type: String },
    gender: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    relationToUser: { type: String },
    isSubUser: { type: Boolean, default: false },
    balanceAmount: { type: Number, default: 0 },
    expenseAmount: { type: Number, default: 0 },
    incomeAmount: { type: Number, default: 0 },
    mainUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model("User", userSchema);
