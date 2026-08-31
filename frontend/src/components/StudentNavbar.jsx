import {
  Award,
  Bell,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../../public/logo.png";
import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Courses",
    path: "/student/courses",
    icon: BookOpen,
  },
  {
    name: "My Learning",
    path: "/student/learning",
    icon: GraduationCap,
  },
  {
    name: "Internships",
    path: "/student/internships",
    icon: Briefcase,
  },
  {
    name: "Applications",
    path: "/student/applications",
    icon: FileText,
  },
  {
    name: "Certificates",
    path: "/student/certificates",
    icon: Award,
  },
];

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setMobileOpen(false);
    navigate("/login", { replace: true });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/student/dashboard"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
        ><div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
                    <img
                      src={logo}
                      alt="Nexavision"
                      className="h-full w-full object-contain"
                    />
                  </div>

          <span className="text-xl font-bold text-slate-900">
            Nexavision
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <Icon size={17} />

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell size={20} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
          </button>

          <Link
            to="/student/profile"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              location.pathname === "/student/profile"
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <User size={18} />
            Profile
          </Link>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={
            mobileOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          onClick={() => setMobileOpen((value) => !value)}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}

            <Link
              to="/student/profile"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                location.pathname === "/student/profile"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <User size={18} />
              Profile
            </Link>

            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default StudentNavbar;