
const express=require("express");
const authRouter=express.Router();
const {signupValidation}=require("../utils/validation");
const bcrypt=require("bcrypt");
const User=require("../models/user");

 //signup 
authRouter.post("/signup",async(req,res)=>{
    try{
        //validation 
        signupValidation(req);      
const { firstName, lastName, emailId, password } = req.body; 

    const hashpassword = await bcrypt.hash(password, 10);

    // instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashpassword,
  
    });

        const savedUser=await user.save();
        const token=await savedUser.getJWT();
        //setting cookie so that client/browser will store the token in the frontend 
          
     res.cookie("token", token, {
  httpOnly: true,         // prevent JS from accessing cookie
  secure: true,           // required for cross-site HTTPS
  sameSite: "none",       // allow cross-domain
  maxAge: 8 * 360000      // cookie expiry
});

         
         res.json({message:"succesfuly registered",data:savedUser});
      }
      catch(err){
        res.status(400).send("cant put data: "+err);
      } 
});
 // login 
authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
          throw  new Error("Invalid credential");     }
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){     
          const token=await user.getJWT();
        //setting cookie
         res.cookie("token", token, {
  httpOnly: true,         // prevent JS from accessing cookie
  secure: true,           // required for cross-site HTTPS
  sameSite: "none",       // allow cross-domain
  maxAge: 8 * 360000      // cookie expiry
});

          const { _id, firstName, lastName, emailId, role } = user;
          res.json({ _id, firstName, lastName, emailId, role });
        }
        else{
          throw new Error("Invalid credential");
        }
      }
      catch(err){
        res.status(400).send("cant login: "+err.message);
      }
});
//logout
authRouter.post("/logout",async(req,res)=>{
    //setting token as null and expires the cookie
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0)   // expires immediately
  });
  res.send("Logout Successfully");
});
module.exports=authRouter;
