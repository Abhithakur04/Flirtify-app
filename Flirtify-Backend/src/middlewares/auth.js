const jwt=require("jsonwebtoken");
const User = require("../models/user");

const userAuth =  async (req,res,next) => {
    //verify token
    try{
        const {token} = req.cookies;
       if(!token){
         return res.status(401).send("Please Login");
        }
      //if token ,matches it will give me decoded value in this case the data is user id
        const decodedMessage=await jwt.verify(token,"Password@123");

        const {_id}=decodedMessage;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("user not found");
          }
        req.user=user;    
        next();
    }
    catch(err){
        res.status(400).send("Error "+err.message);
    }
};

module.exports={
    userAuth,
};