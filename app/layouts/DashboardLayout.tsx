const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-300">
      <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <div className="p-4 text-center font-bold text-xl border-b border-gray-700">Dashboard</div>
          <nav className="flex-1 p-4 space-y-2">
            <a href="/food" className="flex items-center p-2 rounded hover:bg-gray-700">
              Management Food
            </a>
            <a href="/profile" className="flex items-center p-2 rounded hover:bg-gray-700">
              Profile
            </a>
          </nav>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user'); // Remove user data
            window.location.href = '/';
          }}
          className="p-4 bg-red-600 hover:bg-red-700 text-white text-center"
        >
          Logout
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
