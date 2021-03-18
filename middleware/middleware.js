const JWT = require('jsonwebtoken');
const  config = require('../controllers/config');

module.exports.checkToken = (req,res,next)=>{
    let token = req.headers["authorization"];
    console.log(token);
    token = token.slice(7, token.length);
    if(token){
        JWT.verify(token,config.key,(err,decoded)=>{
            if(err){
                return res.json({
                    status:false,
                    msg : "token is invalid"
                });
            }else {
                req.decoded = decoded;
                next();
            }
        });
    }else{
        return res.json({
            status: false,
            msg : "token is not provided"
        })
    }
};