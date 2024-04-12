const express = require('express');
const app = express();
const { connectToMongoDB } = require('./database/connect')
require('dotenv').config()
require('./startup/routes')(app);
const port = 3000;

app.get("/familyfinance", (req, res) => {
    res.status(200).send("API Working");
});

async function startApp() {
    try {
        await connectToMongoDB(process.env.MONGO_URI);
        app.listen(3000, () => {
            console.log(`server is listening to port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the app:', error);
    }
}

startApp();