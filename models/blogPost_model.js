const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    username:String,
    title:String,
    body:String,
    coverImage:{
        type:String,
        default:""
    },
    likes:   {
        type:Number,
        default: 0
    },
    shares:  {
        type:Number,
        default: 0
    },
    comments:{
        type:Number,
        default: 0
    }
});

module.exports =mongoose.model("posts",postSchema);