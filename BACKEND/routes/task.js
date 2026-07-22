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
    res.status(201).json({msg:"TASK ADDED SUCCESSFULLY MF",task:task});
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
                   const task= await Task.find({user:req.user.id});
                   res.status(200).json({msg:"TASK DELETED SUCCESSFULLY",task:task});
            }
             catch(err){
        res.status(500).send(err.message);
    }
});



//CHANGE VALUE OF CHECKBOX
router.patch('/:id',auth,async (req,res)=>{
            try{
                   const task=await Task.findOne({_id:req.params.id,user:req.user.id});
                   task.checked=!task.checked;
                   await task.save();
                    res.status(200).json({msg:"BOOLEAN COMPLEMENTED DIGGA",task:task});
            }
             catch(err){
        res.status(500).send(err.message);
    }
});




// GET ALL TASKS OF A USER
router.get('/tasks',auth,async(req,res)=>{
    try{      const tasks= await Task.find({user:req.user.id});
                   res.status(200).json({msg:"ALL TASKS FOUND",task:tasks});
            }
             catch(err){
        res.status(500).send(err.message);
    }
})




module.exports=router;