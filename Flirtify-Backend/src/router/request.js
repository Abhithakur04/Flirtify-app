const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const connectionDB =require("../models/connectionRequest");
const User=require("../models/user");

//this api is used that whether i am sending someone request i.e interested (Add friend) or ignored
requestRouter.post("/sendConnectionRequest/:status/:toUserId",userAuth,async(req,res)=>{
  try{
    const user=req.user;
    const fromUserId=user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;
    //instead of making two different api that is interested or ignored i make the one request using status interested
    if(!["interested","ignored"].includes(status)){
     throw new Error("invalid status "+status);
    }
    //check whether i am sending the request to som eone that is present in the database
    const userPresent=await User.findOne({_id:toUserId});
    if(!userPresent){
        throw new Error("User is not present in database");
    }
    //check wheter that request is already present or the other person send request to me  now i cant sent the request again
    const existingConnectionRequest=await connectionDB.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId},
        ]
    });
    if(existingConnectionRequest){
        throw new Error("user id is already exits")
    };
    
    const connectionRequest=new connectionDB({fromUserId,toUserId,status});
      const data=await connectionRequest.save();
    res.json({message:"Succesfully inserted",data:data})
  }
  catch(err){
    return res.status(404).send("Error! "+err);
  }
})
 
//this Api is to handle accept or reject request like A send request to B now it turn for B to accept or reject
requestRouter.post("/request/review/:status/:requestId",
  userAuth,
  async(req,res)=>{
   try{
    const loggedInUser=req.user
    const {status,requestId}=req.params;
    const isAllowed=["accepted","rejected"];
    if(!isAllowed.includes(status)){
      return res.status(400).json({message:"Status not Allowed"})
    }
    //make sure the toUserid is logged in user id and in the Database the status is interested not ignored
    const connectionRequest=await connectionDB.findOne({_id:requestId,toUserId:loggedInUser._id,status:"interested"})
    if(!connectionRequest){
      return res.status(404).json({message:"Connection request not found"})
    }
    connectionRequest.status=status;
    const data=await connectionRequest.save();
    res.json({message:"Connection Request "+status,data:data})
   }
   catch(err){
    return res.status(404).send("Error! "+err);
   }


  }
)
module.exports=requestRouter;