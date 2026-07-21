const express=require('express');
const router=express.Router();
const Task=require('../models/Task');
const auth=require('../middleware/auth');

// ADD A TASK
router.post('/add',auth,async (req,res)=>{
    try{
        if(req.body.text?.trim())
    {
        const task=await Task.create({...req.body,user:req.user.id});
    res.status(201).send("TASK ADDED SUCCESSFULLY MF");
}
        else{
            res.status(404).send("ENTER THE TASK");
        }
    }
    catch(err){
        res.status(500).send(err.message);
    }
});





//DELETE A TASK
router.delete('/delete',auth,async (req,res)=>{
            try{
                   await Task.deleteMany({user:req.user.id,checked:true})
                   res.status(200).send("TASK DELETED SUCCESSFULLY");
            }
             catch(err){
        res.status(500).send(err.message);
    }
});



//CHANGE VALUE OF CHECKBOX
router.patch('/:id',auth,async (req,res)=>{
            try{
                   await Task.findOneAndUpdate({_id:req.params.id,user:req.user.id},{checked:req.body.checked});
                   res.status(200).send("BOOLEAN COMPLEMENTED DIGGA");
            }
             catch(err){
        res.status(500).send(err.message);
    }
});




// GET ALL TASKS OF A USER
router.get('/tasks',auth,async(req,res)=>{
    try{      const tasks= await Task.find({user:req.user.id});
                   res.status(200).send("ALL TASKS FOUND");
            }
             catch(err){
        res.status(500).send(err.message);
    }
})




module.exports=router;