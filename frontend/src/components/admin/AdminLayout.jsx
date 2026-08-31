import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { X } from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenu && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Overlay */}
            <motion.button
              type="button"
              aria-label="Close sidebar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-black/50"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="relative h-full w-72 bg-slate-950 text-white shadow-2xl"
            >
              <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
                <div>
                  <h1 className="text-lg font-bold">Nexavision</h1>
                  <p className="text-xs text-slate-400">LMS Admin</p>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <AdminSidebar
                mobile
                onNavigate={() => setMobileMenu(false)}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pl-64">
        <AdminNavbar
          onMenuClick={() => setMobileMenu(true)}
        />

        <main className="min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;