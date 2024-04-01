const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId:{type: String, required: true},  
    message: { type : String , required: true }, 
    image: {
        url: { type: String }, // URL of the image
        altText: { type: String }, // Alt text for accessibility
    },
});

module.exports = mongoose.model('Notification', notificationSchema);