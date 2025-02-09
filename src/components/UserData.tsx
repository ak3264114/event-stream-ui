import React from "react";
import { useAuth } from "../context/AuthContext";


const UserData: React.FC = () => {
  const { user , logout } = useAuth();


  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <p className="text-gray-800">{user?.name || "N/A"}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <p className="text-gray-800">{user?.email || "N/A"}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
          <p className="text-gray-800">{user?.phone || "N/A"}</p>
        </div>
        <div className="mb-4 flex gap-2 items-center cursor-pointer font-bold text-red-600" onClick={handleLogout}>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default UserData;
