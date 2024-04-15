const mongoose = require("mongoose");

module.exports = function () {
    mongoose
      .connect(
        "mongodb+srv://dvibit:Qy0OeCQ40wuG1cLj@cluster0.2in4a9l.mongodb.net/damp2decor",
      )
      .then(() => console.log("Connected.."));
  };
  