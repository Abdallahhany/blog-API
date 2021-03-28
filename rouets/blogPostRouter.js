const express = require('express');
const postRouter = express.Router();
const middleware = require('../middleware/middleware');
const blogPostController = require('../controllers/blogPost_controller');
const multer = require('multer');


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"./uploads");
    },
    filename:(req, file, cb)=>{
        cb(null,req.params.id + '.jpg');
    }
});


const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 6,
    },
    //fileFilter:fileFilter,
});


postRouter.post("/addPost",middleware.checkToken,blogPostController.addPost);
postRouter.patch('add/coverImage/:id',middleware.checkToken,upload.single("img"),blogPostController.addPostImg);
postRouter.get('/getOwnBlogs',middleware.checkToken,blogPostController.getOwnBlogs);
postRouter.get('/getOtherBlogs',middleware.checkToken,blogPostController.getOtherBlogs);
postRouter.delete('/deleteBlog/:id',middleware.checkToken,blogPostController.deleteBlog);




module.exports = postRouter;