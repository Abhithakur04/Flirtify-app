import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/constant';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL+"/admin/users", { withCredentials: true });
      
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users");
      if (err.response?.status === 401) navigate("/admin-login");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setUpdatedUser(user);
  };

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const saveUpdate = async () => {
    try {
      await axios.put(BASE_URL+`/admin/users/${editingUser}`, updatedUser, {
        withCredentials: true
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert("Update failed");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(BASE_URL+`/admin/users/${id}`, { withCredentials: true });
        fetchUsers();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL+"/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Admin Dashboard - Manage Users</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Age</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              editingUser === user._id ? (
                <tr key={user._id} className="bg-yellow-50">
                  <td className="p-2">
                    <input
                      name="firstName"
                      value={updatedUser.firstName || ""}
                      onChange={handleInputChange}
                      className="border p-1 w-24"
                    />
                    <input
                      name="lastName"
                      value={updatedUser.lastName || ""}
                      onChange={handleInputChange}
                      className="border p-1 ml-2 w-24"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      name="age"
                      value={updatedUser.age || ""}
                      onChange={handleInputChange}
                      className="border p-1 w-16"
                    />
                  </td>
                  <td className="p-2">
                    <select
                      name="gender"
                      value={updatedUser.gender || ""}
                      onChange={handleInputChange}
                      className="border p-1"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={saveUpdate}
                      className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={user._id} className="border-t">
                  <td className="p-2">{user.firstName} {user.lastName}</td>
                  <td className="p-2">{user.age}</td>
                  <td className="p-2">{user.gender}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
