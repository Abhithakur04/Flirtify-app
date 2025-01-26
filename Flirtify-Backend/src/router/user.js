const express=require("express");
const userRouter=express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionDB =require("../models/connectionRequest");
const User=require("../models/user")

const USER_SAFE_DATA="firstName lastName age gender";

userRouter.get("/user/requests/recieved",userAuth,
    async(req,res)=>{
        try{
         const loggedInUser=req.user;
         const connectionRequest=await connectionDB.find({
            toUserId:loggedInUser._id,status:"interested"
        }).populate("fromUserId");
         res.json({message:"Data fetched succesfully ",data:connectionRequest})
        }
        catch(err){
            return res.status(404).send("Error! "+err);
        }
    }
)

userRouter.get("/user/connection",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest=await connectionDB.find({
          $or:[
            {fromUserId:loggedInUser._id,status:"accepted"},
            {toUserId:loggedInUser._id,status:"accepted"}
          ]
        }).populate("fromUserId")
          .populate("toUserId")

          const data=connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId
          })
          res.json({message:"connection are",data:data})

    }
    catch(err){
        return res.status(404).send("Error! "+err);
    }
})
userRouter.get("/feed",userAuth,async(req,res)=>{
  try{
    // feed Api not contain 
    //--loggedinuser
    //--connected i send request or someone send me request or someone ignored,reject i ignored ,reject someone
    const loggedInUser=req.user;
    const page=parseInt(req.query.page) || 1;
    let limit=parseInt(req.query.limit) || 10;
    limit=(limit>50)?50:limit;
    let skip=(page-1)*limit;
   

    // store all the person of id whom i am interacted that can be intersted ignored accepted rejected
     const connectedUser=await connectionDB.find({
      $or:[{fromUserId:loggedInUser._id},
        {toUserId:loggedInUser._id}]
     }).select("fromUserId toUserId")
     const hideUser=new Set();
     //now store all that id in the set(set is used because it doesnot store duplicate)
     connectedUser.forEach((row)=>{
      hideUser.add(row.fromUserId.toString());
      hideUser.add(row.toUserId.toString())
     })
      //take that user who are not in the set or logged in user
     const Users=await User.find({
      $and:
      [{ _id:{ $nin: Array.from(hideUser)} },
            { _id:{ $ne:loggedInUser._id} }]
     }).select(USER_SAFE_DATA).skip(skip).limit(limit);

     res.send(Users)
  }
  catch(err){
    return res.status(404).send("Error! "+err); 
  }
})
module.exports=userRouter