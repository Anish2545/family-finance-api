const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: { type: String },
    name: { type: String, required: true },
    mobileNo: { type: String, required: true },
    emailId: { type: String },
    item: { type: String },
    address:{type: String},
    city: { type: String },
    state: { type: String },
    country: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    isSubUser:{type: Boolean ,default : false},
    balanceAmount: { type: Number, default: 0 }
},
{
    collection: "user",
});

module.exports = mongoose.model('user', userSchema);