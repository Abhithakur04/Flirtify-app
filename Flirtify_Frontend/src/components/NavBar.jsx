// import axios from "axios";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constant";
// import { removeUser } from "../utils/userSlice";

// const NavBar = () => {
//   const user = useSelector((store) => store.user);
//   const dispatch=useDispatch();
//   const navigate=useNavigate()


//   const handleLogout=async()=>{
//     try{
//       await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
//     //remove token and data from redux
//     dispatch(removeUser());
//     return navigate("/login")
//     } catch(err){
//        console.log(err);
//     }
    
//   }

//   return (
//     <div className="navbar bg-base-200">
//       <div className="flex-1">
//         <Link to="/" className="btn btn-ghost text-xl text-pink-500">💘ConnectU</Link>
//       </div>
//       {user && (
//       <div className="flex-none gap-2">
//          <div className="form-control"> Welcome, {user.firstName}</div>
//           <div className="dropdown dropdown-end mx-5 flex ">
          
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 rounded-full">
//                 <img
//                   src={
//                     photoUrl
//                       ? `${BASE_URL}${photoUrl}`
//                       : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
//                   }
//                   alt="Profile"
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <Link to="/profile" className="justify-between">
//                   Profile
//                   <span className="badge">New</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/connections">Connections</Link>
//               </li>
//               <li>
//                 <Link to="/requests">Requests</Link>
//               </li>
//               <li>
//                 <a onClick={handleLogout}>Logout</a>
//               </li>
//             </ul>
//           </div>
       
//       </div>
//        )}
//     </div>
//   );
// };

// export default NavBar;

import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-md px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-pink-500">
          💘Flirtify
        </Link>
      </div>

      {user ? (
        <div className="flex-none gap-4 items-center">
         {/* <span className="hidden md:block font-medium text-sm text-gray-700 dark:text-white">
  Welcome, <span className="font-semibold">{user.firstName}</span>
</span> */}
<div className="flex items-center gap-1 font-medium text-sm text-gray-700 dark:text-white">
  <span className="hidden md:inline">Welcome,</span>
  <span className="font-semibold">{user.firstName}</span>
</div>


          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photo
                      ? `${BASE_URL}${user.photo}`
                      : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link to="/login" className="btn btn-outline btn-sm">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary btn-sm">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
