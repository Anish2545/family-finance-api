const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const expenseSplitterSchema = new Schema({
    expenseSplitterId: { type: String, required: true }, 
    title: { type: String, required: true},  
    date: {type: Date, required: true,default:Date.now()},
    expenseAmount: { type: Number, required: true } ,
    totalUser: { type: Number, required: true} ,
    isSettlementDone: { type : Boolean, default: false }
},
{
    collection: "ExpenseSplitter",
});

module.exports = mongoose.model('ExpenseSplitter', expenseSplitterSchema);