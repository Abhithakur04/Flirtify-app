import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");
  const [showToster, setShowToster] = useState(false);

  const dispatch = useDispatch();

  const uploadPhoto = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/upload-photo/${user._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPhotoUrl(res.data.photoUrl);
     
    } catch (err) {
      console.error("Upload failed", err);
      setError("Failed to upload photo");
    }
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToster(true);
      setTimeout(() => {
        setShowToster(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
             <div className="flex justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-auto py-8">

        <div className="flex justify-center mx-10 my-4 text-white">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-white">
                Edit Profile
              </h2>
              <label className="form-control w-full max-w-xs my-4">
                <div className="label">
                  <span className="label-text text-white">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs my-4">
                <div className="label">
                  <span className="label-text text-white">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs my-4">
                <div className="label">
                  <span className="label-text text-white">Profile Photo</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadPhoto(e.target.files[0])}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs my-4">
                <div className="label">
                  <span className="label-text text-white">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs my-4">
                <div className="label">
                  <span className="label-text text-white">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs my-4">
                <div className="label">
                  <span className="label-text text-white">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary mt-[-26px]"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>
      {showToster && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;





// import React, { useState } from "react";
// import UserCard from "./UserCard";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import axios from "axios";

// const EditProfile = ({ user }) => {
//   const [firstName, setFirstName] = useState(user.firstName);
//   const [lastName, setLastName] = useState(user.lastName);
//   const [age, setAge] = useState(user.age || "");
//   const [gender, setGender] = useState(user.gender || "");
//   const [about, setAbout] = useState(user.about || "");
//   const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
//   const [error, setError] = useState("");
//   const [showToster,setShowToster]=useState(false);

// const dispatch=useDispatch();
//   const saveProfile = async () => {
//     setError("");
//     try {
//       const res = await axios.patch(BASE_URL + "/profile/edit", {
//         firstName,
//         lastName,
//         photoUrl,
//         age,
//         gender,
//         about,
       
//       },{withCredentials:true});
//       dispatch(addUser(res?.data?.data))
//       setShowToster(true);
//       setTimeout(()=>{
//         setShowToster(false)
//       },3000);

//     } catch (error) {
//         setError(error.res.data)
//     }
//   };

//   return (
//     <>
//     <div className="flex justify-center h-[115vh]  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className="flex justify-center mx-10 my-4 text-white">
//         <div className="card bg-base-300 w-96 shadow-xl  ">
//           <div className="card-body">
//             <h2 className="card-title justify-center text-white">
//               Edit Profile
//             </h2>
//             <div>
//               <label className="form-control w-full max-w-xs my-4">
//                 <div className="label">
//                   <span className="label-text text-white">First Name</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="input input-bordered w-full max-w-xs"
//                 />
//               </label>
//               <label className="form-control w-full max-w-xs my-4">
//                 <div className="label">
//                   <span className="label-text text-white">Last Name</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="input input-bordered w-full max-w-xs"
//                 />
//               </label>
//               <label className="form-control w-full max-w-xs my-4">
//                 <div className="label">
//                   <span className="label-text text-white">Photo URL</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={photoUrl}
//                   onChange={(e) => setPhotoUrl(e.target.value)}
//                   className="input input-bordered w-full max-w-xs"
//                 />
//               </label>
//               <label className="form-control w-full max-w-xs my-4">
//                 <div className="label">
//                   <span className="label-text text-white">Age</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                   className="input input-bordered w-full max-w-xs"
//                 />
//               </label>
//               <label className="form-control w-full max-w-xs my-4">
//                 <div className="label">
//                   <span className="label-text text-white">Gender</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   className="input input-bordered w-full max-w-xs"
//                 />
//               </label>
//               <label className="form-control w-full max-w-xs my-4">
//                 <div className="label">
//                   <span className="label-text text-white">about</span>
//                 </div>
//                 <input
//                   type="text"
//                   value={about}
//                   onChange={(e) => setAbout(e.target.value)}
//                   className="input input-bordered w-full max-w-xs"
//                 />
//               </label>
//             </div>
//             <p className="text-red-500">{error}</p>
            
//             <div className="card-actions justify-center ">
//               <button className="btn btn-primary mt-[-26px]" onClick={saveProfile}>Save Profile</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="my-4"><UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} /></div>
//     </div>
//     {showToster &&   <div className="toast toast-top toast-center">
    
//     <div className="alert alert-success">
//       <span>Profile Saved Sucessfully</span>
//     </div>
//   </div>}
//   </>
//   );
// };

// export default EditProfile;
