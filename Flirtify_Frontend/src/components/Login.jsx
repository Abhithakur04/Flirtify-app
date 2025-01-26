import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate,Link } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {

  const [emailId, setEmailId] = useState("ashwin@gmail.com");
  const [password, setPassword] = useState("Ashwin@123");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };


  return (
    <div className={`flex justify-center items-center h-[78vh]  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden`}>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body p-8">
          <h2 className="card-title text-center text-3xl font-semibold ml-[78px] text-white mb-6">
            Login
          </h2>

          <div className="space-y-4"> 
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white">Email ID</span>
              </label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <p className="text-red-500 mt-2 text-center">{error}</p>

          <div className="card-actions justify-center mt-6">
            <button
              className="btn btn-primary w-full py-3 text-lg font-semibold shadow-lg"
              onClick={handleLogin }
            >
              Login
            </button>
          </div>

  
          <Link to='/signup' className="m-auto mt-4 text-center text-white cursor-pointer hover:text-blue-500 hover:underline transition-all">New User? Sign Up Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
