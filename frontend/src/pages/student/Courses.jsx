import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

import { getCourses } from "../../api/courseApi";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses();

        if (!data.success) {
          throw new Error(data.message || "Failed to load courses");
        }

        setCourses(data.courses || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load courses"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="mx-auto h-10 w-10 rounded-full border-4 border-slate-200 border-t-blue-600"
          />

          <p className="mt-4 text-sm text-slate-500">
            Loading courses...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-red-50 px-6 py-4 text-red-600"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-sm font-medium text-blue-600">
            Learning Center
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Explore Courses
          </h1>

          <p className="mt-2 text-slate-500">
            Learn new skills and prepare yourself for
            real-world opportunities.
          </p>
        </motion.section>

        {courses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-white p-12 text-center shadow-sm"
          >
            <BookOpen className="mx-auto h-12 w-12 text-slate-400" />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No courses available
            </h2>

            <p className="mt-2 text-slate-500">
              New courses will appear here when they are
              published.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {courses.map((course) => (
              <motion.article
                key={course._id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                {/* Thumbnail */}
                {course.thumbnail ? (
                  <motion.img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4 }}
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-blue-50">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <BookOpen className="h-12 w-12 text-blue-500" />
                    </motion.div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-600">
                      {course.level}
                    </span>

                    <span className="text-sm text-slate-500">
                      {course.modules?.length || 0} modules
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-slate-900">
                    {course.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                    {course.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>

                    {course.instructor && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {course.instructor}
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/student/courses/${course._id}`}
                    className="mt-6 block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Course
                    </motion.div>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Courses;