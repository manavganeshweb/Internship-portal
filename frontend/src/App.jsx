import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AdminLogin from "./pages/auth/AdminLogin";


// Public
import Home from "./pages/home";
import StudentLogin from "./pages/auth/StudentLogin";
import StudentRegister from "./pages/auth/StudentRegister";
import About from "./pages/About";
import {
  PublicCourses,
  PublicInternships,
  PublicLearning,
} from "./pages/PublicPages";
import PublicLayout from "./components/home/PublicLayout";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import Courses from "./pages/student/Courses";
import CourseDetails from "./pages/student/CourseDetails";
import CourseLearning from "./pages/student/CourseLearning";
import InternshipDetails from "./pages/student/InternshipDetails";
import MyLearning from "./pages/student/MyLearning";
import Internships from "./pages/student/Internships";
import Certificates from "./pages/student/Certificates";
import StudentProfile from "./pages/student/Profile";
import StudentLayout from "./components/student/StudentLayout";
import ApplyInternship from "./pages/student/ApplyInternship";
import MyApplications from "./pages/student/MyApplications";
import ApplicationDetails from "./pages/student/ApplicationDetails";


// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminCourses from "./pages/admin/AdminCourses";
import CreateCourse from "./pages/admin/CreateCourse";
import CourseContent from "./pages/admin/CourseContent";
import EditCourse from "./pages/admin/EditCourse";
import AdminInternships from "./pages/admin/internships/AdminInternships";
import EditInternship from "./pages/admin/internships/EditInternship";
import CreateInternship from "./pages/admin/internships/CreateInternship";

import StudentList from "./pages/admin/students/StudentList";
import StudentDetails from "./pages/admin/students/StudentDetails";
import ApplicationManagement from "./pages/admin/students/ApplicationManagement";

import LessonManagement from "./pages/admin/content/LessonManagement";
import VideoUpload from "./pages/admin/content/VideoUpload";
import AssignmentManagement from "./pages/admin/content/AssignmentManagement";


import DashboardAnalytics from "./pages/admin/analytics/DashboardAnalytics";
import RevenueAnalytics from "./pages/admin/analytics/RevenueAnalytics";
import StudentProgressAnalytics from "./pages/admin/analytics/StudentProgressAnalytics";


import ProfileSettings from "./pages/admin/settings/ProfileSettings";
import RoleManagement from "./pages/admin/settings/RoleManagement";
import SystemSettings from "./pages/admin/settings/SystemSettings";


// Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentRoute from "./routes/StudentRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminNavbar from "./components/admin/AdminNavbar";



function App(){


return (

<BrowserRouter>


<Routes>


{/* ================= PUBLIC ================= */}



<Route
path="/admin/login"
element={<AdminLogin />}
/>

{/* ================= PUBLIC ================= */}

<Route element={<PublicLayout />}>
  <Route path="/" element={<Home />} />

  <Route
    path="/courses"
    element={<PublicCourses />}
  />

  <Route
    path="/internships"
    element={<PublicInternships />}
  />

  <Route
    path="/learning"
    element={<PublicLearning />}
  />

  <Route
    path="/about"
    element={<About />}
  />
</Route>

{/* ================= AUTH ================= */}



<Route
path="/login"
element={<StudentLogin />}
/>


<Route
path="/register"
element={<StudentRegister />}
/>




{/* ================= STUDENT ================= */}



<Route element={<ProtectedRoute />}>
  <Route element={<StudentRoute />}>
    <Route element={<StudentLayout />}>

      {/* Dashboard */}
      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />

      {/* Courses */}
      <Route
        path="/student/courses"
        element={<Courses />}
      />

      <Route
        path="/student/courses/:courseId"
        element={<CourseDetails />}
      />

      <Route
        path="/student/courses/:courseId/learn"
        element={<CourseLearning />}
      />

      {/* My Learning */}
      <Route
        path="/student/learning"
        element={<MyLearning />}
      />

      {/* Internships */}
      <Route
        path="/student/internships"
        element={<Internships />}
      />

      <Route
  path="/student/internships/:id"
  element={<InternshipDetails />}
/>

  

      {/* Certificates */}
      <Route
        path="/student/certificates"
        element={<Certificates />}
      />

      <Route
  path="/student/internships/:id/apply"
  element={<ApplyInternship />}
/>

<Route
  path="/student/applications"
  element={<MyApplications />}
/>

<Route
  path="/student/applications/:id"
  element={<ApplicationDetails />}
/>

      {/* Profile */}
      <Route
        path="/student/profile"
        element={<StudentProfile />}
      />

    </Route>
  </Route>
</Route>





{/* ================= ADMIN ================= */}
<Route element={<ProtectedRoute />}>
  <Route element={<AdminRoute />}>
    <Route element={<AdminLayout />}>

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/courses"
        element={<AdminCourses />}
      />

      <Route
        path="/admin/courses/create"
        element={<CreateCourse />}
      />

      <Route
        path="/admin/courses/:id/edit"
        element={<EditCourse />}
      />

      <Route
        path="/admin/courses/:courseId/content"
        element={<CourseContent />}
      />

      <Route
        path="/admin/internships"
        element={<AdminInternships />}
      />


<Route
  path="/admin/internships/create"
  element={<CreateInternship />}
/>

      <Route
        path="/admin/internships/edit/:id"
        element={<EditInternship />}
      />

      <Route
        path="/admin/students"
        element={<StudentList />}
      />

      <Route
        path="/admin/students/:id"
        element={<StudentDetails />}
      />

      <Route
        path="/admin/applications"
        element={<ApplicationManagement />}
      />

      <Route
        path="/admin/content/lessons"
        element={<LessonManagement />}
      />

      <Route
        path="/admin/content/videos"
        element={<VideoUpload />}
      />

      <Route
        path="/admin/content/assignments"
        element={<AssignmentManagement />}
      />

      <Route
        path="/admin/analytics"
        element={<DashboardAnalytics />}
      />

      <Route
        path="/admin/analytics/revenue"
        element={<RevenueAnalytics />}
      />

      <Route
        path="/admin/analytics/student-progress"
        element={<StudentProgressAnalytics />}
      />

      <Route
        path="/admin/settings/profile"
        element={<ProfileSettings />}
      />

      <Route
        path="/admin/settings/roles"
        element={<RoleManagement />}
      />

      <Route
        path="/admin/settings/system"
        element={<SystemSettings />}
      />

    </Route>
  </Route>
</Route>



</Routes>


</BrowserRouter>


);


}


export default App;