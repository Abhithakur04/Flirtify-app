import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (

    <div className="my-2  min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
  <h1 className="font-bold text-yellow-400 text-5xl text-center mb-6">Connections</h1>

  {connections.map((connection) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
    return (
       <div className="my-2 min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
  <h1 className="font-bold text-yellow-400 text-3xl md:text-5xl text-center mb-6">
    Connections
  </h1>

  {connections.map((connection) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
    return (
      <div
        key={_id}
        className="flex flex-col md:flex-row m-4 p-6 md:pb-0 rounded-lg bg-white shadow-xl w-full md:w-2/3 mx-auto mb-6"
      >
        {/* LEFT SIDE (photo + name + about on mobile, only photo on laptop) */}
        <div className="flex items-center md:items-start md:flex-none">
          <img
            className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
            src={photoUrl}
            alt="photo"
          />
          {/* Show name next to photo only on mobile */}
          <div className="ml-4 md:hidden">
            <h2 className="font-bold text-lg text-gray-800">
              {firstName + " " + lastName}
            </h2>
            {age && gender && (
              <p className="text-gray-600 text-sm">{age + " " + gender}</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE (info) */}
        <div className="mt-4 sd:mt-[0.3rem] md:mt-0 md:ml-6 flex-1">
          {/* Name on laptop only */}
          <h2 className="hidden md:block font-bold text-xl text-gray-800">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <p className="hidden md:block text-gray-600">
              {age + " " + gender}
            </p>
          )}
          <p className="text-gray-600">{about}</p>

          {/* Chat button - below text on mobile, right-aligned on laptop */}
          <div className="md:flex md:justify-between md:items-center "><Link to={"/chat/" + _id}>
            <button className="btn btn-primary mt-4 md:mt-2 md:mx-4 md:py-4 md:px-6 md:relative md:top-[-3.25rem] md:left-[46.5rem] ">Chat</button>
          </Link>
          </div>
        </div>
      </div>
    );
  })}
</div>

  );
};

export default Connections;
