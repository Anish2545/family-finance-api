const subuser = require('../models/SubUser')
const { genResFormat,
    genResWithObjectFormat } = require('../custom_modules/util')

exports.addSubUser = async (req, res) => {
    const { name, relationToUser, mobileNo } = req.body;

    const resp = await subuser.create({
        name: name,
        relationToUser: relationToUser,
        mobileNo: mobileNo
    });

    genResWithObjectFormat(res,true,"Sub User Added.",{
        subuserId: resp._id,
    })
}

exports.getSubUserListData = async(res,req) =>{
    const listsubuser = await subuser.find({ subuserId:id },{
       name:1,
       relationToUser:1,
       mobileNo:1 
    });
    genResWithObjectFormat(res,true,"Sub User List",listsubuser)
}

exports.getSubUserById = async (req, res) => {
    const id = req.query;
    const Subuser = await subuser.findById({
      _id: id,
    });
    if (!Subuser) {
      genResFormat(res, false, "SubUser not found");
      return;
    }
    genResWithObjectFormat(res, true, "SubUser Data.", Subuser);
  };