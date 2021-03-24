
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