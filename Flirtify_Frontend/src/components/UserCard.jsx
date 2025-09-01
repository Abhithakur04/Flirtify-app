
import React from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/sendConnectionRequest/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="card bg-base-300 w-[30rem] shadow-xl rounded-xl p-6">
      <figure>
        <img
          className="w-40 h-40 rounded-full object-cover"
          src={
            photoUrl
              ? `${BASE_URL}${photoUrl}`
              : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          }
          alt="Profile"
        />
      </figure>
      <div className="card-body p-6 text-center">
        <h2 className="card-title text-3xl font-bold text-gray-800 dark:text-white">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {age} • {gender}
          </p>
        )}
        {about && (
          <p className="text-gray-600 dark:text-gray-200 text-sm mt-2 max-h-24 overflow-y-auto break-words">
            {about}
          </p>
        )}
        <div className="card-actions flex gap-4 justify-center mt-4">
          <button
            className="btn btn-success px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-info px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
