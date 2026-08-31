
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle,
  Clock,
  GraduationCap,
  PlayCircle,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";


export function PublicCourses() {
  const courses = [
    {
      title: "Full Stack Web Development",
      description:
        "Learn frontend and backend development by building real-world applications.",
      level: "Beginner to Advanced",
      duration: "12 Weeks",
      lessons: "60+ Lessons",
    },
    {
      title: "React.js Development",
      description:
        "Master React.js, components, hooks, routing and modern frontend development.",
      level: "Intermediate",
      duration: "8 Weeks",
      lessons: "40+ Lessons",
    },
    {
      title: "JavaScript Fundamentals",
      description:
        "Build a strong foundation in JavaScript and modern programming concepts.",
      level: "Beginner",
      duration: "6 Weeks",
      lessons: "35+ Lessons",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BookOpen className="mx-auto h-12 w-12 text-blue-200" />

            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Explore Our Courses
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-blue-100">
              Learn practical skills through structured courses, projects,
              assignments and industry-focused content.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-xl"
              >
                <div className="flex h-44 items-center justify-center bg-blue-50">
                  <BookOpen className="h-14 w-14 text-blue-600" />
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {course.level}
                  </span>

                  <h2 className="mt-4 text-xl font-bold text-slate-900">
                    {course.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {course.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>

                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      {course.lessons}
                    </div>
                  </div>

                  <Link
                    to="/register"
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


export function PublicInternships() {
  const internships = [
    {
      title: "Frontend Development Intern",
      company: "Nexavision",
      duration: "3 Months",
      mode: "Remote",
    },
    {
      title: "Full Stack Development Intern",
      company: "Nexavision",
      duration: "6 Months",
      mode: "Hybrid",
    },
    {
      title: "React.js Developer Intern",
      company: "Nexavision",
      duration: "3 Months",
      mode: "Remote",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Briefcase className="mx-auto h-12 w-12 text-blue-200" />

            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Find Your Internship
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-blue-100">
              Gain real-world experience, work on practical projects and take
              your first step toward a successful career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Internships */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Opportunities
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Available Internships
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -7 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                    Open
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {internship.title}
                </h3>

                <p className="mt-2 text-sm font-medium text-blue-600">
                  {internship.company}
                </p>

                <div className="mt-5 space-y-3 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {internship.duration}
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {internship.mode}
                  </div>
                </div>

                <Link
                  to="/register"
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-blue-600 p-10 text-center text-white">
            <h2 className="text-3xl font-bold">
              Ready to start your career?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Create your account and explore internship opportunities.
            </p>

            <Link
              to="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50"
            >
              Create Account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PublicLearning() {
  const steps = [
    {
      number: "01",
      icon: Target,
      title: "Choose Your Goal",
      description:
        "Decide what skill you want to learn and choose a learning path that matches your career goal.",
    },
    {
      number: "02",
      icon: BookOpen,
      title: "Learn",
      description:
        "Follow structured lessons and learn concepts through practical examples and guided content.",
    },
    {
      number: "03",
      icon: GraduationCap,
      title: "Practice",
      description:
        "Complete assignments and projects to turn your knowledge into practical skills.",
    },
    {
      number: "04",
      icon: Briefcase,
      title: "Build Your Career",
      description:
        "Use your new skills to apply for internships and prepare for professional opportunities.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GraduationCap className="mx-auto h-12 w-12 text-blue-200" />

            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Your Learning Journey
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-blue-100">
              A simple path from learning new skills to building projects and
              becoming career ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Steps */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Learn at your own pace
            </h2>

            <p className="mt-4 text-slate-500">
              Follow a structured learning process designed to help you
              develop real-world skills.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-7 transition hover:bg-white hover:shadow-xl"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <div>
                      <span className="text-xs font-bold tracking-wider text-blue-600">
                        STEP {step.number}
                      </span>

                      <h3 className="mt-1 text-xl font-bold text-slate-900">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Why Learn With Us
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                More than just watching lessons
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Our learning experience focuses on understanding concepts,
                practicing skills and applying what you learn through real
                projects.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "Structured courses and learning paths",
                  "Practical assignments and projects",
                  "Progress tracking",
                  "Industry-focused skills",
                  "Internship opportunities",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-blue-600" />

                    <span className="font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white"
            >
              <BookOpen className="h-10 w-10" />

              <h3 className="mt-6 text-2xl font-bold">
                Start learning today
              </h3>

              <p className="mt-3 leading-7 text-blue-100">
                Choose a course, start learning and build the skills you need
                for your future career.
              </p>

              <Link
                to="/courses"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
