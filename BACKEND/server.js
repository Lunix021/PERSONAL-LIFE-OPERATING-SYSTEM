//DONT FORGET OT RESTRICT NETWROK ACCES IN MOGODB , U HAVE CURRENTLY GIVEN ACCESS TO ERVYONE
const userRouter=require('./routes/user.js');
const fitnessRouter=require('./routes/fitness.js');
const studyRouter=require('./routes/study.js');
const taskRouter=require('./routes/task.js');
const dbcon=require('./dbcon.js');
const express=require('express');
const cookieparser=require('cookie-parser');
const cors=require("cors");


const port=8081;
const app=express();
dbcon();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(cookieparser());

app.get('/',(req,res)=>{
    res.send("PLOS BACKEND RUNNING");
});

app.use('/user',userRouter);


app.use('/fitness',fitnessRouter);


app.use('/study',studyRouter);


app.use('/task',taskRouter);

app.listen(port,()=>{
    console.log(`SERVER IS RUNNING AT http://localhost:${port}`);
})