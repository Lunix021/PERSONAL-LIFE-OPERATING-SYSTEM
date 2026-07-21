const mongoose=require('mongoose');

const studySessionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",required:true
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,ref:"Subject",required:true
    },
    start:Date,
    end:Date
});

module.exports=mongoose.model("studySession",studySessionSchema);