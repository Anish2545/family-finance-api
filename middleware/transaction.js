const Transaction = require("../models/Transaction")
const { genResFormat } = require("../custom_modules/util")

exports.transactionId = async (req,res,next) => {
    const id = req.query;
    const transaction = await Transaction.findOne({_id:id});
    if(!transaction){
        genResFormat(res,false,"Transaction Not Found",transaction);
        return;
    }else{
        genResFormat(res,true,"Transaction Found",transaction);
    }
};