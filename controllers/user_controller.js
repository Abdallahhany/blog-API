const User = require('../models/user_model');

const config = require('./config');

const JWT = require('jsonwebtoken');



module.exports.Users = async (req,res) => {
    const user =await User.find();
    await res.json(user);
};

module.exports.signUp = (req,res) =>{
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
    user
        .save()
        .then(()=>{
            console.log('user created');
            res.status(200).json('Ok');
        })
        .catch((err)=>{
            res.status(403).json({msg:err})
        });
    res.json("user created")
};

module.exports.UpdatePassword = (req,res)=>{
    User.findOneAndUpdate(
        {username:req.params.username},
        {$set:{password:req.body.password}},
        (error,result)=>{
            if(error){
                return res.status(500).json({msg:error})
            }
            const msg = ({
                msg: "Password updated successfully",
                username:req.params.username
            });
            return res.json(msg);
        }
    );
};

module.exports.deleteAccount = (req,res)=> {
    User.findOneAndRemove({username:req.params.username},
        (error,result)=>{
        if(error){
            return res.status(500).json({msg:error})
        }
            const msg = ({
                msg: "account deleted successfully",
                username:req.params.username
            });
            return res.json(msg);
        })
};

module.exports.getUser = (req,res)=> {
    User.findOne({username:req.params.username},(error,result)=>{
        if(error){
            return res.status(500).json({msg:error})
        }
            return res.json({
                data:result,
                username:req.params.username
            });
    });
};

module.exports.login = (req,res)=>{
    User.findOne({username:req.body.username},(error,result)=>{
        if(error){
            return res.status(500).json({msg:error})
        }
        if(result===null){
            return res.status(403).json("incorrect username");
        }
        if(result.password===req.body.password){
            let token = JWT.sign({username:req.body.username},config.key,{
                expiresIn: '24h', //expire in 24 hour
            });
            res.json({token:token,msg:"success"})
        }
        else {
            return res.status(403).json("password is incorrect");
        }
    });
};

module.exports.checkUserName = (req,res)=>{
    User.findOne({username:req.params.username},(error,result)=>{
        if(error){
            return res.status(500).json({msg:error})
        }
        if(result !== null){
            return res.json({
                status:true
            });
        }
        else {
            return res.json({
                status:false
            });
        }
    });
};
