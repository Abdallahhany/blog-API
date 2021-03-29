const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./rouets/userRouter');
const profileRouter = require('./rouets/profileRouter');
const blogPostRouter =require('./rouets/blogPostRouter');
const app =express();

//connect to mongodb
mongoose.connect('', {useNewUrlParser: true, useFindAndModify:false},)
    .then(()=>{
        console.log('connected to mongodb');
    });

//middleware
app.use("/uploads",express.static("uploads"));
app.use(express.json());
app.use('/users', userRouter);
app.use('/profile', profileRouter);
app.use('/blogPosts', blogPostRouter);

app.get('/',(req,res)=>{res.json({
    msg:"Welcome to my blog app ",
})});
//connect to server
const port = process.env.PORT || 8080;
app.listen(port,(()=>{
    console.log(`Connected to port ${port} successfully`);
}));