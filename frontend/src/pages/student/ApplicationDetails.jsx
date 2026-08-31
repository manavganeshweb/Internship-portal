import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  User,
  XCircle,
} from "lucide-react";

import { getApplicationById } from "../../api/applicationApi";


const statusConfig = {
  applied: {
    label: "Application Submitted",
    description:
      "Your application has been submitted and is waiting for review.",
    className: "bg-blue-50 text-blue-600",
    icon: Clock,
  },
  shortlisted: {
    label: "Shortlisted",
    description:
      "Your application has been shortlisted by the organization.",
    className: "bg-amber-50 text-amber-600",
    icon: CheckCircle2,
  },
  selected: {
    label: "Selected",
    description:
      "Congratulations! You have been selected for this internship.",
    className: "bg-green-50 text-green-600",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Not Selected",
    description:
      "Unfortunately, your application was not selected.",
    className: "bg-red-50 text-red-600",
    icon: XCircle,
  },
};

const ApplicationDetails = () => {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplication = async () => {
      if (!id) {
        setError("Application ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getApplicationById(id);

if (!data.success) {
  throw new Error(
    data.message || "Failed to load application"
  );
}

if (!data.application) {
  throw new Error("Application not found.");
}

setApplication(data.application);



      } catch (error) {
        setError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load application"
        );
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading application...
        </p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <FileText className="mx-auto h-12 w-12 text-slate-300" />

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            Application not found
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error || "Unable to find this application."}
          </p>

          <Link
            to="/student/applications"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            My Applications
          </Link>
        </div>
      </div>
    );
  }

  const internship = application.internship;

  const status =
    statusConfig[application.status] ||
    statusConfig.applied;

  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-slate-50" >
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 ">
        <Link
          to="/student/applications"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Applications
        </Link>

        {/* Header */}
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Briefcase className="h-7 w-7 text-blue-600" />
              </div>

              <div>
                <p className="text-sm font-medium text-blue-600">
                  Internship Application
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-900">
                  {internship?.title || "Internship"}
                </h1>

                <p className="mt-1 font-medium text-blue-600">
                  {internship?.company || "Company"}
                </p>
              </div>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.className}`}
            >
              <StatusIcon className="h-5 w-5" />
              {status.label}
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-600">
              {status.description}
            </p>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Main */}
          <div className="space-y-6 lg:col-span-2">
            {/* Internship */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">
                Internship Details
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {internship?.location && (
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-slate-400" />

                    <div>
                      <p className="text-xs text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {internship.location}
                      </p>
                    </div>
                  </div>
                )}

                {internship?.duration && (
                  <div className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-slate-400" />

                    <div>
                      <p className="text-xs text-slate-400">
                        Duration
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {internship.duration}
                      </p>
                    </div>
                  </div>
                )}

                {internship?.type && (
                  <div className="flex gap-3">
                    <Briefcase className="mt-0.5 h-5 w-5 text-slate-400" />

                    <div>
                      <p className="text-xs text-slate-400">
                        Type
                      </p>

                      <p className="mt-1 text-sm font-medium capitalize text-slate-700">
                        {internship.type}
                      </p>
                    </div>
                  </div>
                )}

                {internship?.stipend && (
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-lg text-slate-400">
                      ₹
                    </span>

                    <div>
                      <p className="text-xs text-slate-400">
                        Stipend
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {internship.stipend}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Cover letter */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />

                <h2 className="text-xl font-semibold text-slate-900">
                  Your Cover Letter
                </h2>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-5">
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                  {application.coverLetter ||
                    "No cover letter provided."}
                </p>
              </div>
            </section>

            {/* Resume */}
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />

                <h2 className="text-xl font-semibold text-slate-900">
                  Resume
                </h2>
              </div>

              {application.resume ? (
                <a
                  href={application.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  View Resume
                </a>
              ) : (
                <p className="mt-4 text-sm text-slate-500">
                  No resume link provided.
                </p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Application Timeline
              </h2>

              <div className="mt-6 space-y-6">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50">
                    <SendIcon />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      Application submitted
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(application.appliedAt)}
                    </p>
                  </div>
                </div>

                {application.reviewedAt && (
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Application reviewed
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(application.reviewedAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-blue-600" />

                <h2 className="text-lg font-semibold text-slate-900">
                  Application
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Application ID
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-slate-700">
                    {application._id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Submitted
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    {formatDate(application.appliedAt)}
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4 text-blue-600"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export default ApplicationDetails;