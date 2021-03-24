const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./rouets/userRouter');
const profileRouter = require('./rouets/profileRouter');
const app =express();

//connect to mongodb
mongoose.connect('mongodb+srv://test:test@cluster0.6sjxc.mongodb.net/blog?retryWrites=true&w=majority', {useNewUrlParser: true})
    .then(()=>{
        console.log('connected to atlas');
    });

//middleware
app.use("/uploads",express.static("uploads"));
app.use(express.json());
app.use('/users', userRouter);
app.use('/profile',profileRouter);
app.get('/',(req,res)=>{res.json({
    msg:"Welcome to my blog app ",
})});
//connect to server
const port = process.env.PORT || 8080;
app.listen(port,(()=>{
    console.log(`Connected to port ${port} successfully`);
}));