const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const expenseSplitterUserSchema = new Schema({
    userId: { type: String, required: true }, 
    expenseAmount: {type : Number ,required:true},
    dueAmount: {type :Number}
},
{
    collection: "expenseSplitterUser",
});

module.exports = mongoose.model('ExpenseSplitterUser', expenseSplitterUserSchema);