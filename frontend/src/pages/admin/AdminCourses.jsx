
import { useEffect, useState } from "react";
import {
  BookOpen,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getAllCourses,
  deleteCourse,
} from "../../api/adminCourseApi";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllCourses();

      if (!data?.success) {
        throw new Error(
          data?.message || "Failed to load courses"
        );
      }

      setCourses(
        Array.isArray(data.courses)
          ? data.courses
          : []
      );
    } catch (error) {
      console.error("Load courses error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load courses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (courseId) => {
    if (!courseId) {
      setError("Invalid course ID.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(courseId);
      setError("");

      const data = await deleteCourse(courseId);

      if (!data?.success) {
        throw new Error(
          data?.message || "Failed to delete course"
        );
      }

      setCourses((previousCourses) =>
        previousCourses.filter(
          (course) => course._id !== courseId
        )
      );
    } catch (error) {
      console.error("Delete course error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete course"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="text-center">
          <BookOpen className="mx-auto h-8 w-8 animate-pulse text-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading courses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Course Management
            </h1>

            <p className="mt-2 text-slate-500">
              Create, edit and manage your LMS courses.
            </p>
          </div>

          <Link
            to="/admin/courses/create"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Create Course
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <span>{error}</span>

            <button
              type="button"
              onClick={loadCourses}
              className="shrink-0 rounded-md bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Courses */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          {courses.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-slate-300" />

              <h2 className="mt-4 font-semibold text-slate-900">
                No courses found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Create your first course to get started.
              </p>

              <Link
                to="/admin/courses/create"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Create Course
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">

              {courses.map((course) => (
                <div
                  key={course._id}
                  className="flex flex-wrap items-center justify-between gap-5 p-6 transition hover:bg-slate-50/70"
                >

                  {/* Course information */}
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate font-semibold text-slate-900">
                        {course.title || "Untitled Course"}
                      </h2>

                      <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-500">
                        <span>
                          {Array.isArray(course.modules)
                            ? course.modules.length
                            : 0}{" "}
                          modules
                        </span>

                        <span>•</span>

                        <span className="capitalize">
                          {course.level || "Not specified"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">

                    {/* Published status */}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        course.isPublished
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {course.isPublished
                        ? "Published"
                        : "Draft"}
                    </span>

                    {/* Content */}
                    <Link
                      to={`/admin/courses/${course._id}/content`}
                      className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      Content
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/admin/courses/${course._id}/edit`}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                      title="Edit course"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(course._id)
                      }
                      disabled={
                        deletingId === course._id
                      }
                      className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete course"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminCourses;
