  const mongoose=require("mongoose");
  const connectDB=async()=>{
    //mongoose.connect will return a promise
    await mongoose.connect(process.env.MONGO_URI);
  }
  
  module.exports=connectDB;
