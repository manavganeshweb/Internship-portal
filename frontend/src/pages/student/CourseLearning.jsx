import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  FileText,
  PlayCircle,
  Trophy,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getCourseById } from "../../api/courseApi";
import { getMyEnrollments } from "../../api/enrollmentApi";
import api from "../../api/axios";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const lessonVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
};

const CourseLearning = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [progress, setProgress] = useState(0);
  const [completedLessonIds, setCompletedLessonIds] =
    useState([]);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [openModules, setOpenModules] = useState({});

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLearningData = async () => {
      try {
        setLoading(true);
        setError("");

        const [courseData, enrollmentData] =
          await Promise.all([
            getCourseById(courseId),
            getMyEnrollments(),
          ]);

        if (!courseData.success) {
          throw new Error(
            courseData.message || "Failed to load course"
          );
        }

        const currentEnrollment =
          enrollmentData.enrollments?.find(
            (item) =>
              item.course?._id === courseId ||
              item.course === courseId
          );

        if (!currentEnrollment) {
          throw new Error(
            "You are not enrolled in this course."
          );
        }

        setCourse(courseData.course);
        setEnrollment(currentEnrollment);

        setProgress(
          Math.min(
            Math.max(Number(currentEnrollment.progress) || 0, 0),
            100
          )
        );

        setCompletedLessonIds(
          currentEnrollment.completedLessons || []
        );

        const modules = [
          ...(courseData.course.modules || []),
        ].sort((a, b) => a.order - b.order);

        const firstModule = modules[0];

        if (firstModule?.lessons?.length) {
          const lessons = [...firstModule.lessons].sort(
            (a, b) => a.order - b.order
          );

          setSelectedLesson(lessons[0]);

          setOpenModules({
            [firstModule._id]: true,
          });
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load course"
        );
      } finally {
        setLoading(false);
      }
    };

    loadLearningData();
  }, [courseId]);

  const sortedModules = useMemo(() => {
    return [...(course?.modules || [])]
      .sort((a, b) => a.order - b.order)
      .map((module) => ({
        ...module,
        lessons: [...(module.lessons || [])].sort(
          (a, b) => a.order - b.order
        ),
      }));
  }, [course]);

  const allLessons = useMemo(() => {
    return sortedModules.flatMap((module) => module.lessons);
  }, [sortedModules]);

  const isLessonCompleted = (lessonId) => {
    return completedLessonIds.some(
      (id) => id.toString() === lessonId.toString()
    );
  };

  const toggleModule = (moduleId) => {
    setOpenModules((previous) => ({
      ...previous,
      [moduleId]: !previous[moduleId],
    }));
  };

  const selectLesson = (lesson) => {
    setSelectedLesson(lesson);

    const parentModule = sortedModules.find((module) =>
      module.lessons.some(
        (item) => item._id === lesson._id
      )
    );

    if (parentModule) {
      setOpenModules((previous) => ({
        ...previous,
        [parentModule._id]: true,
      }));
    }
  };

  const updateLessonProgress = async (complete) => {
    if (!selectedLesson || !enrollment?._id) {
      return;
    }

    try {
      setUpdating(true);
      setError("");

      const endpoint = complete
        ? `/progress/${enrollment._id}/lessons/${selectedLesson._id}/complete`
        : `/progress/${enrollment._id}/lessons/${selectedLesson._id}/incomplete`;

      const response = await api.patch(endpoint);

      if (!response.data.success) {
        throw new Error(
          response.data.message ||
            "Failed to update lesson progress"
        );
      }

      const updatedProgress = Math.min(
        Math.max(Number(response.data.progress) || 0, 0),
        100
      );

      setProgress(updatedProgress);

      setCompletedLessonIds(
        response.data.completedLessons || []
      );

      setEnrollment((previous) =>
        previous
          ? {
              ...previous,
              progress: updatedProgress,
              status: response.data.status,
              completedLessons:
                response.data.completedLessons || [],
            }
          : previous
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update lesson progress"
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleComplete = () => {
    updateLessonProgress(true);
  };

  const handleIncomplete = () => {
    updateLessonProgress(false);
  };

  const handleNextLesson = () => {
    if (!selectedLesson || allLessons.length === 0) {
      return;
    }

    const currentIndex = allLessons.findIndex(
      (lesson) => lesson._id === selectedLesson._id
    );

    if (
      currentIndex !== -1 &&
      currentIndex < allLessons.length - 1
    ) {
      const nextLesson = allLessons[currentIndex + 1];

      selectLesson(nextLesson);
    }
  };

  const currentLessonIndex = selectedLesson
    ? allLessons.findIndex(
        (lesson) => lesson._id === selectedLesson._id
      )
    : -1;

  const hasNextLesson =
    currentLessonIndex !== -1 &&
    currentLessonIndex < allLessons.length - 1;

  const completedCount = completedLessonIds.length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
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
            className="mx-auto h-10 w-10 rounded-full border-4 border-slate-200 border-t-blue-600"
          />

          <p className="mt-4 text-sm text-slate-500">
            Loading your course...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm"
        >
          <XCircle className="mx-auto h-12 w-12 text-red-500" />

          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Unable to open course
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <Link to="/student/courses">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </motion.span>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!course || !enrollment) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-slate-200 bg-white"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <Link
              to="/student/learning"
              className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4" />
              My Learning
            </Link>

            <h1 className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
              {course.title}
            </h1>
          </div>

          <div className="hidden shrink-0 items-center gap-5 sm:flex">
            <div className="text-right">
              <p className="text-xs text-slate-400">
                Course Progress
              </p>

              <motion.p
                key={progress}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-bold text-slate-900"
              >
                {progress}%
              </motion.p>
            </div>

            <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="h-full rounded-full bg-blue-600"
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Progress */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 sm:hidden">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Course Progress
          </span>

          <span className="font-semibold text-slate-900">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full bg-blue-600"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="border-b border-slate-200 bg-white lg:min-h-[calc(100vh-89px)] lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Course Content
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {completedCount} of {allLessons.length}{" "}
                  lessons
                </p>
              </div>

              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50"
              >
                <BookOpen className="h-5 w-5 text-blue-600" />
              </motion.div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full bg-blue-600"
              />
            </div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto lg:max-h-[calc(100vh-190px)]">
            {sortedModules.length === 0 ? (
              <div className="p-6 text-center">
                <BookOpen className="mx-auto h-10 w-10 text-slate-300" />

                <p className="mt-3 text-sm text-slate-500">
                  No lessons available yet.
                </p>
              </div>
            ) : (
              sortedModules.map((module) => {
                const moduleCompleted =
                  module.lessons.filter((lesson) =>
                    isLessonCompleted(lesson._id)
                  ).length;

                const isOpen = Boolean(
                  openModules[module._id]
                );

                return (
                  <div
                    key={module._id}
                    className="border-b border-slate-100"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        toggleModule(module._id)
                      }
                      className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
                    >
                      <motion.div
                        animate={{
                          rotate: isOpen ? 0 : 0,
                        }}
                      >
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                        )}
                      </motion.div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {module.order}. {module.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {moduleCompleted}/
                          {module.lessons.length} completed
                        </p>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pb-2"
                        >
                          {module.lessons.map((lesson) => {
                            const completed =
                              isLessonCompleted(
                                lesson._id
                              );

                            const selected =
                              selectedLesson?._id ===
                              lesson._id;

                            return (
                              <motion.button
                                key={lesson._id}
                                type="button"
                                onClick={() =>
                                  selectLesson(lesson)
                                }
                                whileHover={{
                                  x: 3,
                                }}
                                className={`flex w-full items-start gap-3 px-5 py-3 text-left transition ${
                                  selected
                                    ? "bg-blue-50"
                                    : "hover:bg-slate-50"
                                }`}
                              >
                                <div className="mt-0.5 shrink-0">
                                  {completed ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : selected ? (
                                    <PlayCircle className="h-4 w-4 text-blue-600" />
                                  ) : (
                                    <Circle className="h-4 w-4 text-slate-300" />
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <p
                                    className={`text-sm ${
                                      selected
                                        ? "font-semibold text-blue-700"
                                        : "text-slate-700"
                                    }`}
                                  >
                                    {lesson.order}.{" "}
                                    {lesson.title}
                                  </p>

                                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                    <span className="capitalize">
                                      {lesson.type}
                                    </span>

                                    {lesson.duration > 0 && (
                                      <>
                                        <span>•</span>

                                        <span>
                                          {lesson.duration}{" "}
                                          min
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Main Learning Area */}
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completion Banner */}
          <AnimatePresence>
            {progress >= 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="mb-6 rounded-2xl border border-green-100 bg-green-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100"
                  >
                    <Trophy className="h-6 w-6 text-green-600" />
                  </motion.div>

                  <div>
                    <h2 className="text-lg font-bold text-green-900">
                      Course Completed!
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-green-700">
                      Congratulations! You have completed
                      all lessons in this course.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedLesson ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex min-h-[500px] items-center justify-center rounded-2xl bg-white shadow-sm"
            >
              <div className="text-center">
                <BookOpen className="mx-auto h-12 w-12 text-slate-300" />

                <h2 className="mt-4 text-xl font-semibold text-slate-900">
                  Select a lesson
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Choose a lesson from the course content.
                </p>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLesson._id}
                variants={lessonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Lesson Header */}
                <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600"
                    >
                      {selectedLesson.type}
                    </motion.span>

                    {selectedLesson.duration > 0 && (
                      <span className="flex items-center gap-1.5 text-sm text-slate-400">
                        <Clock className="h-4 w-4" />
                        {selectedLesson.duration} min
                      </span>
                    )}

                    {isLessonCompleted(
                      selectedLesson._id
                    ) && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Completed
                      </motion.span>
                    )}
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                    {selectedLesson.title}
                  </h2>
                </section>

                {/* Lesson Content */}
                <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
                  {selectedLesson.type === "video" ? (
                    <div className="bg-slate-950">
                      {selectedLesson.content ? (
                        <video
                          key={selectedLesson._id}
                          src={selectedLesson.content}
                          controls
                          className="aspect-video w-full"
                        >
                          Your browser does not support video
                          playback.
                        </video>
                      ) : (
                        <div className="flex aspect-video items-center justify-center">
                          <div className="text-center text-white">
                            <PlayCircle className="mx-auto h-16 w-16 text-slate-500" />

                            <p className="mt-4 text-sm text-slate-400">
                              Video content is not available
                              yet.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : selectedLesson.type === "pdf" ? (
                    <div>
                      {selectedLesson.content ? (
                        <iframe
                          key={selectedLesson._id}
                          src={selectedLesson.content}
                          title={selectedLesson.title}
                          className="h-[650px] w-full"
                        />
                      ) : (
                        <div className="flex min-h-[400px] items-center justify-center">
                          <div className="text-center">
                            <FileText className="mx-auto h-16 w-16 text-slate-300" />

                            <p className="mt-4 text-sm text-slate-500">
                              PDF content is not available yet.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex min-h-[400px] items-center justify-center p-8">
                      <div className="max-w-md text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 180,
                          }}
                          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50"
                        >
                          <BookOpen className="h-8 w-8 text-blue-600" />
                        </motion.div>

                        <h3 className="mt-5 text-xl font-bold text-slate-900">
                          Quiz
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {selectedLesson.content ||
                            "Quiz content will be available soon."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Lesson Actions */}
                  <div className="border-t border-slate-200 p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Lesson Progress
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Mark this lesson as complete after
                          finishing it.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {isLessonCompleted(
                          selectedLesson._id
                        ) ? (
                          <motion.button
                            type="button"
                            onClick={handleIncomplete}
                            disabled={updating}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <XCircle className="h-4 w-4" />

                            {updating
                              ? "Updating..."
                              : "Mark Incomplete"}
                          </motion.button>
                        ) : (
                          <motion.button
                            type="button"
                            onClick={handleComplete}
                            disabled={updating}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <CheckCircle className="h-4 w-4" />

                            {updating
                              ? "Updating..."
                              : "Mark as Complete"}
                          </motion.button>
                        )}

                        {hasNextLesson && (
                          <motion.button
                            type="button"
                            onClick={handleNextLesson}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Next Lesson
                            <ChevronRight className="h-4 w-4" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Course Information */}
                <section className="mt-6 grid gap-6 md:grid-cols-2">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Course
                        </p>

                        <p className="font-semibold text-slate-900">
                          {course.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Completed Lessons
                        </p>

                        <p className="font-semibold text-slate-900">
                          {completedCount} / {allLessons.length}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </section>
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseLearning;