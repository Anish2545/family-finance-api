const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    entryDate:{type: Date, required: true,default: Date.now()},  
    transactionDate: { type : Date , required: true,defaut:Date.now() }, 
    amount: { type : Number , unique : false } ,
    expenseCategory: { type : String , unique : false , required:true} ,
    isIncome: { type : Boolean , default : false } ,
    userId:{type:String,required:true}

});

module.exports = mongoose.model('Transaction', transactionSchema);