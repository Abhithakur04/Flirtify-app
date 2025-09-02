 const mongoose=require("mongoose");
 const validator=require("validator");
 const bcrypt=require("bcrypt");
 const jwt=require("jsonwebtoken");
   const userSchema=mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String,
        minLength:4,
    },
    emailId:{
         type:String,
         required:true,
         unique:true,
         lowercase:true,
         trim:true,
         validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invlid email id");
            }
         }
       
    },
    password:{
        type:String,
        required:true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("enter strong passwword")
            }
         }
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                  throw new Error("Not matched gender");
            }           
        }
    },
    skills:{
        type:[String]
    },
    photoUrl:{
        type:String
       },
       role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user'
},
       about:{
        type:String,
        default:"This is default section"
       }
   },
   
   {
    timestamps:true
   }
   );
   //make a helper function when a user instance make then a token created
   userSchema.methods.getJWT=async function(){
     user=this;
    const token=await jwt.sign({_id:user._id,role: user.role},"Password@123",{expiresIn:"1d"});   
    return token;
   }
   userSchema.methods.validatePassword=async function (userEnterPassword) {
    const passwordHash=this.password;
    const isPasswordValid=await bcrypt.compare(userEnterPassword,passwordHash);
    return isPasswordValid;
   }
   const User=mongoose.model("User",userSchema);
   module.exports=User;
