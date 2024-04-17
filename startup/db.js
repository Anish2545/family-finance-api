const mongoose = require("mongoose");

module.exports = function () {
    mongoose
      .connect(
        "mongodb+srv://sopariwalaanish:yz30fdvMbxZcRXt5@familyfinance.qbwamem.mongodb.net/",
      )
      .then(() => console.log("Connected To Database Successfully ..."));
  };
  