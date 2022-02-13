const mongoose  = require("mongoose");

mongoose.connect(process.env.mongoDBURL,(err)=>{
    if(!err){
        console.log("connected");
    }else{
        console.log("not connected");
    }
});

require('./user.model');