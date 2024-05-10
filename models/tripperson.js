const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trippersonSchema = new Schema(
  {
    name:{type: String},
    phone: { type: Number },
    tripId: { type: Schema.Types.ObjectId, ref: "Trips" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    amount:{ type: Number , default:0 }
  },
  {
    collection: "Tripperson",
  }
);

module.exports = mongoose.model("Tripperson", trippersonSchema);
