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
    // <div className=" my-10">
    //   <h1 className="font-bold text-white text-5xl">Connections</h1>

    //   {connections.map((connection) => {
    //     const { _id, firstName, lastName, photoUrl, age, gender, about } =
    //       connection;
    //     return (
    //       <div
    //         key={_id}
    //         className=" flex m-4 p-4  rounded-lg  bg-base-300 w-2/3 mx-auto"
    //       >
    //         <img
    //           className="w-20 h-20 rounded-full object-cover"
    //           src={photoUrl}
    //           alt="photo"
    //         />
    //         <div className="text-left mx-4">
    //           <h2 className="font-bold text-xl">
    //             {firstName + " " + lastName}
    //           </h2>
    //           {age && gender && <p>{age + "  " + gender}</p>}
    //           <p>{about}</p>
    //         </div>
    //         <Link to={"/chat/" + _id}>
    //           <button className="btn btn-primary">Chat</button>{" "}
    //         </Link>
    //       </div>
    //     );
    //   })}
    // </div>  

    <div className="my-2  min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
  <h1 className="font-bold text-yellow-400 text-5xl text-center mb-6">Connections</h1>

  {connections.map((connection) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
    return (
      <div
        key={_id}
        className="flex m-4 p-6 rounded-lg bg-white shadow-xl w-2/3 mx-auto mb-6"
      >
        <img
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
          src={photoUrl}
          alt="photo"
        />
        <div className="text-left mx-6">
          <h2 className="font-bold text-xl text-gray-800">{firstName + " " + lastName}</h2>
          {age && gender && <p className="text-gray-600">{age + "  " + gender}</p>}
          <p className="text-gray-600">{about}</p>
        </div>
        <Link to={"/chat/" + _id}>
          <button className="btn btn-primary mt-4">Chat</button>
        </Link>
      </div>
    );
  })}
</div>

  );
};

export default Connections;
