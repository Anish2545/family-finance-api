const express = require( 'express' );
const app=express();
const {connectToMongoDB}=require('./database/connect')
require('dotenv').config()
const port =5000;

async function startApp() {
    try {
        await connectToMongoDB(process.env.MONGO_URI);
        app.listen(3000,console.log("Server Running"));
    } catch (error) {
        console.error('Error starting the app:', error);
    }
}

startApp();