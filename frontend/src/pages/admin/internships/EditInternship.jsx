import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Save,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getInternshipById,
  updateInternship,
} from "../../../api/adminInternshipApi";

const initialForm = {
  title: "",
  company: "",
  description: "",
  location: "Remote",
  type: "remote",
  duration: "1 Month",
  stipend: "",
  skills: "",
  eligibility: "",
  openings: 1,
  startDate: "",
  applicationDeadline: "",
  thumbnail: "",
  isPublished: false,
  status: "draft",
};

const formatDateForInput = (date) => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().split("T")[0];
};

const EditInternship = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setFetching(true);
        setError("");

        if (!id) {
          throw new Error("Internship ID is missing");
        }

        /*
         * IMPORTANT:
         * We use getInternshipById here.
         *
         * DO NOT use updateInternship() while loading the page.
         */
        const response = await getInternshipById(id);

        const data = response?.data || response;

        if (!data?.success) {
          throw new Error(
            data?.message || "Internship not found"
          );
        }

        const internship = data.internship;

        if (!internship) {
          throw new Error("Internship data not found");
        }

        setFormData({
          title: internship.title || "",
          company: internship.company || "",
          description: internship.description || "",
          location: internship.location || "Remote",

          type: ["remote", "onsite", "hybrid"].includes(
            internship.type
          )
            ? internship.type
            : "remote",

          duration: internship.duration || "1 Month",
          stipend: internship.stipend || "",

          skills: Array.isArray(internship.skills)
            ? internship.skills.join(", ")
            : internship.skills || "",

          eligibility: internship.eligibility || "",

          openings: internship.openings || 1,

          startDate: formatDateForInput(
            internship.startDate
          ),

          applicationDeadline: formatDateForInput(
            internship.applicationDeadline
          ),

          thumbnail: internship.thumbnail || "",

          isPublished:
            internship.isPublished === true ||
            internship.status === "published",

          status: internship.status || "draft",
        });
      } catch (error) {
        console.error(
          "Fetch internship error:",
          error
        );

        setError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to load internship"
        );
      } finally {
        setFetching(false);
      }
    };

    fetchInternship();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        title: formData.title,
        company: formData.company,
        description: formData.description,
        location: formData.location,
        type: formData.type,
        duration: formData.duration,
        stipend: formData.stipend,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        eligibility: formData.eligibility,

        openings: Number(formData.openings),

        startDate: formData.startDate
          ? new Date(formData.startDate)
          : null,

        applicationDeadline:
          formData.applicationDeadline
            ? new Date(formData.applicationDeadline)
            : null,

        thumbnail: formData.thumbnail,

        isPublished: formData.isPublished,

        status: formData.isPublished
          ? "published"
          : "draft",
      };

      const response = await updateInternship(
        id,
        payload
      );

      const data = response?.data || response;

      if (!data?.success) {
        throw new Error(
          data?.message || "Update failed"
        );
      }

      navigate("/admin/internships");
    } catch (error) {
      console.error(
        "Update internship error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading internship...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Link
          to="/admin/internships"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Internships
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Edit Internship
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Update internship details.
                </p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-6 mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:mx-8">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-6 sm:p-8"
          >
            {/* Basic Information */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Basic Information
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Internship Title
                  </label>

                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Company
                  </label>

                  <div className="relative mt-2">
                    <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Internship Details */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Internship Details
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Location
                  </label>

                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Remote / Hisar, Haryana"
                      className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Work Mode */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Work Mode
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="remote">
                      Remote
                    </option>

                    <option value="onsite">
                      Onsite
                    </option>

                    <option value="hybrid">
                      Hybrid
                    </option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Duration
                  </label>

                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="1 Month">
                      1 Month
                    </option>

                    <option value="2 Months">
                      2 Months
                    </option>

                    <option value="3 Months">
                      3 Months
                    </option>

                    <option value="6 Months">
                      6 Months
                    </option>
                  </select>
                </div>

                {/* Stipend */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Stipend
                  </label>

                  <input
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                    placeholder="₹10,000 / month"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Openings */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Number of Openings
                  </label>

                  <div className="relative mt-2">
                    <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="number"
                      min="1"
                      name="openings"
                      value={formData.openings}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Requirements
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Required Skills
                  </label>

                  <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Separate skills with commas.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Eligibility
                  </label>

                  <textarea
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Dates */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Important Dates
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Start Date
                  </label>

                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Application Deadline
                  </label>

                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="date"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Thumbnail */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Thumbnail
              </h2>

              <input
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/internship.jpg"
                className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </section>

            {/* Publishing */}
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
                />

                <div>
                  <p className="font-medium text-slate-900">
                    Publish internship
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Published internships will be visible to students.
                  </p>
                </div>
              </label>
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/admin/internships"
                className="rounded-xl border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />

                {loading ? "Updating..." : "Update Internship"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditInternship;