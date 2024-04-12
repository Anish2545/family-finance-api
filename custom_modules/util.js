const jwt = require("jsonwebtoken");

exports.comboFormat = (res, flag, message, result) => {
  res.status(200).send({
    flag: flag,
    message: message,
    data: result,
  });
};

exports.genResFormat = (res, flag, message) => {
  res.status(200).send({
    flag: flag,
    message: message,
  });
};

exports.genResWithDataArrayFormat = (res, flag, message, result) => {
  res.status(200).send({
    flag: flag,
    message: message,
    data: result.length > 0 ? result : [],
  });
};

exports.genResWithObjectFormat = (res, flag, message, result) => {
  res.status(200).send({
    flag: flag,
    message: message,
    data: result ? result : {},
  });
};

exports.dataTableGridFormat = (res, count, result) => {
  res.status(200).send({
    flag: true,
    count: count,
    data: result,
  });
};

exports.generateJwtToken = (userId) => {
  const token = jwt.sign({ userId }, "shhhhh"); // Token expires in 1 hour
  return token;
};

function makeUrlFriendly(str) {
  return (
    str
      // Convert to lowercase
      .toLowerCase()
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // Remove all non-word characters (except for hyphens)
      .replace(/[^\w\-]+/g, "")
      // Replace multiple hyphens with a single hyphen
      .replace(/-+/g, "-")
  );
}

function autoCompleteFormat(res, result) {
  res.status(200).send({
    flag: result.recordset[0]["flag"],
    message: result.recordset[0]["message"],
    data: result.recordsets[1],
  });
}

function genResWithMultiDataFormat(res, result) {
  res.status(200).send({
    flag: result.recordset[0]["flag"],
    message: result.recordset[0]["message"],
    data: result.recordsets,
  });
}

function base64Encode(plainstring) {
  return Buffer.from(plainstring).toString("base64");
}

function base64Decode(base64string) {
  return Buffer.from(base64string, "base64").toString("ascii");
}

module.exports.base64Encode = base64Encode;
module.exports.base64Decode = base64Decode;
module.exports.autoCompleteFormat = autoCompleteFormat;
module.exports.genResWithMultiDataFormat = genResWithMultiDataFormat;
module.exports.makeUrlFriendly = makeUrlFriendly;