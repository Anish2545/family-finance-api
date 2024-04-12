const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const budgetAlertSchema = new Schema({
    budgetAlertId:{type: String, required: true},  
    month: { type : Number , unique : false } ,
    yearear: { type : Number , unique : false} ,
    amount: { type : Number , required: true },
    userId:{type:String,required:true}
},
{
    collection: "BudgetAlerts",
});

module.exports = mongoose.model('BudgetAlerts', budgetAlertSchema);