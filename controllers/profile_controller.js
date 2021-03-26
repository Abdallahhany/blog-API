
const Profile =require('../models/profile_model');

const path =require('path');

module.exports.addImage = async (req,res)=>{
    await Profile.findOneAndUpdate(
        {username:req.decoded.username},
        {
            $set :{
                img:req.file.path,
            }
        },
        {
            new :true
        },
        (err,profile)=>{
            if(err)
                return res.status(500).send(err);
            const response = {
                message:"image successfully added",
                data:profile,
            };
            res.status(200).send(response);
        }
    );
};

module.exports.userProfile = (req , res)=>{
    const profile = new Profile({
        username:req.decoded.username,
        name:req.body.name,
        profession:req.body.profession,
        DOB:req.body.DOB,
        titleLine:req.body.titleLine,
        about:req.body.about,
    });

    profile.save().then(()=>{
        return res.json({msg:"profile successfully stored"});
    }).catch((err)=>{
        return res.status(400).json({err:err});

    })
};

module.exports.checkProfile =(req,res)=>{
    Profile.findOne({username:req.decoded.username},(err,result)=>{
        if (err)  return res.json(err);
        else if(result==null)
            return res.json({status:false});
        else  return res.json({status:true});

    })
};

module.exports.getProfileData =(req,res)=>{
    Profile.findOne({username:req.decoded.username},(err,result)=>{
        if (err)  return res.json(err);
        else if(result == null)
            return res.json({data:[]});
        else  return res.json({data:result});

    })
};

module.exports.updateProfileData =async(req,res)=>  {
    let profile = {};
    await Profile.findOne({username:req.decoded.username},(err,result)=>{
        if (err)  {
            profile = {}
        }
        if(result == null)
        {
            profile =result;
        }
    });
    await Profile.findOneAndUpdate({username:req.decoded.username},
        {
            $set:{
                name:req.body.name?req.body.name:profile.name,
                profession:req.body.profession?req.body.profession:profile.profession,
                DOB:req.body.DOB?req.body.DOB:profile.DOB,
                titleLine:req.body.titleLine?req.body.titleLine:profile.titleLine,
                about:req.body.about?req.body.about:profile.about,
            },
        },{
        new : true
        },
        (err,result)=>{
            if (err)  return res.json(err);
            else if(result == null)
                return res.json({data:[]});
            else  return res.json({data:result});
        })
};