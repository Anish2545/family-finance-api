const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subuserSchema = new Schema({
    name: { type: String, required: true },
    relationToUser:{type: String, required:true},
    mobileNo: { type: String, required: true },
},
{
    collection: "Sub-User"
})

module.exports = mongoose.model('Sub-User',subuserSchema)