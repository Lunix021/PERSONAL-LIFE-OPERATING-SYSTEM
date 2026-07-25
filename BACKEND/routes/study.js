const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const studySession=require('../models/Study/StudySession');
const Subject=require('../models/Study/Subject');
const User=require('../models/User');

//ADD A SUBJECT
router.post('/addsub',auth,async (req,res)=>{
     try
     {

        const exist=await Subject.findOne({user:req.user.id,name:req.body.name});

        if(req.body.name?.trim() && !exist){
         
        const newsub=await Subject.create({user:req.user.id,name:req.body.name,checked:req.body.checked});

        res.status(201).json({MSG:"SUBJECT ADDED SUCCESSFULLY",sub:newsub});

        }

        else
            {

             res.status(404).send("SUBJECT ALREADY EXISTS");

        }
     }

     catch(err){

        res.status(500).send(err.message);

     }
});





//DELETE A SUBJECT
router.delete('/deletesub',auth,async (req,res)=>{
     try
     {

        await Subject.deleteMany({user:req.user.id,checked:true});

         const sub=await Subject.find({user:req.user.id});

        res.status(200).json({msg:"DELETED MY NIGGA",sub:sub})
     }

     catch(err){

        res.status(500).send(err.message);

     }
});



//CHANGE VALUE OF CHECKBOX
router.patch('/:id',auth,async (req,res)=>{
            try{
                   const sub=await Subject.findOne({_id:req.params.id,user:req.user.id});
                   sub.checked=!sub.checked;
                   await sub.save();
                    res.status(200).json({msg:"BOOLEAN COMPLEMENTED DIGGA",sub:sub});
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

      const activeSession = await studySession.findOne({
    user: req.user.id,
    active: true
});

if(activeSession){
    return res.status(409).send("Session already running");
}
        
       const newses=await studySession.create({user:req.user.id,subject:req.body.subId,start:new Date(),active:true})

        res.status(201).json({msg:"DEAR ,STUDYSESSION HAS BEEN CREATED",session:newses});
     }

     catch(err){

        res.status(500).send(err.message);

     }
});






//ADD END TIME FOR A STUDY SESSION
router.patch('/session/end',auth,async (req,res)=>{
     try
     {
       const currsession=await studySession.findOne({
    active:true,
    user:req.user.id
});

if(!currsession)
    return res.status(404).send("SESSION NOT FOUND");

        currsession.end=new Date();
        currsession.active=false;
        currsession.duration=(currsession.end-currsession.start)/(1000*60*60);
    await currsession.save();

        res.status(200).json({msg:"SENSEI STUDY SESSION END HAS BEEN UPDATED",session:currsession});
     }

     catch(err){

        res.status(500).send(err.message);

     }
});





//GET ACTIVE SESSION
router.get('/activesession',auth,async (req,res)=>{
   try {
      const session = await studySession.findOne({
    user:req.user.id,
    active:true
});

res.json(session);
   } catch (err) {
       res.status(500).send(err.message);
   }
   
})






//GET ALL SESSIONS OF TODAY
router.get('/sessions',auth,async (req,res)=>{
    const todayStart=new Date();
    todayStart.setHours(0,0,0,0);
    const tomorrowStart=new Date();
    tomorrowStart.setHours(24,0,0,0);
    
     try
     {
const allsession=await studySession.find({user:req.user.id,
   start:{
    $gte:todayStart,
    $lt:tomorrowStart
}});
       
const total=allsession.reduce((total,dur)=>{return total+(dur.duration??0)},0)

        res.status(200).json({msg:"GOT ALL SESSIONS",sessions:allsession,total:total});
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
weekStart.setHours(0,0,0,0);


const weekEnd=new Date();
weekEnd.setHours(0,0,0,0);
weekEnd.setDate(weekStart.getDate()+7);
//currently we assume user has weekly goal , i mean the daily goal will remain same for 1 week and would only be changed in a week (FIX THIS SHYT NIGGA)
    const weeklyHours=[0,0,0,0,0,0,0];

     try
     {
        const weeklygoal=(await User.findById(req.user.id)).preferences.studyGoal;
const weekSessions=await studySession.find({user:req.user.id, active:false,start:{
    $gte:weekStart,
    $lt:weekEnd
}});



weekSessions.forEach((curr)=>{
    weeklyHours[curr.start.getDay()]+=curr.duration??0;
})
       
let totalweekhours=weeklyHours.reduce((total,day)=>{return total+day},0);

totalweekhours=new Date(totalweekhours*60*60*1000).toISOString().slice(11,19);


let streak=0;

const completedGoals=weeklyHours.reduce((total,hour)=>{
  if(hour>=weeklygoal){streak++; return total+1;}
  else{streak=0; return total;}
},0);




let bestDay = -1;
let bestHours = 0;

weeklyHours.forEach((hours, index) => {
    if (hours > bestHours) {
        bestHours = hours;
        bestDay = index;
    }
});



        res.status(200).json({msg:"GOT THE WEEKLY ANALYSIS",weeklyHours:weeklyHours,total:totalweekhours,streak:streak,completedGoals:completedGoals,bestDay:bestDay});
     }

     catch(err){

        res.status(500).send(err.message);

     }
});




module.exports=router;