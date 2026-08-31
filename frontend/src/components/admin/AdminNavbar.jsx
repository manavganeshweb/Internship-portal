import {
  Bell,
  Search,
  Menu,
  LogOut,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const AdminNavbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const admin = user?.admin || user;

  const handleLogout = () => {
    logout();

    navigate("/admin/login", {
      replace: true,
    });
  };

  const initial =
    admin?.name?.charAt(0)?.toUpperCase() || "A";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notifications */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </motion.button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Admin */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {initial}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {admin?.name || "Administrator"}
            </p>

            <p className="max-w-40 truncate text-xs text-slate-500">
              {admin?.email || "Admin"}
            </p>
          </div>
        </div>

        {/* Mobile Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 lg:hidden"
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;