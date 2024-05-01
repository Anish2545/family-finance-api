const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tripexpenseSchema = new Schema({
    amount: { type : Number , required:true} ,
    description: { type : String , required:true} ,
    tripid: { type:String  }
},
{
    collection: "TripExpense",
});

module.exports = mongoose.model('TripExpense', tripexpenseSchema);