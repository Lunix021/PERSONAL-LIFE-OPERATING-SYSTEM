const jwt=require('jsonwebtoken');
require('dotenv').config();
 const auth= async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
       return res.status(401).send("NO TOKEN GIVEN");
    }

    try{
        const payld=jwt.verify(token,process.env.JWT_SECRET);

        req.user=payld;
        next();

    }
    catch(err){
res.status(401).send("INVALID TOKEN");
    }
}

module.exports=auth;