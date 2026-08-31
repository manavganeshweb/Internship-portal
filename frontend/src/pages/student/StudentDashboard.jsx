import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  GraduationCap,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { getStudentDashboard } from "../../api/studentApi";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getStudentDashboard();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to load dashboard"
          );
        }

        setDashboard(data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-10 w-10 rounded-full border-4 border-blue-100 border-t-blue-600"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl border border-red-100 bg-white px-8 py-6 text-center shadow-sm">
          <p className="font-medium text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const { student, stats, recentCourses } = dashboard;

  const statCards = [
    {
      title: "Enrolled Courses",
      value: stats.enrolledCourses,
      icon: BookOpen,
      description: "Courses you're enrolled in",
    },
    {
      title: "In Progress",
      value: stats.inProgressCourses,
      icon: Clock,
      description: "Currently learning",
    },
    {
      title: "Completed",
      value: stats.completedCourses,
      icon: CheckCircle,
      description: "Courses completed",
    },
    {
      title: "Overall Progress",
      value: `${stats.averageProgress}%`,
      icon: GraduationCap,
      description: "Your learning progress",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Animated Background Shapes */}
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 80, 0],
              y: [0, 50, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"
          />

          <motion.div
            animate={{
              x: [0, -70, 0],
              y: [0, 60, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl"
          />
        </div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-7 text-white shadow-lg sm:p-9"
        >
          {/* Moving circles */}
          <motion.div
            animate={{
              x: [0, 40, 0],
              y: [0, -20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10"
          />

          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-white/5"
          />

          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-2 text-blue-100">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">
                Student Portal
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, {student.name} 👋
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Continue your learning journey, track your progress,
              and explore new opportunities.
            </p>
          </div>
        </motion.section>

        {/* Stats */}
        <section className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <motion.p
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.3 + index * 0.1,
                      }}
                      className="mt-2 text-3xl font-bold text-slate-900"
                    >
                      {stat.value}
                    </motion.p>
                  </div>

                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="rounded-xl bg-blue-50 p-3 transition-colors group-hover:bg-blue-100"
                  >
                    <Icon className="h-6 w-6 text-blue-600" />
                  </motion.div>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </section>

        {/* Profile */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="relative z-10 mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  My Profile
                </h2>
                <p className="text-sm text-slate-500">
                  Your student information
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Name", student.name],
              ["Email", student.email],
              ["College", student.college || "Not provided"],
              ["Course", student.course || "Not provided"],
            ].map(([label, value], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.08 }}
                className="rounded-xl bg-slate-50 p-4"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {label}
                </p>

                <p className="mt-2 break-words font-medium text-slate-900">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Courses */}
        <section className="relative z-10 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-5 flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />

                <h2 className="text-xl font-semibold text-slate-900">
                  My Courses
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Continue where you left off.
              </p>
            </div>
          </motion.div>

          {recentCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm"
            >
              <BookOpen className="mx-auto h-10 w-10 text-slate-300" />

              <h3 className="mt-4 font-semibold text-slate-900">
                No courses yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Enroll in a course to start learning.
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {recentCourses.map((enrollment, index) => (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.65 + index * 0.12,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {enrollment.course?.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {enrollment.course?.description}
                      </p>
                    </div>

                    <div className="shrink-0 rounded-xl bg-blue-50 p-3">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Progress
                      </span>

                      <span className="font-semibold text-blue-600">
                        {enrollment.progress}%
                      </span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${enrollment.progress}%`,
                        }}
                        transition={{
                          duration: 1.2,
                          delay: 0.8 + index * 0.15,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
                      {enrollment.status}
                    </span>

                   <motion.button
  whileHover={{ x: 4 }}
  whileTap={{ scale: 0.97 }}
  onClick={() =>
    navigate(`/student/courses/${enrollment.course?._id}`)
  }
  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
>
  Continue
  <ArrowRight className="h-4 w-4" />
</motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;