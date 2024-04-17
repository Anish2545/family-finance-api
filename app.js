const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("API Working");
});


require('./startup/routes')(app);
require("./startup/db")();


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});