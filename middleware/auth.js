const user = require("../models/User");
const {
  genResFormat,
  genResWithObjectFormat,
} = require("../custom_modules/util");

exports.auth = async (req, res, next) => {
  const phone = req.query.number;
  const userdata = await user.findOne({ number: phone });
  if (!userdata) {
    genResFormat(res, false, "User Data not found");
    return;
  } else {
    genResWithObjectFormat(res, true, "User Data", userdata);
  }
};