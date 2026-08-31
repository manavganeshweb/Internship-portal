import { Outlet } from "react-router-dom";
import StudentNavbar from "../StudentNavbar";
import Footer from "../Footer";


const StudentLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <StudentNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default StudentLayout;