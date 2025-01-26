  const mongoose=require("mongoose");
  const connectDB=async()=>{
    //mongoose.connect will return a promise
    await mongoose.connect("mongodb://localhost:27017/devTinder");
  }
  
  module.exports=connectDB;