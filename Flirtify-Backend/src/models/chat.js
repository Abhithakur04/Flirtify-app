const mongoose=require("mongoose");


const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
},
{
    timestamps:true
})
const chatSchema=new mongoose.Schema(
{//in this app we have only two person in the participant but if group chat more than two participant so use array
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
    ],
    //now messages  contain array of different  messages that is why jse messageschema
    messages:[messageSchema]
,   
});
const Chat=mongoose.model("Chat",chatSchema);
module.exports={Chat};