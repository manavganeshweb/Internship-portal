import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Search,
  XCircle,
} from "lucide-react";

import { getMyApplications } from "../../api/applicationApi";

const statusConfig = {
  applied: {
    label: "Applied",
    className: "bg-blue-50 text-blue-600",
    icon: Clock,
  },
  shortlisted: {
    label: "Shortlisted",
    className: "bg-amber-50 text-amber-600",
    icon: CheckCircle2,
  },
  selected: {
    label: "Selected",
    className: "bg-green-50 text-green-600",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-600",
    icon: XCircle,
  },
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] =
    useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyApplications();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to load applications"
          );
        }

        setApplications(data.applications || []);
        setFilteredApplications(data.applications || []);
      } catch (error) {
        setError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setFilteredApplications(applications);
      return;
    }

    const filtered = applications.filter((application) => {
      return (
        application.internship?.title
          ?.toLowerCase()
          .includes(query) ||
        application.internship?.company
          ?.toLowerCase()
          .includes(query) ||
        application.status?.toLowerCase().includes(query)
      );
    });

    setFilteredApplications(filtered);
  }, [search, applications]);

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatus = (status) => {
    return (
      statusConfig[status] || {
        label: status || "Unknown",
        className: "bg-slate-100 text-slate-600",
        icon: Clock,
      }
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading applications...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-xl bg-red-50 px-6 py-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Student Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            My Applications
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Track the internships you have applied for and
            monitor your application status.
          </p>
        </section>

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by internship, company or status..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </section>

        <section className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Applications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredApplications.length}{" "}
              {filteredApplications.length === 1
                ? "application"
                : "applications"}
            </p>
          </div>
        </section>

        {filteredApplications.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <Briefcase className="mx-auto h-12 w-12 text-slate-300" />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {applications.length === 0
                ? "No applications yet"
                : "No applications found"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {applications.length === 0
                ? "Explore internships and submit your first application."
                : "Try changing your search."}
            </p>

            {applications.length === 0 && (
              <Link
                to="/student/internships"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Browse Internships
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {filteredApplications.map((application) => {
              const status = getStatus(application.status);
              const StatusIcon = status.icon;

              return (
                <article
                  key={application._id}
                  className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {application.internship?.title ||
                            "Internship"}
                        </h3>

                        <p className="mt-1 font-medium text-blue-600">
                          {application.internship?.company ||
                            "Company"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${status.className}`}
                    >
                      <StatusIcon className="h-4 w-4" />
                      {status.label}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
                    {application.internship?.location && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="h-4 w-4" />
                        {application.internship.location}
                      </div>
                    )}

                    {application.internship?.duration && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="h-4 w-4" />
                        {application.internship.duration}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />
                      Applied {formatDate(application.appliedAt)}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <FileText className="h-4 w-4" />
                      Application ID:{" "}
                      <span className="font-medium text-slate-700">
                        {application._id}
                      </span>
                    </div>

                    <Link
                      to={`/student/applications/${application._id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
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

export default MyApplications;