import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  IndianRupee,
  MapPin,
  Send,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getInternshipById } from "../../api/internshipApi";

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const InternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInternship = async () => {
      if (!id) {
        setError("Internship ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

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

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="mx-auto h-8 w-8 rounded-full border-4 border-slate-200 border-t-blue-600"
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm text-slate-500"
          >
            Loading internship...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center bg-slate-50 px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
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

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Go Back
            </motion.button>

            <motion.button
              whileHover={{
                y: -2,
                boxShadow: "0 8px 20px rgba(37, 99, 235, 0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (!internship) {
    return null;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-slate-50"
    >
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/student/internships"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <motion.span
              whileHover={{ x: -3 }}
              className="flex"
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.span>
            Back to Internships
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden rounded-2xl bg-white shadow-sm"
        >
          <div className="p-6 sm:p-8 lg:p-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
            >
              <motion.div
                variants={itemVariants}
                className="flex gap-5"
              >
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 3,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50"
                >
                  <Briefcase className="h-8 w-8 text-blue-600" />
                </motion.div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                      {internship.title}
                    </h1>

                    {internship.type && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 }}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600"
                      >
                        {internship.type}
                      </motion.span>
                    )}
                  </div>

                  <p className="mt-2 text-lg font-medium text-blue-600">
                    {internship.company}
                  </p>

                  {internship.location && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" />
                      {internship.location}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 25px rgba(37, 99, 235, 0.2)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={`/student/internships/${internship._id}/apply`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 lg:w-auto"
                >
                  <Send className="h-4 w-4" />
                  Apply Now
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Quick Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid border-t border-slate-100 sm:grid-cols-2 lg:grid-cols-4"
          >
            {internship.duration && (
              <motion.div
                variants={itemVariants}
                className="border-b border-slate-100 p-5 lg:border-b-0 lg:border-r"
              >
                <InfoItem
                  icon={<Clock className="h-5 w-5 text-slate-600" />}
                  label="Duration"
                  value={internship.duration}
                />
              </motion.div>
            )}

            {internship.stipend !== undefined &&
              internship.stipend !== null &&
              internship.stipend !== "" && (
                <motion.div
                  variants={itemVariants}
                  className="border-b border-slate-100 p-5 lg:border-b-0 lg:border-r"
                >
                  <InfoItem
                    icon={
                      <IndianRupee className="h-5 w-5 text-slate-600" />
                    }
                    label="Stipend"
                    value={internship.stipend}
                  />
                </motion.div>
              )}

            {internship.openings !== undefined && (
              <motion.div
                variants={itemVariants}
                className="border-b border-slate-100 p-5 sm:border-r lg:border-b-0"
              >
                <InfoItem
                  icon={<Users className="h-5 w-5 text-slate-600" />}
                  label="Openings"
                  value={internship.openings}
                />
              </motion.div>
            )}

            {internship.applicationDeadline && (
              <motion.div
                variants={itemVariants}
                className="p-5"
              >
                <InfoItem
                  icon={
                    <Calendar className="h-5 w-5 text-slate-600" />
                  }
                  label="Apply By"
                  value={formatDate(
                    internship.applicationDeadline
                  )}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.section>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 grid gap-6 lg:grid-cols-3"
        >
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            {/* Description */}
            <motion.section
              variants={cardVariants}
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
              className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  About the Internship
                </h2>
              </div>

              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                {internship.description ||
                  "No description provided."}
              </p>
            </motion.section>

            {/* Eligibility */}
            <AnimatePresence>
              {internship.eligibility && (
                <motion.section
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
                >
                  <h2 className="text-xl font-semibold text-slate-900">
                    Eligibility
                  </h2>

                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                    {internship.eligibility}
                  </p>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Skills */}
            {internship.skills?.length > 0 && (
              <motion.section
                variants={cardVariants}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  Required Skills
                </h2>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {internship.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                      }}
                      className="cursor-default rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.section>
            )}
          </div>

          {/* Right */}
          <aside className="space-y-6">
            {/* Application */}
            <motion.section
              variants={cardVariants}
              whileHover={{
                y: -3,
                transition: { duration: 0.2 },
              }}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                Interested in this internship?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit your application and take the next step
                toward gaining valuable industry experience.
              </p>

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link
                  to={`/student/internships/${internship._id}/apply`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                  Apply Now
                </Link>
              </motion.div>
            </motion.section>

            {/* Important Details */}
            <motion.section
              variants={cardVariants}
              whileHover={{
                y: -3,
                transition: { duration: 0.2 },
              }}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                Important Details
              </h2>

              <div className="mt-5 space-y-5">
                {internship.startDate && (
                  <DetailItem
                    icon={
                      <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    }
                    label="Internship Starts"
                    value={formatDate(internship.startDate)}
                  />
                )}

                {internship.applicationDeadline && (
                  <DetailItem
                    icon={
                      <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    }
                    label="Application Deadline"
                    value={formatDate(
                      internship.applicationDeadline
                    )}
                  />
                )}

                {internship.location && (
                  <DetailItem
                    icon={
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    }
                    label="Location"
                    value={internship.location}
                  />
                )}
              </div>
            </motion.section>

            {/* Why Apply */}
            <motion.section
              variants={cardVariants}
              whileHover={{
                y: -3,
                transition: { duration: 0.2 },
              }}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                Why Apply?
              </h2>

              <div className="mt-5 space-y-4">
                {[
                  "Gain practical industry experience",
                  "Build skills through real projects",
                  "Strengthen your professional profile",
                ].map((text) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                    <p className="text-sm text-slate-600">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </aside>
        </motion.div>
      </main>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 3,
        }}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100"
      >
        {icon}
      </motion.div>

      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-3"
    >
      {icon}

      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-medium text-slate-700">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default InternshipDetails;