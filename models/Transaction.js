const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transactionDate: { type : Date , required: true,default: () => Date.now()}, 
    amount: { type : Number , unique : false } ,
    expenseCategory: { type : String , unique : false , required:true} ,
    isIncome: { type : String} ,
    userId:{type: Schema.Types.ObjectId, ref: 'User'}

},
{
    collection: "trasnsaction",
}
);

module.exports = mongoose.model("Transaction", transactionSchema);
