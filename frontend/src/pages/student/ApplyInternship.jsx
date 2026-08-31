import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  FileText,
  Loader2,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getInternshipById } from "../../api/internshipApi";
import { applyForInternship } from "../../api/applicationApi";

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const ApplyInternship = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadInternship = async () => {
      if (!id) {
        setError("Internship ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getInternshipById(id);

        if (!data.success) {
          throw new Error(
            data.message || "Failed to load internship"
          );
        }

        setInternship(data.internship);
      } catch (error) {
        setError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load internship"
        );
      } finally {
        setLoading(false);
      }
    };

    loadInternship();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!id) {
      setError("Internship ID is missing.");
      return;
    }

    if (!coverLetter.trim()) {
      setError("Please write a cover letter.");
      return;
    }

    if (!resume.trim()) {
      setError("Please provide your resume link.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const data = await applyForInternship({
        internshipId: id,
        coverLetter: coverLetter.trim(),
        resume: resume.trim(),
      });

      if (!data.success) {
        throw new Error(
          data.message || "Failed to submit application"
        );
      }

      setSuccess(true);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to submit application"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center bg-slate-50"
      >
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
          >
            <Loader2 className="mx-auto h-8 w-8 text-blue-600" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-sm text-slate-500"
          >
            Loading internship...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  if (error && !internship) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center bg-slate-50 px-4"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 200,
            }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50"
          >
            <Briefcase className="h-7 w-7 text-red-500" />
          </motion.div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Unable to load internship
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/student/internships"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Internships
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center bg-slate-50 px-4"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.85,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm"
        >
          <motion.div
            initial={{
              scale: 0,
              rotate: -20,
            }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 180,
              damping: 12,
            }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50"
          >
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-5 text-2xl font-bold text-slate-900"
          >
            Application Submitted!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-3 text-sm leading-6 text-slate-500"
          >
            Your application for{" "}
            <span className="font-medium text-slate-700">
              {internship?.title}
            </span>{" "}
            at{" "}
            <span className="font-medium text-slate-700">
              {internship?.company}
            </span>{" "}
            has been submitted successfully.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <motion.button
              whileHover={{
                y: -2,
                boxShadow:
                  "0 8px 20px rgba(37, 99, 235, 0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() =>
                navigate("/student/applications")
              }
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              View My Applications
            </motion.button>

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/student/internships"
                className="block rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Browse Internships
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-slate-50"
    >
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to={`/student/internships/${id}`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            <motion.span
              whileHover={{ x: -3 }}
              className="flex"
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.span>

            Back to Internship
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-3"
        >
          {/* Internship Summary */}
          <motion.aside
            variants={itemVariants}
            whileHover={{
              y: -3,
              transition: { duration: 0.2 },
            }}
            className="h-fit rounded-2xl bg-white p-6 shadow-sm"
          >
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 3,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50"
            >
              <Briefcase className="h-6 w-6 text-blue-600" />
            </motion.div>

            <h1 className="mt-5 text-xl font-bold text-slate-900">
              {internship?.title}
            </h1>

            <p className="mt-2 font-medium text-blue-600">
              {internship?.company}
            </p>

            {internship?.location && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-sm text-slate-500"
              >
                📍 {internship.location}
              </motion.p>
            )}

            {internship?.duration && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-2 text-sm text-slate-500"
              >
                ⏱ {internship.duration}
              </motion.p>
            )}

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Application
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Complete the form to submit your internship
                application.
              </p>
            </div>
          </motion.aside>

          {/* Application Form */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl bg-white p-6 shadow-sm sm:p-8 lg:col-span-2"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 3,
                }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50"
              >
                <FileText className="h-5 w-5 text-blue-600" />
              </motion.div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Apply for Internship
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Submit your application details below.
                </p>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -10,
                  }}
                  className="mt-6 overflow-hidden rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-7 space-y-6"
            >
              {/* Cover Letter */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="coverLetter"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Cover Letter
                </label>

                <textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(event) =>
                    setCoverLetter(event.target.value)
                  }
                  rows={8}
                  placeholder="Tell the company why you are interested in this internship and why you are a good fit..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                <motion.p
                  key={coverLetter.length}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-xs text-slate-400"
                >
                  {coverLetter.length} characters
                </motion.p>
              </motion.div>

              {/* Resume */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="resume"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Resume Link
                </label>

                <input
                  id="resume"
                  type="url"
                  value={resume}
                  onChange={(event) =>
                    setResume(event.target.value)
                  }
                  placeholder="https://drive.google.com/..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Add a publicly accessible Google Drive,
                  OneDrive, or other resume link.
                </p>
              </motion.div>

              {/* Before Submitting */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  scale: 1.01,
                }}
                className="rounded-xl bg-slate-50 p-4"
              >
                <p className="text-sm font-medium text-slate-700">
                  Before submitting
                </p>

                <ul className="mt-3 space-y-2 text-sm text-slate-500">
                  {[
                    "Make sure your resume link works.",
                    "Review your cover letter.",
                    "Make sure you meet the internship requirements.",
                  ].map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.1 * index,
                      }}
                    >
                      ✓ {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={itemVariants}
                whileHover={
                  !submitting
                    ? {
                        scale: 1.02,
                        y: -2,
                        boxShadow:
                          "0 10px 25px rgba(37, 99, 235, 0.2)",
                      }
                    : {}
                }
                whileTap={
                  !submitting
                    ? {
                        scale: 0.98,
                      }
                    : {}
                }
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <AnimatePresence mode="wait">
                  {submitting ? (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Loader2 className="h-4 w-4" />
                      </motion.span>

                      Submitting...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="submit"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Submit Application
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </motion.section>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default ApplyInternship;