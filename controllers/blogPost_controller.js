
const blogPost = require('../models/blogPost_model');

module.exports.addPost = (req,res)=>{
    const blog_post = new blogPost({
        username:req.decoded.username,
        title:req.body.title,
        body:req.body.body,
    });
    blog_post.save().then((result)=>{
        res.json({data:result["_id"]});
    }).catch((err)=>{
        console.log(err);
        res.json({err:err});
    })
};

module.exports.addPostImg = async (req,res)=>{
    await blogPost.findOneAndUpdate(
        {username:req.params.id},
        {
            $set :{
                coverImage:req.file.path,
            }
        },
        {
            new :true
        },
        (err,result)=>{
            if(err)
                return res.send(err);
            // const response = {
            //     message:"image successfully added",
            //     data:result,
            // };
            return res.json(result);
        }
    );
};

module.exports.getOwnBlogs =async (req,res)=>{
    blogPost.find({username:req.decoded.username},(err,result)=>{
        if(err) return  res.json(err);
        return  res.json({data:result});
    })
};

module.exports.getOtherBlogs =async (req,res)=>{
    blogPost.find({username:{$ne:req.decoded.username}},(err,result)=>{
        if(err) return  res.json(err);
        return  res.json({data:result});
    })
};

module.exports.deleteBlog = async (req,res) =>{
  blogPost.findOneAndRemove(
      {$and:[
          {username:req.decoded.username},
          {_id:req.params.id}
      ]},(err,result)=>{
      if(err) return  res.json(err);
      else if (result) return  res.json("blog deleted successfully");
      return  res.json("blog not deleted");
  })
};