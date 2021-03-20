const express = require('express');
const mongoose = require('mongoose');
const router = require('./rouets/router');
const app =express();

//connect to mongodb
mongoose.connect('mongodb+srv://test:test@cluster0.6sjxc.mongodb.net/blog?retryWrites=true&w=majority', {useNewUrlParser: true})
    .then(()=>{
        console.log('connected to atlas');
    });

//middleware
app.use(express.json());
app.use('/users', router);
app.get('/',(req,res)=>{res.send('hello world')});
//connect to server
const port =process.env.port ||  3000;
app.listen(port,(()=>{
    //console.log(`Connected to port ${port} successfully`);
}));