const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pwd:{
        type:String,
        required:true
    
    },
    age:Number,
    height:Number,
    weight:Number,
    preferences:{
        studyGoal:Number,
        stepsGoal:Number,
        waterGoal:Number
    },
    appearance:{
        theme:String,
        accent:String
    }
}
,
    {
        timestamps:true
    });


module.exports = mongoose.model("User",userSchema);