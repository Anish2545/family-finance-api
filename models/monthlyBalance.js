const mongoose = require("mongoose");

const monthlyBalanceSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
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

// Define the model
const MonthlyBalance = mongoose.model("MonthlyBalance", monthlyBalanceSchema);
