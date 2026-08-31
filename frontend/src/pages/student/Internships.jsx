import { useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getInternships } from "../../api/internshipApi";

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
      staggerChildren: 0.08,
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
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    transition: {
      duration: 0.2,
    },
  },
};

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] =
    useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInternships = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getInternships();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to load internships"
          );
        }

        setInternships(data.internships || []);
        setFilteredInternships(data.internships || []);
      } catch (error) {
        setError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load internships"
        );
      } finally {
        setLoading(false);
      }
    };

    loadInternships();
  }, []);

  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setFilteredInternships(internships);
      return;
    }

    const filtered = internships.filter((internship) => {
      return (
        internship.title?.toLowerCase().includes(query) ||
        internship.company?.toLowerCase().includes(query) ||
        internship.location?.toLowerCase().includes(query) ||
        internship.type?.toLowerCase().includes(query) ||
        internship.skills?.some((skill) =>
          skill.toLowerCase().includes(query)
        )
      );
    });

    setFilteredInternships(filtered);
  }, [search, internships]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center bg-slate-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-sm text-slate-500"
          >
            Loading internships...
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="rounded-xl bg-red-50 px-6 py-4 text-red-600"
        >
          {error}
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
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium text-blue-600"
          >
            Career Opportunities
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-1 text-3xl font-bold text-slate-900"
          >
            Find Your Internship
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-2 max-w-2xl text-slate-500"
          >
            Explore internship opportunities and find the
            right experience to start building your career.
          </motion.p>
        </motion.section>

        {/* Search */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.45,
          }}
          className="mb-8 rounded-2xl bg-white p-5 shadow-sm"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: search ? 1.05 : 1,
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5 text-slate-400" />
            </motion.div>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by internship, company, skill or location..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </motion.section>

        {/* Results Header */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.25,
            duration: 0.4,
          }}
          className="mb-5 flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Available Internships
            </h2>

            <AnimatePresence mode="wait">
              <motion.p
                key={filteredInternships.length}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-1 text-sm text-slate-500"
              >
                {filteredInternships.length}{" "}
                {filteredInternships.length === 1
                  ? "opportunity"
                  : "opportunities"}{" "}
                available
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Results */}
        <AnimatePresence mode="popLayout">
          {filteredInternships.length === 0 ? (
            <motion.div
              key="empty"
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl bg-white p-12 text-center shadow-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 180,
                }}
              >
                <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
              </motion.div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No internships found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or check back later
                for new opportunities.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredInternships.map((internship) => (
                <motion.article
                  layout
                  key={internship._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{
                    y: -6,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg"
                >
                  <div className="flex-1 p-6">
                    {/* Top */}
                    <div className="flex items-start justify-between gap-4">
                      <motion.div
                        whileHover={{
                          scale: 1.08,
                          rotate: 4,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                        }}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50"
                      >
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </motion.div>

                      {internship.type && (
                        <motion.span
                          initial={{
                            opacity: 0,
                            scale: 0.8,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-600"
                        >
                          {internship.type}
                        </motion.span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 text-xl font-semibold text-slate-900">
                      {internship.title}
                    </h3>

                    <p className="mt-1 font-medium text-blue-600">
                      {internship.company}
                    </p>

                    {/* Description */}
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                      {internship.description}
                    </p>

                    {/* Details */}
                    <div className="mt-5 space-y-3">
                      {internship.location && (
                        <InfoRow
                          icon={
                            <MapPin className="h-4 w-4 shrink-0" />
                          }
                          value={internship.location}
                        />
                      )}

                      {internship.duration && (
                        <InfoRow
                          icon={
                            <Clock className="h-4 w-4 shrink-0" />
                          }
                          value={internship.duration}
                        />
                      )}

                      {internship.openings !== undefined && (
                        <InfoRow
                          icon={
                            <Users className="h-4 w-4 shrink-0" />
                          }
                          value={`${internship.openings} ${
                            internship.openings === 1
                              ? "opening"
                              : "openings"
                          }`}
                        />
                      )}

                      {internship.applicationDeadline && (
                        <InfoRow
                          icon={
                            <Calendar className="h-4 w-4 shrink-0" />
                          }
                          value={`Apply by ${new Date(
                            internship.applicationDeadline
                          ).toLocaleDateString()}`}
                        />
                      )}
                    </div>

                    {/* Skills */}
                    {internship.skills?.length > 0 && (
                      <motion.div
                        variants={containerVariants}
                        className="mt-5 flex flex-wrap gap-2"
                      >
                        {internship.skills
                          .slice(0, 4)
                          .map((skill) => (
                            <motion.span
                              key={skill}
                              variants={itemVariants}
                              whileHover={{
                                scale: 1.05,
                                y: -2,
                              }}
                              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                            >
                              {skill}
                            </motion.span>
                          ))}

                        {internship.skills.length > 4 && (
                          <motion.span
                            initial={{
                              opacity: 0,
                              scale: 0.8,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500"
                          >
                            +{internship.skills.length - 4} more
                          </motion.span>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-100 p-5">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={`/student/internships/${internship._id}`}
                        className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        View Internship
                      </Link>
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
};

const InfoRow = ({ icon, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-sm text-slate-500"
    >
      {icon}
      <span>{value}</span>
    </motion.div>
  );
};

export default Internships;