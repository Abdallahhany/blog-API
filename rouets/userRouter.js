const express = require('express');
const userController = require('../controllers/user_controller');
const UserRouter = express.Router();
const middleware = require('../middleware/middleware');

UserRouter.get('/',userController.Users);
UserRouter.get('/:username', middleware.checkToken ,userController.getUser);
UserRouter.post('/signup',userController.signUp);
UserRouter.patch('/update/:username',middleware.checkToken,userController.UpdatePassword);
UserRouter.delete('/:username',middleware.checkToken,userController.deleteAccount);
UserRouter.post('/login',userController.login);
UserRouter.get('/checkusername/:username',userController.checkUserName);



module.exports = UserRouter;