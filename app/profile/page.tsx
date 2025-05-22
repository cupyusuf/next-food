"use client";

import React, { useEffect } from 'react';
import { updateUserProfile } from '../../services/api';
import Swal from 'sweetalert2';
import useUserStore from '../../stores/userStore';

// Ensure `phone` and `address` are always strings for input compatibility

const ProfilePage: React.FC = () => {
  const { name, phone, address, setUser } = useUserStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(user);
    }
  }, [setUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = { name, phone, address }; // Kirim name, phone, address
      const response = await updateUserProfile(updatedUser); // Send updated profile to API
      localStorage.setItem('user', JSON.stringify(response)); // Update localStorage with new user data
      setUser(response); // Update Zustand store
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully.',
        showConfirmButton: false,
        timer: 2000
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update profile. Please try again.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <main className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-100 mb-6 text-center">Update Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setUser({ ...useUserStore.getState(), name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300">Phone:</label>
            <input
              type="text"
              value={phone || ''}
              onChange={(e) => setUser({ ...useUserStore.getState(), phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300">Address:</label>
            <input
              type="text"
              value={address || ''}
              onChange={(e) => setUser({ ...useUserStore.getState(), address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </main>
  );
};

export default ProfilePage;
