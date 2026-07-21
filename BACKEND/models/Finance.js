const mongoose=require('mongoose');

const financeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
   
 reason:{
    type:String,
    required:true,
    trim:true
 },
 amount:{
    type:Number,
    required:true
 },
 timegen:{
    type:Date,
    required:true
 }
    

});

module.exports=mongoose.model("Finance",financeSchema);