import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  Users,
  FileText,
  Video,
  ClipboardList,
  BarChart3,
  Settings,
  GraduationCap,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import { useAuth } from "../../context/AuthContext";

const menu = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Courses",
    path: "/admin/courses",
    icon: BookOpen,
  },
  {
    label: "Internships",
    path: "/admin/internships",
    icon: Briefcase,
  },
  {
    label: "Students",
    path: "/admin/students",
    icon: Users,
  },
  {
    label: "Applications",
    path: "/admin/applications",
    icon: FileText,
  },
  {
    label: "Lessons",
    path: "/admin/content/lessons",
    icon: GraduationCap,
  },
  {
    label: "Videos",
    path: "/admin/content/videos",
    icon: Video,
  },
  {
    label: "Assignments",
    path: "/admin/content/assignments",
    icon: ClipboardList,
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
];

const settings = [
  {
    label: "Profile",
    path: "/admin/settings/profile",
  },
  {
    label: "Roles",
    path: "/admin/settings/roles",
  },
  {
    label: "System",
    path: "/admin/settings/system",
  },
];

const AdminSidebar = ({
  mobile = false,
  onNavigate,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate?.();
    navigate("/admin/login", {
      replace: true,
    });
  };

  const handleNavigation = () => {
    onNavigate?.();
  };

  const sidebarContent = (
    <>
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <div className="space-y-1">
          {menu.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.path}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.03,
                }}
              >
                <NavLink
                  to={item.path}
                  onClick={handleNavigation}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <span>{item.label}</span>
                </NavLink>
              </motion.div>
            );
          })}
        </div>

        {/* Settings */}
        <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Settings
        </p>

        <div className="space-y-1">
          {settings.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{
                opacity: 0,
                x: -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.3 + index * 0.05,
              }}
            >
              <NavLink
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Settings className="h-5 w-5" />

                <span>{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />

          Logout
        </button>
      </div>
    </>
  );

  {/* Mobile */}
  if (mobile) {
    return (
      <div className="flex h-[calc(100vh-5rem)] flex-col">
        {sidebarContent}
      </div>
    );
  }

  {/* Desktop */}
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-slate-950 text-white lg:flex">
      {/* Brand */}
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-white/10 px-6">
        <div className="rounded-xl bg-blue-600 p-2.5">
          <GraduationCap className="h-6 w-6" />
        </div>

        <div>
          <h1 className="font-bold">
            Nexavision
          </h1>

          <p className="text-xs text-slate-400">
            LMS Admin
          </p>
        </div>
      </div>

      {sidebarContent}
    </aside>
  );
};

export default AdminSidebar;