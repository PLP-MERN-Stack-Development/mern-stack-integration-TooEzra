// client/src/components/Navbar.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            MERN Blog
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-2 py-1 text-sm sm:text-base">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/create" className="text-gray-700 hover:text-blue-600 px-2 py-1 text-sm sm:text-base">
                  Write
                </Link>
                <span className="text-gray-600 hidden sm:inline">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-2 py-1 text-sm sm:text-base">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}