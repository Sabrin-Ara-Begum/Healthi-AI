// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Healthy AI</Link>
        </div>

        {/* Navigation links */}
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-semibold border-b-2 border-white"
                : "hover:opacity-80"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "font-semibold border-b-2 border-white"
                : "hover:opacity-80"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/qa"
            className={({ isActive }) =>
              isActive
                ? "font-semibold border-b-2 border-white"
                : "hover:opacity-80"
            }
          >
            QnA
          </NavLink>
          <NavLink
            to="/mental-health"
            className={({ isActive }) =>
              isActive
                ? "font-semibold border-b-2 border-white"
                : "hover:opacity-80"
            }
          >
            Mental Health
          </NavLink>
          <NavLink
            to="/pregnancy-care"
            className={({ isActive }) =>
              isActive
                ? "font-semibold border-b-2 border-white"
                : "hover:opacity-80"
            }
          >
            Pregnancy Care
          </NavLink>
        </div>

        {/* Login/Signup */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-purple-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}
