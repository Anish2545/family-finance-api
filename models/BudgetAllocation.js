const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const budgetAllocationSchema = new Schema({
    entryDate:{type: Date, required: true,default:Date.now()},  
    budgetAllocationId: { type : String , unique : false }, 
    month: { type : Number , unique : false } ,
    year: { type : Number , unique : false} ,
    amount: { type : Number , required: true },
    givenByUserId:{type:String,required:true}
},
{
    collection: "BudgetAllocation",
});

module.exports = mongoose.model('BudgetAllocation', budgetAllocationSchema);