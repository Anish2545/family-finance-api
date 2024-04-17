const User = require("../models/User");

const { userApp } = require("../custom_modules/firebase-admin");
const jwt = require("jsonwebtoken");
const { genResFormat,
    genResWithObjectFormat } = require("../custom_modules/util")


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

exports.getProfile = async (req, res) => {
    const id = req.query;
    const profile = await User.findOne({ _id: id });
    if (!profile) {
        genResFormat(res, false, "User Data not found");
        return;
    }
    genResWithObjectFormat(res, true, "User Data", profile);
};

exports.updateProfile = async (req, res) => {
    const { userId } = req.params;
    const Profile = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
    });
    if (!Profile) {
        genResFormat(res, false, "Profile Not Found");
        return;
    }
    genResFormat(res, true, "Profile Entry Updated");
}

exports.checkMobileNo = async (req, res) => {
    const { mobileNo } = req.body;
    const user = await User.findOne({ mobileNo: mobileNo });
    if (!user) {
        genResFormat(res, false, "Mobile number does not exist, Please Sign up!");
        return;
    }
    genResWithObjectFormat(res, true, "User Data", user);
};