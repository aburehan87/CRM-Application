'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const userId = localStorage.getItem('userId');

    if (username && password && userId) {
      setCurrentUser({ id: userId, username, password });
    } else {
      toast.error("User information not found. Please log in again.");
      // router.push('/login');
    }
  }, [router]);

  const done = () => {
    router.push('/dashboard');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("No user logged in");
      return;
    }

    const updateDetails = {
      username: newUserName,
      password: newPassword
    };

    try {
      // console.log("Updating user:", currentUser.id, updateDetails);
      const response = await axios.put(`${ApiUrl}/api/users/${currentUser.id}`, updateDetails);
      // console.log("Update response:", response.data);

      if (response.data.success) {
        setCurrentUser({ ...currentUser, username: newUserName, password: newPassword });
        localStorage.setItem('username', newUserName);
        localStorage.setItem('password', newPassword);
        setIsModalOpen(false);
        toast.success("Profile updated successfully!");
      } else {
        console.error('Update failed:', response.data);
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Error updating user:", err.response ? err.response.data : err.message);
      toast.error(`Error updating profile: ${err.response ? err.response.data.message : err.message}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Profile Details</h1>
        {currentUser ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-indigo-600">Username:<span className="ml-5 text-black">{currentUser.username}</span></p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-indigo-600">Password:<span className="ml-5 text-black">{currentUser.password}</span></p>
            </div>
            {/* <div className="flex justify-between items-center">
              <p className="font-semibold text-indigo-600">User ID:<span className="ml-5 text-black">{currentUser.id}</span></p>
            </div> */}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <div className="w-full flex justify-between"> 
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="w-2/5 mt-6 bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 transition duration-300"
          >
            Update Profile
          </button> */}
          <button
            onClick={done}
            className="w-1/4 mt-6 bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600 transition duration-300"
          >
            Done
          </button>
        </div>

        {/* {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Update Profile</h2>
              <form onSubmit={handleUpdate}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="new-username" className="block text-sm font-medium text-gray-700 mb-1">
                      New Username
                    </label>
                    <input
                      id="new-username"
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )} */}
      </div>
      <ToastContainer />
    </div>
  );
}