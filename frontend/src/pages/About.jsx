
import { motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  CheckCircle,
  GraduationCap,
  Target,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";


const About = () => {
  const stats = [
    {
      value: "10K+",
      label: "Students Learning",
      icon: Users,
    },
    {
      value: "100+",
      label: "Courses Available",
      icon: BookOpen,
    },
    {
      value: "50+",
      label: "Internship Opportunities",
      icon: Briefcase,
    },
    {
      value: "95%",
      label: "Student Satisfaction",
      icon: CheckCircle,
    },
  ];

  const features = [
    {
      icon: GraduationCap,
      title: "Practical Learning",
      description:
        "Learn through structured courses, projects, assignments and real-world examples.",
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description:
        "Discover internship opportunities and build the skills companies are looking for.",
    },
    {
      icon: Target,
      title: "Industry Focused",
      description:
        "Our learning content is designed around practical and industry-relevant skills.",
    },
    {
      icon: Users,
      title: "Student First",
      description:
        "Everything is designed to make learning simple, accessible and career focused.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 py-24 text-white">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10"
        />

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 flex items-center justify-center gap-2 text-blue-100">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                About Nexavision
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Learn. Build. Grow.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
              Nexavision is a learning and career platform designed to help
              students develop practical skills, gain experience and prepare
              for their professional journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Building better learning experiences for students
            </h2>

            <p className="mt-6 leading-7 text-slate-600">
              Nexavision was created with a simple goal: make skill-based
              learning easier and more accessible for students.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              We combine structured online courses, practical assignments,
              projects and internship opportunities so students can move
              beyond theoretical knowledge and gain skills they can actually
              use.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Whether you are starting your learning journey, improving your
              technical skills or looking for internship opportunities,
              Nexavision helps you take the next step with confidence.
            </p>

            <Link
              to="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  Education meets opportunity
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Learn the right skills, practice them through projects and
                  connect your learning with real career opportunities.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Structured learning paths",
                    "Practical projects",
                    "Internship opportunities",
                    "Progress tracking",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm font-medium text-slate-700"
                    >
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Impact
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Helping students move forward
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>

                  <p className="mt-4 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything you need to grow
            </h2>

            <p className="mt-4 text-slate-600">
              A complete learning experience designed around your academic and
              career goals.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Target className="mx-auto h-10 w-10 text-blue-400" />

            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Empowering students to turn knowledge into opportunity.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-400">
              We believe every student should have access to practical
              learning, meaningful experience and the tools needed to build a
              successful career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center text-white sm:px-12"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to start your journey?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-blue-100">
              Explore our courses, develop practical skills and take the next
              step toward your career.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
