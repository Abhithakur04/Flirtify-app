import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import axios from 'axios';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest=async(status,_id)=>{
    try{
    const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
    dispatch(removeRequests(_id));
    }
    catch(err){
      
    }
  }

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) return;
  if (requests.length === 0) return <h1 className="">No Requests Found</h1>;

  return (
    <div className=" my-10">
      <h1 className="font-bold text-white text-5xl">Connection Requests</h1>

      {requests.map((request) => {
        const {_id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div key={_id} className="flex justify-between items-center m-4 p-4  rounded-lg  bg-base-300 w-1/2 mx-auto">
            <img
              className="w-20 h-20 rounded-full"
              src={photoUrl}
              alt="photo"
            />
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + "  " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2" onClick={()=> reviewRequest("rejected",request._id)}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={()=> reviewRequest("accepted",request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
