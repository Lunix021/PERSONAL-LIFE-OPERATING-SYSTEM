//DONT FORGET OT RESTRICT NETWROK ACCES IN MOGODB , U HAVE CURRENTLY GIVEN ACCESS TO ERVYONE
const userRouter=require('./routes/user.js');
const fitnessRouter=require('./routes/fitness.js');
const studyRouter=require('./routes/study.js');
const taskRouter=require('./routes/task.js');
const financeRouter=require('./routes/finance.js')
const dbcon=require('./dbcon.js');
const express=require('express');
const cookieparser=require('cookie-parser');
const cors=require("cors");
require("dotenv").config();


const PORT=process.env.PORT||5000;
const app=express();
dbcon();
app.use(express.json());
app.use(cors({
    origin:"https://personal-life-operating-system-pi.vercel.app/",
    credentials:true
}));

app.use(cookieparser());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.use('/user',userRouter);


app.use('/fitness',fitnessRouter);


app.use('/study',studyRouter);


app.use('/task',taskRouter);



app.use('/finance',financeRouter);

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING`);
})