const express = require( 'express' );
const app=express();
const {connectToMongoDB}=require('./database/connect')
const port =5000;

async function startApp() {
    try {
        await connectToMongoDB();
        console.log("Connected to MongoDB");
        // Now you can define your Mongoose models and perform CRUD operations
        // Example: const User = mongoose.model('User', userSchema);
        // ...

        // Your application logic goes here

        // Don't forget to close the connection when done (if needed)
        // mongoose.connection.close();
    } catch (error) {
        console.error('Error starting the app:', error);
    }
}

startApp();