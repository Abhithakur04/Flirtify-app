const validator=require("validator");


const signupValidation=(req)=>{
  const {firstName,lastName,emailId,password}=req.body;
   if(!firstName || !lastName){
    throw new Error("Enter firstname or lastname");
   }
   if(firstName.length<4 || firstName.length>50){
    throw new Error("firstname should be 4-50 character");
   }
   if(!validator.isEmail(emailId)){
    throw new Error("Invlid email id");
   }
   if(!validator.isStrongPassword(password)){
    throw new Error("enter strong passwword");
   }
}



const userEditValidation=(req)=>{
  const dataPresent=["firstName","lastName","photoUrl","age","gender","about"];
  const isEditprofile=Object.keys(req.body).every(field=>  dataPresent.includes(field));
    return isEditprofile;
}

module.exports={signupValidation,userEditValidation};

