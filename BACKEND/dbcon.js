const mongoose=require('mongoose');
const dotenv=require('dotenv').config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    }
    catch(err){
        console.log(err);
    }
}


module.exports=connectDB;
