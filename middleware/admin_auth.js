const jwt = require("jsonwebtoken")
const { privateKey } = require("../data/family-expense-tracker-4d9fb-firebase-adminsdk-d45w8-94a79d0e6a.json")

module.exports = function(req,res,next){
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(401).send({flag:false,message: "Access Denied.Token Missing"});
    try{
        const decoded = jwt.verify(token,privateKey.adminPrivateKey);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(400).send({flag:false,message: "Invalid Token."});
    }
}