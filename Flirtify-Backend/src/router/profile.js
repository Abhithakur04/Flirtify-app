const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const {userEditValidation}=require("../utils/validation");
//profile view
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user=req.user; 
      res.send("user is "+user);
      }
      catch(err){
        res.status(400).send("Something went wrong "+err);  
      }
})
//profile edit
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    //user enter data correctly
  try{
    
    if(!userEditValidation(req)){
      throw new Error("Cant edit the profile");
   }
        const loggedInUser=req.user;
        Object.keys(req.body).forEach(key=> loggedInUser[key]=req.body[key]);
        await loggedInUser.save();
        res.json({message: `${loggedInUser.firstName}, profile updated succesfully`,
            data:loggedInUser,});
     }
  
  catch(err){
    res.status(400).send("Error! "+err);
  }
})
module.exports=profileRouter;