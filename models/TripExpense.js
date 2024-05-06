const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tripexpenseSchema = new Schema({
    amount: { type : Number } ,
    description: { type : String } ,
    tripId: { type: Schema.Types.ObjectId, ref: 'Trips'  },
    user:{ type: Schema.Types.ObjectId, ref: 'User' },
    
},
{
    collection: "tripExpense",
});

module.exports = mongoose.model('TripExpense', tripexpenseSchema);