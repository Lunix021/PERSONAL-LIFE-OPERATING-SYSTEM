const express=require('express');
const User=require('../models/User')
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const auth=require('../middleware/auth')
const Groq = require("groq-sdk");
const studySession=require('../models/Study/StudySession');

const groq = new Groq({
    apiKey: process.env.API_KEY
});



//CHECK IF USER LOGGED IN OR NOT
router.get("/me",auth,async(req,res)=>{

    const user=await User.findById(req.user.id);

    res.json(user);

});





// USER REGISTRATION
router.post('/register',async (req,res)=>{
try{
const exist = await User.findOne({ email: req.body.email });

if(req.body.pwd!==req.body.confirmpwd){ return res.status(401).send("PASSWORD AND CONFIRM PASSWORD DIDNT MATCH")}

if( req.body.name && req.body.pwd.length>4 && req.body.email &&  !exist)
{
const hashedPassword = await bcrypt.hash(req.body.pwd, 10);
await User.create({...req.body,pwd: hashedPassword});
res.status(201).send("USER CREATED SUCCESSFULLY");
}
    else {
        res.status(409).send("EITHER USER ALREADY EXISTS OR U DIDNT GIVE ALL REQUIRED INFORMATION");
    }
}
    catch(err){
        res.status(500).send(err.message);
    }
});





//LOGIN A USER
router.post('/login',async (req,res)=>{
 try{
const exist = await User.findOne({ email: req.body.email });
    if(exist)
       {
        if(await bcrypt.compare(req.body.pwd,exist.pwd)){
            const token=jwt.sign(
                {
                    id:exist._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"7d"
                }
            );

            res.cookie("token", token, { httpOnly:true,secure:true,sameSite:"none",maxAge:7*24*60*60*1000});

res.status(201).json({
    msg:"LOGIN SUCCESS"
});
        }
        else{
            res.status(401).send("PASSWORD INCORRECT");
        }
       }
    else {
        res.status(401).send("USER DOES NOT EXISTS , PLEASE REGISTER FIRST");
    }
 }
 catch(err){
    res.status(500).send(err.message);
 }
});




//LOGOUT A USER
router.post('/logout',async (req,res)=>{
 res.clearCookie("token",{
    httpOnly: true,
    sameSite: "none",
    secure: true
});
res.send("Logged out");
});







//GET A USER
router.get('/profile',auth,async (req,res)=>{
 res.status(201).send(await User.findById(req.user.id));
});







// ADD DETAILS FOR A USER
router.post('/update',auth,async(req,res)=>{
    try {
    await User.findByIdAndUpdate(req.user.id,{
        "preferences.studyGoal": req.body.goal??0,
        "preferences.waterGoal":req.body.waterGoal??0,
        "preferences.stepsGoal":req.body.stepsGoal??0,
        "name":req.body.name,
        "age":req.body.age??0,
        "height":req.body.height??0 ,
        "weight": req.body.weight??0,
        "appearance.theme":req.body.theme??"Light",
        "appearance.accent":req.body.accent??"blue"

    });

        res.status(200).json({"msg":"DETAILS UPDATED"})
    } catch (err) {
        res.status(500).send(err.message);
    }
    
})




//send user statistics to AI
router.post("/ai/generate", auth, async (req, res) => {
    const todayStart=new Date();
        todayStart.setHours(0,0,0,0);
        const tomorrowStart=new Date();
        tomorrowStart.setHours(24,0,0,0);
        
         try
         {
console.log("AI ROUTE HIT");
      const usr=await User.findById(req.user.id);
            
    const sessions=await studySession.find({user:req.user.id,
       start:{
        $gte:todayStart,
        $lt:tomorrowStart
    }});
           
    const total=sessions.reduce((total,dur)=>{return total+(dur.duration??0)},0);

        
        const totalSessions = sessions.length;

        const response = await groq.chat.completions.create({
           model:  "openai/gpt-oss-20b",
              messages: [
                {
                    role: "system",
                    content: `
                        You are PLOS, a friendly personal productivity assistant.
                        Analyze the user's study statistics.
                        Give constructive feedback and actionable suggestions.
                        Never invent statistics.
                        Keep your response concise and encouraging.
                    `
                },
                {
                    role: "user",
                    content: JSON.stringify({
                        totalStudyTimeSeconds: total,
                        totalSessions,
                        dailyStudyGoalHours: usr.preferences?.studyGoal ?? 0
                    })
                }
            ]
        });

        res.json({
            report: response.choices[0].message.content
        });

        
    } catch (err) {
    console.error("AI GENERATION ERROR:", err);

    res.status(500).json({
        error: err.message
    });
}
});


module.exports=router;