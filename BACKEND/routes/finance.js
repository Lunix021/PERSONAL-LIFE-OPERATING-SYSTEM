const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const Finance=require('../models/Finance');

//INSTEAD OF 3 FINDS U CAN USE ONE FIND AND A FOR LOOP TO GET ALL VALUES 




//ADD A TRANSACTION
router.post('/transaction',auth,async (req,res)=>{

    if(!req.body.reason || req.body.amount == null){
    return res.status(400).send("Missing transaction details");
}

try{
await Finance.create({
    user:req.user.id,reason:req.body.reason,amount:req.body.amount,timegen:new Date()
});
res.status(201).send("TRANSACTION ADDED SUCCESSFULLY");
}
catch(err){
    res.status(500).send(err.message);
}
});


//GET ALL TRANSACTION
router.get('/transactions',auth,async (req,res)=>{

    const dayStart=new Date();
    dayStart.setHours(0,0,0,0);
    const dayEnd=new Date();
    dayEnd.setHours(24,0,0,0);


    const monthStart=new Date();
    monthStart.setDate(1);
    monthStart.setHours(0,0,0,0);

    const monthEnd=new Date(monthStart);
    monthEnd.setMonth(monthEnd.getMonth()+1)
  


try{

    const transactions=await Finance.find({user:req.user.id}).sort({ timegen: -1 });

    const totalAmount=transactions.reduce((total,ob)=>{return total+ob.amount;},0);

    const todayTrans=await Finance.find({user:req.user.id,timegen:{
        $gte:dayStart,
        $lt:dayEnd
    }}).sort({ timegen: -1 });

 const todayAmount=todayTrans.reduce((total,ob)=>{return total+ob.amount;},0);


 const monthTrans=await Finance.find({user:req.user.id,timegen:{
        $gte:monthStart,
        $lt:monthEnd
    }}).sort({ timegen: -1 });

 const monthAmount=monthTrans.reduce((total,ob)=>{return total+ob.amount;},0);


res.status(200).json({msg:"GOT ALL TRANSACTIONS NIGGA?",
    alltransaction:transactions,
    totalexpense:totalAmount,
    todayExpense:todayAmount,
    monthExpense:monthAmount
});
}
catch(err){
    res.status(500).send(err.message);
}
});