"use client";

import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import useUserStore from '../../stores/userStore';

const DashboardPage: React.FC = () => {
  const { name, setUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '/login'; // Immediate redirect to login
    } else {
      const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userInfo);

      if (!userInfo.phone || !userInfo.address) {
        Swal.fire({
          icon: 'info',
          title: 'Profile Incomplete',
          text: 'Please update your profile information.',
        }).then(() => {
          window.location.href = '/profile'; // Redirect to profile update page
        });
      }
    }
  }, [setUser]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800 text-white p-4 flex justify-end">
        <span className="font-semibold">{name}</span>
      </header>

      {/* Content */}
      <main className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your orders and account here.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FontAwesomeIcon icon={faUser} className="text-blue-400 text-3xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Account Details</h2>
            <p className="text-gray-400">View and update your account information.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FontAwesomeIcon icon={faClipboardList} className="text-blue-400 text-3xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Order History</h2>
            <p className="text-gray-400">Check your past orders and their statuses.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
