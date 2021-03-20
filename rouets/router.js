const express = require('express');
const controller = require('../controllers/user_controller');
const Router = express.Router();
const middleware = require('../middleware/middleware');


Router.get('/',controller.Users);
Router.get('/:username', middleware.checkToken ,controller.getUser);
Router.post('/signup',controller.signUp);
Router.patch('/:username',middleware.checkToken,controller.UpdatePassword);
Router.delete('/:username',middleware.checkToken,controller.deleteAccount);
Router.post('/login',controller.login);
Router.get('/checkusername/:username',controller.checkUserName);




module.exports = Router;