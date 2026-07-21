const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const studySession=require('../models/Study/StudySession');
const Subject=require('../models/Study/Subject');
const User=require('../models/User');

//ADD A SUBJECT
router.post('/subject',auth,async (req,res)=>{
     try
     {

        const exist=await Subject.findOne({user:req.user.id,name:req.body.name});

        if(req.body.name?.trim() && !exist){
        await Subject.create({user:req.user.id,name:req.body.name});

        res.status(201).json({MSG:"SUBJECT ADDED SUCCESSFULLY",sub:req.body.name});

        }

        else
            {

             res.status(404).send("SUBJECT NOT FOUND");

        }
     }

     catch(err){

        res.status(500).send(err.message);

     }
});





//DELETE A SUBJECT
router.delete('/subject/:id',auth,async (req,res)=>{
     try
     {

        await Subject.findOneAndDelete({
    _id:req.params.id,
    user:req.user.id
});
        res.status(200).send("SUBJECT DELETED GIGANIGGA");
     }

     catch(err){

        res.status(500).send(err.message);

     }
});



//GET ALL SUBJECTS OF A USER
router.get('/subjects',auth,async (req,res)=>{
     try
     {

       const allsub= await Subject.find({user:req.user.id});

        res.status(200).json({msg:"ALL SUBJECT FOUND ANATA-SAMA",subs:allsub});
     }

     catch(err){

        res.status(500).send(err.message);

     }
});








//ADD A SESSION WHEN IT STARTS
router.post('/session/start',auth,async (req,res)=>{
     try
     {
        
       await studySession.create({user:req.user.id,subject:req.body.subId,start:new Date()})

        res.status(201).json({msg:"DEAR ,STUDYSESSION HAS BEEN CREATED"});
     }

     catch(err){

        res.status(500).send(err.message);

     }
});






//ADD END TIME FOR A STUDY SESSION
router.patch('/session/end/:id',auth,async (req,res)=>{
     try
     {
       const currsession=await studySession.findOne({
    _id:req.params.id,
    user:req.user.id
});

if(!currsession)
    return res.status(404).send("SESSION NOT FOUND");

        currsession.end=new Date();
        currsession.duration=(currsession.end-currsession.start)/(1000*60*60);
    await currsession.save();

        res.status(200).json({msg:"SENSEI STUDY SESSION END HAS BEEN UPDATED"});
     }

     catch(err){

        res.status(500).send(err.message);

     }
});





//GET ALL SESSIONS OF TODAY
router.get('/sessions',auth,async (req,res)=>{
    const todayStart=new Date();
    todayStart.setHours(0,0,0,0);
    const tomorrowStart=new Date();
    tomorrowStart.setHours(24,0,0,0);
    
     try
     {
const allsession=await studySession.find({user:req.user.id,start:{
    $gte:todayStart,
    $lt:tomorrowStart
}});
       

        res.status(200).json({msg:"GOT ALL SESSIONS",sessions:allsession});
     }

     catch(err){

        res.status(500).send(err.message);

     }
});







//GET WEEKLY ANALYSIS
router.get('/analytics',auth,async (req,res)=>{

const today=new Date();
const weekStart=new Date();
weekStart.setDate(today.getDate()-today.getDay());
const weekEnd=new Date();
weekEnd.setDate(weekStart.getDate()+7);

let bestDay=0;


//currently we assume user has weekly goal and would only be changed in a week (FIX THIS SHYT NIGGA)


    const weeklyHours=[0,0,0,0,0,0,0];

     try
     {
        const weeklygoal=(await User.findById(req.user.id)).preferences.studyGoal;
const weekSessions=await studySession.find({user:req.user.id,start:{
    $gte:weekStart,
    $lt:weekEnd
}});

weekSessions.forEach((curr)=>{
    weeklyHours[curr.start.getDay()]+=curr.duration;

   
     bestDay=(weeklyHours[curr.start.getDay()]>weeklyHours[bestDay]?curr.start.getDay():bestDay);
})
       
const totalweekhours=weeklyHours.reduce((total,day)=>{return total+day},0);




let streak=0;

const completedGoals=weeklyHours.reduce((total,hour)=>{
  if(hour>=weeklygoal){streak++; return total+1;}
  else{streak=0; return total;}
},0);

        res.status(200).json({msg:"GOT THE WEEKLY ANALYSIS",weeklyHours:weeklyHours,streak:streak,completedGoals:completedGoals,bestDay:bestDay});
     }

     catch(err){

        res.status(500).send(err.message);

     }
});



module.exports=router;