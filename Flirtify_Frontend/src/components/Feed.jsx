import axios from 'axios';
import React,{useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constant';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';



const Feed = () => {
  const feed=useSelector(store => store.feed)
  const dispatch=useDispatch();


  const getFeed=async()=>{
    if(feed)  return;
    try{
      const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
      dispatch(addFeed(res.data));
    } catch(err){
      (<h1>{err.mesage}</h1>)
        console.log(err);
    }

  }
  useEffect(() => {
    getFeed();   
  }, [])
  

  if(!feed) return ;
  if(feed.length==0) return <h1 className='flex justify-center my-10'>No new Users found</h1>
  return (
    feed &&  (<div className='flex justify-center items-center h-[82vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
     <UserCard user={feed[0]}/>
    </div>
    )
    
  )
}

export default Feed