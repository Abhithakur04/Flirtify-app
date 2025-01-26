import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
//body have two children that is login and profile then instead of writing the code ofb body in both components we use Outlet
// body
//   --login
//   --profile
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //if token is not valid then move to login page previously if i refresh after login then it clear data from redux and make as i am not login because data is coming from redux
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
