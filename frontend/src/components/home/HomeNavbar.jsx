
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import logo from "../../../public/logo.png";

const HomeNavbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    {
      name: "Courses",
      path: "/courses",
    },
    {
      name: "Internships",
      path: "/internships",
    },
    {
      name: "Learning",
      path: "/learning",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
            <img
              src={logo}
              alt="Nexavision"
              className="h-full w-full object-contain"
            />
          </div>

          <span className="text-xl font-bold text-gray-900">
            Nexavision
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t border-gray-100 bg-white px-6 py-5 md:hidden"
        >
          <nav className="flex flex-col">

            {links.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={closeMenu}
                  className={`border-b border-gray-100 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Login */}
            <Link
              to="/login"
              onClick={closeMenu}
              className="py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>

            {/* Get Started */}
            <Link
              to="/register"
              onClick={closeMenu}
              className="mt-2 rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Get Started
            </Link>

          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default HomeNavbar;
