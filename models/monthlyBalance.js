const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthlyBalanceSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "monthlyBalance"},
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      default: 2024
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    expense: {
      type: Number,
      required: true,
      default: 0,
    },
    income: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: "monthlyBalance",
  }
);

module.exports = mongoose.model("MonthlyBalance", monthlyBalanceSchema);

