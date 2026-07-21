const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const Fitness=require('../models/Fitness');


//ADD A WORKOUT 
router.post('/add',auth,async (req,res)=>{
  if (
    !req.body.muscle ||
    !req.body.exercise ||
    req.body.sets == null ||
    req.body.reps == null ||
    req.body.weight == null
) {
    return res.status(400).send("Missing workout details");
}

  try{
    const exist=await Fitness.findOne({user:req.user.id,muscle:req.body.muscle});
    

    if(!exist){
          await Fitness.create({
            user:req.user.id,
            muscle:req.body.muscle,
            exercises:[
            {
 name:req.body.exercise,
        sets:req.body.sets,
        reps:req.body.reps,
        weight:req.body.weight
            }
            ]
          });

          res.status(201).send("MUSCLE ADDED SUCCESSFULLY")
  }
  
  else{
    const exerciseexist=exist.exercises.some((ex)=>ex.name===req.body.exercise);
    if(exerciseexist) return res.status(409).send("EXERCISE ALREADY EXISTED");

     exist.exercises.push({
        name:req.body.exercise,
        sets:req.body.sets,
        reps:req.body.reps,
        weight:req.body.weight
     })
      
     await exist.save();

     res.status(200).send("Exercise added successfully");
     }
  }
catch(err){
  res.status(500).send(err.message);
}

}
);





// GET ALL MUSCLES WITH DETAILS
router.get('/muscles',auth,async (req,res)=>{

  try{
   const muscles=await Fitness.find({user:req.user.id});
   res.status(200).json({
    msg:"Showing all muscles aaaahaahahha",
    list:muscles
   })
  }
catch(err){
  res.status(500).send(err.message);
}

});






module.exports=router;