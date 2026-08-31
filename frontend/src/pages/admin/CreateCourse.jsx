import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { createCourse } from "../../api/adminCourseApi";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "beginner",
    instructor: "",
    thumbnail: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await createCourse(formData);

      if (!data.success) {
        throw new Error(
          data.message || "Course creation failed"
        );
      }

      navigate("/admin/courses");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50">

      <main className="mx-auto max-w-4xl px-4 py-8">

        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>


        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

          <h1 className="text-3xl font-bold text-slate-900">
            Create Course
          </h1>

          <p className="mt-2 text-slate-500">
            Add course details for your internship portal.
          </p>


          {error && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            <div>
              <label className="text-sm font-medium">
                Course Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="Full Stack Development"
                required
              />
            </div>


            <div>
              <label className="text-sm font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="Course description..."
                required
              />
            </div>


            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="text-sm font-medium">
                  Duration
                </label>

                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                  placeholder="12 Weeks"
                  required
                />
              </div>


              <div>
                <label className="text-sm font-medium">
                  Level
                </label>

                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border px-4 py-3"
                >
                  <option value="beginner">
                    Beginner
                  </option>

                  <option value="intermediate">
                    Intermediate
                  </option>

                  <option value="advanced">
                    Advanced
                  </option>

                </select>
              </div>

            </div>


            <div>
              <label className="text-sm font-medium">
                Instructor
              </label>

              <input
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="Instructor name"
              />
            </div>


            <div>
              <label className="text-sm font-medium">
                Thumbnail URL
              </label>

              <input
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border px-4 py-3"
                placeholder="https://image-url.com/course.png"
              />
            </div>


            <button
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >

              <Save className="h-5 w-5" />

              {loading
                ? "Creating..."
                : "Create Course"}

            </button>


          </form>

        </div>

      </main>

    </div>
  );
};


export default CreateCourse;