const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const authSchema = new Schema({
    id_token: { type: String },
    number: { type: String, required: true, unique: true },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
},
{
    collection: "authentication",
}
);

module.exports = mongoose.model('Authentication', authSchema);