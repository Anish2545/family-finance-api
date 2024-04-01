const mongoose = require('mongoose');
const uri ="mongodb+srv://sopariwalaanish:yz30fdvMbxZcRXt5@familyfinance.qbwamem.mongodb.net/?retryWrites=true&w=majority&appName=FamilyFinance";


async function connectToMongoDB() {
    try {
        await mongoose.connect(uri, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true, // Recommended for unique indexes
            //useFindAndModify: false, // Disable deprecated methods
        });

        console.log('Connected to MongoDB using Mongoose!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { connectToMongoDB };

