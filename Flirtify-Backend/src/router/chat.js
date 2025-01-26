const express=require("express");
const chatRouter=express.Router();
const { Chat } = require("../models/chat");
const {userAuth}=require("../middlewares/auth");
const mongoose=require("mongoose");
const connectionDB=require("../models/connectionRequest")

chatRouter.get("/chat/:targetUserId",userAuth,async(req,res)=>{
  try{
    //this api send the chat present in messages
    const userId=req.user._id;
    const {targetUserId}=req.params;
    if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).send("Invalid target user ID");
    }
    const connectionModule=await connectionDB.findOne({
      $or:[
          {fromUserId:userId,toUserId:targetUserId,status:"accepted"},
          {fromUserId:targetUserId,toUserId:userId,status:"accepted"},
      ]
  });
  if(!connectionModule){
    throw new Error("they are not friends");
};

   let chat = await Chat.findOne({
    participants: { $all: [userId, targetUserId] },
}).populate({
    path: 'messages.senderId',  // Correct path to populate senderId inside messages array
    select: 'firstName lastName'  // Select only firstName and lastName
})
   //for first time 
   if(!chat){
    chat=new Chat({
        participants:[userId,targetUserId],
        messages:[],
    });
    await chat.save();
   }
    res.json(chat);
  }
  catch(err){
    res.status(400).send("Something went wrong "+err); 
  }
});
module.exports=chatRouter;