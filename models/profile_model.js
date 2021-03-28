const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique : true,
    },
    name:String,
    profession:String ,
    DOB:String,
    //titleLine:String,
    about:String,
    img:{
        type: String,
        default:"",
    },
},
    {
        timestamp:true,
    }
);

module.exports = mongoose.model('Profile',profileSchema);