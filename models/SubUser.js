const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subuserSchema = new Schema(
  {
    name: { type: String, required: true },
    relationToUser: { type: String, required: true },
    mobileNo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    mainUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "subUser",
  }
);

module.exports = mongoose.model("Sub User", subuserSchema);
