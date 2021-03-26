const express = require('express');
const profileController = require('../controllers/profile_controller');
const profileRouter = express.Router();
const middleware = require('../middleware/middleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"./uploads");
    },
    filename:(req, file, cb)=>{
        cb(null,req.decoded.username + '.jpg');
    }
});

const fileFilter = (req, file, cb)=>{
    if(file.mimeType === "image/jpeg"||file.mimeType === "image/png"){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 6,
    },
    fileFilter:fileFilter,
});



profileRouter.post('/add',middleware.checkToken,profileController.userProfile);
profileRouter.patch('/add/image', middleware.checkToken,upload.single('img'),profileController.addImage);
profileRouter.get('/checkProfile', middleware.checkToken,profileController.checkProfile);
profileRouter.get('/getProfileData', middleware.checkToken,profileController.getProfileData);
profileRouter.patch('/updateProfileData', middleware.checkToken,profileController.updateProfileData);


module.exports = profileRouter;