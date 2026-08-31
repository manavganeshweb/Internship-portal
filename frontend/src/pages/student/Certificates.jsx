import { useEffect, useState } from "react";
import {
  Award,
  Calendar,
  ExternalLink,
  FileBadge,
  GraduationCap,
} from "lucide-react";

import { getMyCertificates } from "../../api/certificateApi";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyCertificates();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to load certificates"
          );
        }

        setCertificates(data.certificates || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load certificates"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading certificates...
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
        {/* Header */}

        <section className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Achievements
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            My Certificates
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            View your certificates and achievements earned
            through courses and internships.
          </p>
        </section>

        {/* Empty State */}

        {certificates.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <Award className="mx-auto h-14 w-14 text-slate-300" />

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              No certificates yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Complete your courses or internships to earn
              certificates. Your certificates will appear here
              once they are issued.
            </p>
          </div>
        ) : (
          <>
            {/* Certificate count */}

            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3">
                <Award className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Certificates earned
                </p>

                <p className="text-2xl font-bold text-slate-900">
                  {certificates.length}
                </p>
              </div>
            </div>

            {/* Certificates */}

            <div className="grid gap-6 md:grid-cols-2">
              {certificates.map((certificate) => (
                <article
                  key={certificate._id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Top */}

                  <div className="border-b border-slate-100 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                        {certificate.type === "internship" ? (
                          <FileBadge className="h-6 w-6 text-blue-600" />
                        ) : (
                          <GraduationCap className="h-6 w-6 text-blue-600" />
                        )}
                      </div>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium capitalize text-green-600">
                        {certificate.type}
                      </span>
                    </div>

                    <h2 className="mt-5 text-xl font-semibold text-slate-900">
                      {certificate.title}
                    </h2>

                    {certificate.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {certificate.description}
                      </p>
                    )}

                    {/* Course */}

                    {certificate.course && (
                      <div className="mt-5">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Course
                        </p>

                        <p className="mt-1 font-medium text-slate-900">
                          {certificate.course.title}
                        </p>
                      </div>
                    )}

                    {/* Internship */}

                    {certificate.internship && (
                      <div className="mt-5">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Internship
                        </p>

                        <p className="mt-1 font-medium text-slate-900">
                          {certificate.internship.title}
                        </p>

                        {certificate.internship.company && (
                          <p className="mt-1 text-sm text-blue-600">
                            {certificate.internship.company}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Date */}

                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />

                      <span>
                        Issued on{" "}
                        {new Date(
                          certificate.issuedDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}

                  <div className="flex items-center justify-between gap-4 bg-slate-50 p-5">
                    <div>
                      <p className="text-xs text-slate-400">
                        Certificate ID
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {certificate.certificateId}
                      </p>
                    </div>

                    {certificate.certificateUrl && (
                      <a
                        href={certificate.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        View Certificate
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Certificates;