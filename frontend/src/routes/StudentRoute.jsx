import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StudentRoute = () => {
  const { isAuthenticated, isStudent, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isStudent) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default StudentRoute;