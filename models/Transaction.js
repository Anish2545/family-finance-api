const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transactionDate: { type : Date , required: true,defaut:Date.now() }, 
    amount: { type : Number , unique : false } ,
    expenseCategory: { type : String , unique : false , required:true} ,
    isIncome: { type : String , default : false } ,
    userId:{type:String}

},
{
    collection: "trasnsaction",
});

module.exports = mongoose.model('Transaction', transactionSchema);