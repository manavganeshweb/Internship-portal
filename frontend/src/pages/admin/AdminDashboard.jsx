import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Briefcase,
  FileText,
  TrendingUp,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAllCourses } from "../../api/adminCourseApi";
import { getAllInternships } from "../../api/adminInternshipApi";
import {
  getAllStudents,
  getApplications,
} from "../../api/adminStudentApi";


const getArray = (response, keys = []) => {
  if (Array.isArray(response)) {
    return response;
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  for (const key of keys) {
    if (Array.isArray(response[key])) {
      return response[key];
    }
  }

  return [];
};


const getItemDate = (item) => {
  const value =
    item?.createdAt ||
    item?.updatedAt ||
    item?.date ||
    item?.created_at;

  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
};


const getTimeAgo = (date) => {
  if (!date) {
    return "Recently";
  }

  const difference =
    Date.now() - date.getTime();

  const minutes = Math.floor(
    difference / 60000
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${
      minutes === 1 ? "" : "s"
    } ago`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours} hour${
      hours === 1 ? "" : "s"
    } ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  if (days === 1) {
    return "Yesterday";
  }

  return `${days} days ago`;
};


const buildActivities = (
  students,
  courses,
  internships,
  applications
) => {
  const activities = [];

  students.forEach((student) => {
    const date = getItemDate(student);

    activities.push({
      type: "student",
      title: "New student registered",
      user:
        student?.name ||
        student?.fullName ||
        student?.email ||
        "Student",
      date,
    });
  });

  courses.forEach((course) => {
    const date = getItemDate(course);

    activities.push({
      type: "course",
      title: "New course added",
      user:
        course?.title ||
        course?.name ||
        "Course",
      date,
    });
  });

  internships.forEach((internship) => {
    const date = getItemDate(internship);

    activities.push({
      type: "internship",
      title: "Internship added",
      user:
        internship?.title ||
        internship?.name ||
        "Internship",
      date,
    });
  });

  applications.forEach((application) => {
    const date = getItemDate(application);

    activities.push({
      type: "application",
      title: "Internship application received",
      user:
        application?.student?.name ||
        application?.studentName ||
        application?.name ||
        application?.email ||
        "Application",
      date,
    });
  });

  return activities
    .sort((a, b) => {
      if (!a.date && !b.date) {
        return 0;
      }

      if (!a.date) {
        return 1;
      }

      if (!b.date) {
        return -1;
      }

      return b.date - a.date;
    })
    .slice(0, 5);
};


const AdminDashboard = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [internships, setInternships] =
    useState([]);
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


const loadDashboard = async () => {
  try {
    setLoading(true);
    setError("");

    const results = await Promise.allSettled([
      getAllStudents(),
      getAllCourses(),
      getAllInternships(),
      getApplications(),
    ]);

    const [
      studentsResult,
      coursesResult,
      internshipsResult,
      applicationsResult,
    ] = results;

    if (studentsResult.status === "fulfilled") {
      setStudents(
        getArray(studentsResult.value, [
          "students",
          "data",
          "users",
        ])
      );
    } else {
      console.error(
        "Students API error:",
        studentsResult.reason
      );
    }

    if (coursesResult.status === "fulfilled") {
      setCourses(
        getArray(coursesResult.value, [
          "courses",
          "data",
        ])
      );
    } else {
      console.error(
        "Courses API error:",
        coursesResult.reason
      );
    }

    if (internshipsResult.status === "fulfilled") {
      setInternships(
        getArray(internshipsResult.value, [
          "internships",
          "data",
        ])
      );
    } else {
      console.error(
        "Internships API error:",
        internshipsResult.reason
      );
    }

    if (applicationsResult.status === "fulfilled") {
      setApplications(
        getArray(applicationsResult.value, [
          "applications",
          "data",
        ])
      );
    } else {
      console.error(
        "Applications API error:",
        applicationsResult.reason
      );
    }

    const failedRequests = results.filter(
      (result) => result.status === "rejected"
    );

    if (failedRequests.length === results.length) {
      throw new Error(
        "Unable to load dashboard data. Please check your server and login session."
      );
    }
  } catch (error) {
    console.error("Admin dashboard error:", error);

    setError(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to load dashboard data."
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadDashboard();
  }, []);


  const activities = buildActivities(
    students,
    courses,
    internships,
    applications
  );


  const stats = [
    {
      title: "Total Students",
      value: students.length,
      icon: Users,
      path: "/admin/students",
    },
    {
      title: "Active Courses",
      value: courses.length,
      icon: BookOpen,
      path: "/admin/courses",
    },
    {
      title: "Internships",
      value: internships.length,
      icon: Briefcase,
      path: "/admin/internships",
    },
    {
      title: "Applications",
      value: applications.length,
      icon: FileText,
      path: "/admin/applications",
    },
  ];


  const quickActions = [
    {
      title: "Add Course",
      icon: BookOpen,
      path: "/admin/courses/create",
    },
    {
      title: "Create Internship",
      icon: Briefcase,
      path: "/admin/internships",
    },
    {
      title: "Manage Students",
      icon: Users,
      path: "/admin/students",
    },
  ];


  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />

              <div className="flex-1">
                <h2 className="font-semibold text-red-800">
                  Unable to load dashboard
                </h2>

                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={loadDashboard}
                  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Overview of your LMS platform.
            </p>
          </div>

          <button
            type="button"
            onClick={loadDashboard}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </motion.div>


        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                onClick={() =>
                  navigate(item.path)
                }
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -4,
                }}
                className="rounded-2xl bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-blue-50 p-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>

                <h3 className="mt-5 text-3xl font-bold text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.title}
                </p>
              </motion.button>
            );
          })}
        </div>


        {/* Quick Actions */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />

            <h2 className="font-bold text-slate-900">
              Quick Actions
            </h2>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() =>
                    navigate(item.path)
                  }
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="rounded-lg bg-blue-50 p-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>

                  <span className="font-medium text-slate-700">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>


        {/* Recent Activity */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">
              Recent Activity
            </h2>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/applications")
              }
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View applications
            </button>
          </div>


          {activities.length === 0 ? (
            <div className="py-12 text-center">
              <Clock className="mx-auto h-8 w-8 text-slate-300" />

              <p className="mt-3 text-sm text-slate-500">
                No recent activity yet.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-5">
              {activities.map(
                (activity, index) => (
                  <motion.div
                    key={`${activity.type}-${activity.title}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="flex gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                      <CheckCircle
                        size={18}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-slate-900">
                        {activity.title}
                      </p>

                      <p className="truncate text-sm text-slate-500">
                        {activity.user}
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={12} />

                        {getTimeAgo(
                          activity.date
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          )}
        </motion.div>


        {/* Platform Overview */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
          }}
          className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white"
                  >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-3">
              <TrendingUp className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Platform Overview
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                Live statistics from your LMS database.
              </p>
            </div>
          </div>


          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-sm text-blue-100">
                Students
              </p>

              <p className="mt-1 text-2xl font-bold">
                {students.length}
              </p>
            </div>


            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-sm text-blue-100">
                Courses
              </p>

              <p className="mt-1 text-2xl font-bold">
                {courses.length}
              </p>
            </div>


            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-sm text-blue-100">
                Internships
              </p>

              <p className="mt-1 text-2xl font-bold">
                {internships.length}
              </p>
            </div>


            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-sm text-blue-100">
                Applications
              </p>

              <p className="mt-1 text-2xl font-bold">
                {applications.length}
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};


export default AdminDashboard;