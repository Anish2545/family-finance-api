const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    mobileNo: { type: String, required: true },
    emailId: { type: String, required: true },
    item: { type: String, required: true },
    address:{type: String, required: true},
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: String, default: 0.0 },
    longitude: { type: String, default: 0.0 },
    relationToUser:{type: String, required: true},
    isSubUser:{type: Boolean ,default : false},
    balanceAmount: { type: Number, default: 0 }


});

module.exports = mongoose.model('User', userSchema);