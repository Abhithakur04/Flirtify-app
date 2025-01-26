const mongoose=require("mongoose");
const connectionSchema=mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User" //reference to the user object
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        enum:{
             values:["interested","ignored","accepted","rejected"],
             message:`{VALUE} is incorrect status type`
        },
        required:true
    }
    },
     {timestamps:true });

     connectionSchema.pre("save",function(next){
        const connectionRequest=this;
        if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
            throw new Error("not a valid request")
          }
          next();
     })
const connectionRequest=mongoose.model("connectionRequest",connectionSchema);
module.exports=connectionRequest;