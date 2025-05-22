"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { loginUser } from '../../services/api';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log('Login response:', response);
      if (response.access_token && response.user) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        await Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 2000
        });
        router.push('/dashboard');
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Login failed. Invalid response.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      let msg = 'Login failed. Please check your credentials.';
      const axiosErr = error as { response?: { data?: { message?: string } } };
      if (axiosErr?.response?.data?.message) {
        msg = axiosErr.response.data.message;
      }
      await Swal.fire({
        icon: 'error',
        title: msg,
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <main className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-100 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
