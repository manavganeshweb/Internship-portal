import { Outlet } from "react-router-dom";

import HomeNavbar from "./HomeNavbar";
import HomeFooter from "./HomeFooter";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <HomeNavbar />

      <main className="pt-[73px]">
        <Outlet />
      </main>

      <HomeFooter />
    </div>
  );
};

export default PublicLayout;