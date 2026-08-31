
import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  PlayCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getMyEnrollments } from "../../api/enrollmentApi";

const MyLearning = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyEnrollments();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to load your courses"
          );
        }

        setEnrollments(data.enrollments || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load your courses"
        );
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading your learning...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-xl bg-red-50 px-6 py-4 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Learning Center
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            My Learning
          </h1>

          <p className="mt-2 text-slate-500">
            Continue your enrolled courses and track your progress.
          </p>
        </section>

        {/* Empty state */}
        {enrollments.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <BookOpen className="mx-auto h-12 w-12 text-slate-300" />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No courses yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              You haven't enrolled in any courses yet. Explore
              available courses and start learning.
            </p>

            <Link
              to="/student/courses"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <BookOpen className="h-4 w-4" />
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrollments.map((enrollment) => {
              const course = enrollment.course;

              if (!course) {
                return null;
              }

              const progress = Math.min(
                Math.max(Number(enrollment.progress) || 0, 0),
                100
              );

              const completed = progress >= 100;

              return (
                <article
                  key={enrollment._id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Thumbnail */}
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-blue-50">
                      <BookOpen className="h-14 w-14 text-blue-500" />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Status */}
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          completed
                            ? "bg-green-50 text-green-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {completed ? "Completed" : "In Progress"}
                      </span>

                      <span className="text-xs text-slate-400">
                        {progress}%
                      </span>
                    </div>

                    {/* Course title */}
                    <h2 className="mt-4 line-clamp-2 text-xl font-semibold text-slate-900">
                      {course.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                      {course.description ||
                        "Continue learning and improve your skills."}
                    </p>

                    {/* Progress */}
                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-500">
                          Course Progress
                        </span>

                        <span className="font-semibold text-slate-900">
                          {progress}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Course information */}
                    <div className="mt-5 flex items-center gap-4 text-sm text-slate-500">
                      {course.duration && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>
                      )}

                      {course.modules && (
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4" />
                          {course.modules.length} modules
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    <Link
                      to={`/student/courses/${course._id}/learn`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      {completed ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Review Course
                        </>
                      ) : (
                        <>
                          <PlayCircle className="h-4 w-4" />
                          Continue Learning
                        </>
                      )}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyLearning;
