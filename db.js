const mongoose = require('mongoose');
const dotenv  = require('dotenv').config();


const connection = mongoose.connect(process.env.mongodburl,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err)
})

module.exports = connection;    