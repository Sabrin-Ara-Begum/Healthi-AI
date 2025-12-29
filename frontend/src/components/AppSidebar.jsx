import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  User,
  HelpCircle,
} from "lucide-react";

const tabs = [
  { label: "Home", path: "/", icon: Home },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Account", path: "/account", icon: User },
  { label: "Help", path: "/help", icon: HelpCircle },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-white border-r px-6 py-8">
      <h2 className="text-2xl font-bold text-purple-700 mb-10">
        Healthi 💜
      </h2>

      <nav className="space-y-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = location.pathname === tab.path;

          return (
            <Link
              key={tab.label}
              to={tab.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  active
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon size={20} />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
