const subuser = require('../models/SubUser')
const { genResFormat,
    genResWithObjectFormat, generalListData } = require('../custom_modules/util')

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

// exports.getSubUserListData = async(res,req) =>{
//     const listsubuser = await subuser.find({ subuserId:id },{
//        name:1,
//        relationToUser:1,
//        mobileNo:1 
//     });
//     genResWithObjectFormat(res,true,"Sub User List",listsubuser)
// }

exports.getSubUserListData = async (req, res) => {
    const first = parseInt(req.body.first) || 0;
    const rows = parseInt(req.body.rows) || 10;
    const { userId } = req.user;
    let globalFilter;
    //= { id:userId };
  
    const count = await subuser.countDocuments(globalFilter);
  
    const listsubuser = await subuser.find(globalFilter)
    .sort({ createdAt: -1 })
    .skip(first)
    .limit(rows)
    .exec();
  
    let subuserList = [];
  
    listsubuser.forEach((element) => {
      subuserList.push({
        _id: element._id || "",
        name: element.name || "",
        relationToUser: element.relationToUser || "",
        mobileNo: element.mobileNo || "",
      });
    });
  
    console.log(subuserList)
  
    generalListData(res, count, subuserList);
  }

  exports.deleteSubUser = async(req,res) =>{
    const {subuserId} = req.params;
    console.log(subuserId);
    const Subuser = await subuser.findById(subuserId)
    if(!Subuser){
      genResFormat(res, false, "Sub User not found");
      return;
    }
    await Subuser.deleteOne({
      _id: subuserId,
    })
    genResFormat(res, true, "Sub User Deleted Successfully.");
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