import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Briefcase,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getAllInternships,
  deleteInternship,
} from "../../../api/adminInternshipApi";

const AdminInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const fetchInternships = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching internships...");

      const data = await getAllInternships();

      console.log("Internships API response:", data);

      if (!data?.success) {
        throw new Error(
          data?.message || "Failed to fetch internships"
        );
      }

      const internshipList = Array.isArray(data.internships)
        ? data.internships
        : [];

      console.log("Internships received:", internshipList);

      setInternships(internshipList);
    } catch (error) {
      console.error("Fetch internships error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load internships"
      );

      setInternships([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this internship?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      const data = await deleteInternship(id);

      if (data?.success === false) {
        throw new Error(
          data?.message || "Delete failed"
        );
      }

      setInternships((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Delete internship error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete internship"
      );
    }
  };

  const filteredInternships = internships.filter((item) => {
    const searchText = search.toLowerCase().trim();

    const title = item?.title?.toLowerCase() || "";
    const company = item?.company?.toLowerCase() || "";

    const matchSearch =
      !searchText ||
      title.includes(searchText) ||
      company.includes(searchText);

    const matchDuration =
      !duration || item?.duration === duration;

    return matchSearch && matchDuration;
  });

  const getWorkMode = (type) => {
    switch (type) {
      case "remote":
        return "Remote";

      case "onsite":
        return "Onsite";

      case "hybrid":
        return "Hybrid";

      default:
        return type || "Remote";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Internship Management
          </h1>

          <p className="mt-1 text-slate-500">
            Manage internship opportunities
          </p>
        </div>

        <Link
          to="/admin/internships/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Internship
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by internship or company..."
            className="w-full outline-none"
          />
        </div>

        <select
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
          className="rounded-xl bg-white px-4 py-3 shadow-sm outline-none"
        >
          <option value="">All Duration</option>

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

      {/* Loading */}
      {loading && (
        <div className="mt-8 rounded-xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Fetching internships...
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading &&
        filteredInternships.length === 0 && (
          <div className="mt-8 rounded-xl bg-white p-10 text-center shadow-sm">
            <Briefcase className="mx-auto h-10 w-10 text-slate-300" />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No internships found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {search || duration
                ? "Try changing your search or filter."
                : "Create your first internship opportunity."}
            </p>
          </div>
        )}

      {/* Internship Cards */}
      {!loading &&
        filteredInternships.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredInternships.map(
              (item, index) => (
                <motion.div
                  key={item._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  {/* Thumbnail */}
                  {item.thumbnail && (
                    <div className="h-40 overflow-hidden bg-slate-100">
                      <img
                        src={item.thumbnail}
                        alt={
                          item.title ||
                          "Internship"
                        }
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Top */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="rounded-xl bg-blue-50 p-3">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.status ===
                          "published"
                            ? "bg-green-50 text-green-600"
                            : item.status ===
                              "closed"
                            ? "bg-red-50 text-red-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.status ===
                        "published"
                          ? "Published"
                          : item.status ===
                            "closed"
                          ? "Closed"
                          : "Draft"}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-5 line-clamp-2 text-xl font-bold text-slate-900">
                      {item.title}
                    </h2>

                    {/* Company */}
                    {item.company && (
                      <p className="mt-1 text-sm font-medium text-blue-600">
                        {item.company}
                      </p>
                    )}

                    {/* Description */}
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>

                    {/* Details */}
                    <div className="mt-5 space-y-3 text-sm text-slate-500">
                      <div className="flex items-center justify-between">
                        <span>
                          Duration
                        </span>

                        <span className="font-medium text-slate-700">
                          {item.duration ||
                            "Not specified"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>
                          Work Mode
                        </span>

                        <span className="font-medium text-slate-700">
                          {getWorkMode(
                            item.type
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={15} />

                        <span>
                          {item.location ||
                            "Remote"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>
                          Openings
                        </span>

                        <span className="font-medium text-slate-700">
                          {item.openings ?? 1}
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    {Array.isArray(
                      item.skills
                    ) &&
                      item.skills.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.skills
                            .slice(0, 4)
                            .map(
                              (
                                skill,
                                skillIndex
                              ) => (
                                <span
                                  key={`${skill}-${skillIndex}`}
                                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                        </div>
                      )}

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">
                      <Link
                        to={`/admin/internships/edit/${item._id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <Edit size={16} />
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            item._id
                          )
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
    </div>
  );
};

export default AdminInternships;