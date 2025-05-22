import React, { useEffect, useState } from 'react';
import "../globals.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('access_token'));
    }
  }, []);

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/vercel.svg"
              width={36}
              height={36}
              alt="Food Order Logo"
            />
            <span className="text-white text-xl font-semibold ml-2">Food Order App</span>
          </div>
          <div className="space-x-4 flex items-center">
            <button
              onClick={() => router.push('/')}
              className="text-white hover:text-gray-300"
            >
              Home
            </button>
            {isLoggedIn && (
              <button
                onClick={() => router.push('/dashboard')}
                className="text-white hover:text-gray-300"
              >
                Dashboard
              </button>
            )}
            {!isLoggedIn && (
              <>
                <button
                  onClick={() => router.push('/login')}
                  className="text-white hover:text-gray-300"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push('/register')}
                  className="text-white hover:text-gray-300"
                >
                  Register
                </button>
              </>
            )}
            <button
              onClick={() => router.push('/cart')}
              className="text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
        </div>
      </nav>
      <main className="p-4">{children}</main>
    </>
  );
};

export default HomeLayout;
