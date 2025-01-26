import React from 'react'
import { BASE_URL } from "../utils/constant";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const {_id,firstName,lastName,age,gender,about,photoUrl}=user;
    const dispatch=useDispatch();
    
const handleSendRequest=async(status,userId)=>{
  try{
   const res=await axios.post(BASE_URL+"/sendConnectionRequest/"+ status+"/"+userId,{},{withCredentials:true});
    dispatch(removeUserFromFeed(userId));
  } 
  catch(err){

  }
}


  return (


<div class="card bg-base-300 w-[30rem] shadow-xl rounded-xl p-6">
<figure>
  <img class="w-full h-[19rem] object-cover rounded-t-xl" src= {photoUrl ?photoUrl:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} alt="Shoes"/>
</figure>
<div class="card-body p-6">
  <h2 class="card-title text-3xl font-bold">{firstName+ " " +lastName}</h2>
  {age && gender &&  <p className='flex-grow-0'>{age+ " "+ gender}</p> }
  {about && <p className='flex-grow-0  overflow-y-auto  whitespace-nowrap  resize-none'>{about}</p> }
  <div class="card-actions flex gap-4 justify-center mt-2">
    <button class="btn btn-primary px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors" onClick={()=>handleSendRequest("ignored",_id)} >Ignored</button>
    <button class="btn btn-secondary px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
  </div>
</div>
</div>




  )
}

export default UserCard