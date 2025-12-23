import { Stethoscope, Calendar, MessageSquare, ShoppingCart } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function Sidebar() {
  const links = [
    { name: "Find Doctor", icon: <Stethoscope />, path: "/find-doctor" },
    { name: "Appointments", icon: <Calendar />, path: "/appointments" },
    { name: "Messages", icon: <MessageSquare />, path: "/messages" },
    { name: "Pharmacy", icon: <ShoppingCart />, path: "/pharmacy" },
  ]

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-6 hidden lg:block">
      <h2 className="text-2xl font-bold text-purple-600 mb-10">
        HealthiAI
      </h2>

      <nav className="flex flex-col gap-4">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 ${
                isActive ? "bg-purple-100 font-semibold" : ""
              }`
            }
          >
            <span className="text-purple-600">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
