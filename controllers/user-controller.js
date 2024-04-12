const User = require("../models/User");

const { userApp } = require("../custom_modules/firebase-admin");
const { genResFormat,
    genResWithObjectFormat,
    generateJWTToken } = require("../custom_modules/util")

exports.signup = async (req, res) => {
    const { name, mobileNo, emailId, address } = req.body;
    const resp = await User.create({
        name: name,
        mobileNo: mobileNo,
        emailId: emailId,
        address: address,
    });
    genResWithObjectFormat(res, true, "User Added Successfully.", {
        userId: resp._id,
    });
};

exports.signin = async (req, res) => {
    const { id_token, number, User } = req.body;

    userApp
        .auth()
        .verifyIdToken(id_token)
        .then(async (decodedToken) => {
            console.log('decodedToken ::', decodedToken);
            const user = await User.findOne({ mobileNo: number });

            //generate token
            const token = jwt.sign(
                {
                    userId: user._id,
                    mobileNo: user.mobileNo,
                    name: user.name,
                },
                "user-123456"
            );

            genResWithObjectFormat(res, true, "Login Successfull", {
                userId: user._id,
                mobileNo: user.mobileNo,
                name: user.name,
                token: token,
            });
        })
        .catch(() => {
            genResFormat(res, false, "Invalid Token");
        });
};