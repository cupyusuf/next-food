import React, { useEffect, useState } from 'react';
import "../globals.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCartStore } from '../../stores/cartStore';
import { useOrderStore } from '../../stores/orderStore';
import Swal from 'sweetalert2';

declare global {
  interface Window {
    snap: unknown;
  }
}

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { items } = useCartStore();
  const { placeOrder, payOrder } = useOrderStore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('access_token'));
    }
  }, []);

  const handlePay = async () => {
    if (items.length === 0) return;
    try {
      await placeOrder(items.map(i => ({ food_id: i.food_id, quantity: i.quantity })));
      await Swal.fire({
        icon: 'info',
        title: 'Order dibuat!'
      });
      // Untuk demo, ambil orderId = 1
      const orderId = 1; // Ganti dengan id order sebenarnya
      const snap = await payOrder(orderId);
      if (snap) {
        if (!document.getElementById('midtrans-script')) {
          const script = document.createElement('script');
          script.id = 'midtrans-script';
          script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
          script.setAttribute('data-client-key', 'YOUR_MIDTRANS_CLIENT_KEY');
          document.body.appendChild(script);
          script.onload = () => {
            if (window.snap && typeof (window.snap as { pay: (token: string) => void }).pay === 'function') {
              (window.snap as { pay: (token: string) => void }).pay(snap);
            }
          };
        } else {
          if (window.snap && typeof (window.snap as { pay: (token: string) => void }).pay === 'function') {
            (window.snap as { pay: (token: string) => void }).pay(snap);
          }
        }
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal mendapatkan Snap Token!' });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Gagal membuat order!' });
    }
  };

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
              onClick={() => setShowCart(true)}
              className="text-white hover:text-gray-300 relative"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2 py-0.5">
                  {items.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <main className="p-4">{children}</main>
      {/* Cart Modal Global */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setShowCart(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Cart</h2>
            {items.length === 0 ? (
              <p className="text-center">Cart is empty.</p>
            ) : (
              <ul className="mb-4">
                {items.map((item) => (
                  <li key={item.food_id} className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {item.image_url && (
                        <Image src={item.image_url} alt={item.name} width={40} height={40} className="rounded" />
                      )}
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => useCartStore.getState().updateQuantity(item.food_id, Math.max(1, item.quantity - 1))} className="px-2">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => useCartStore.getState().updateQuantity(item.food_id, item.quantity + 1)} className="px-2">+</button>
                      <button onClick={() => useCartStore.getState().removeFromCart(item.food_id)} className="text-red-600 ml-2">🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">Total: Rp {items.reduce((a, b) => a + b.price * b.quantity, 0)}</span>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handlePay}
                disabled={items.length === 0}
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeLayout;
