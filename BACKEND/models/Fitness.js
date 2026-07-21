const mongoose=require('mongoose');

const fitnessSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    muscle:{
        type:String,
        required:true,
        trim:true
    },
    exercises:[
        {
            name:{
                type:String,
                required:true
            },
            sets:Number,
            reps:Number,
            weight:Number
        }
    ]

},
{
    timestamps:true
}
);


module.exports=mongoose.model("Fitness",fitnessSchema);