const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: { type: String },
    name: { type: String, required: true },
    mobileNo: { type: String, required: true },
    emailId: { type: String, required: true },
    item: { type: String },
    address:{type: String, required: true},
    city: { type: String },
    state: { type: String },
    country: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    relationToUser:{type: String},
    isSubUser:{type: Boolean ,default : false},
    balanceAmount: { type: Number, default: 0 }
},
{
    collection: "User",
});

module.exports = mongoose.model('User', userSchema);