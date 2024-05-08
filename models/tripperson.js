const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const trippersonSchema = new Schema({
    phone: { type : Number } ,
    tripId: { type: Schema.Types.ObjectId, ref: 'Trips' },
    userId:{ type: Schema.Types.ObjectId, ref: 'User' },
},
{
    collection: "Tripperson",
});

module.exports = mongoose.model('Tripperson', trippersonSchema);