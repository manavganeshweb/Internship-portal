import {
  ArrowUp,
  BookOpen,
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/student/dashboard"
              className="inline-flex items-center gap-2"
            >
              <div className="rounded-lg bg-blue-600 p-2">
                <GraduationCap
                  size={22}
                  className="text-white"
                />
              </div>

              <span className="text-xl font-bold text-slate-900">
                Nexavision
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              Learn new skills, build your career, and discover
              opportunities through our internship and learning
              platform.
            </p>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Learning
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/student/courses"
                  className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-600"
                >
                  <BookOpen size={16} />
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  to="/student/learning"
                  className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-600"
                >
                  <GraduationCap size={16} />
                  My Learning
                </Link>
              </li>

              <li>
                <Link
                  to="/student/certificates"
                  className="text-sm text-slate-500 transition hover:text-blue-600"
                >
                  Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Opportunities
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/student/internships"
                  className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-600"
                >
                  <Briefcase size={16} />
                  Internships
                </Link>
              </li>

              <li>
                <Link
                  to="/student/applications"
                  className="text-sm text-slate-500 transition hover:text-blue-600"
                >
                  My Applications
                </Link>
              </li>

              <li>
                <Link
                  to="/student/profile"
                  className="text-sm text-slate-500 transition hover:text-blue-600"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Contact
            </h3>

            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-500">
                <Mail
                  size={16}
                  className="mt-0.5 shrink-0"
                />
                <span>support@nexavision.com</span>
              </li>

              <li className="flex items-start gap-2 text-sm text-slate-500">
                <Phone
                  size={16}
                  className="mt-0.5 shrink-0"
                />
                <span>+91 00000 00000</span>
              </li>

              <li className="flex items-start gap-2 text-sm text-slate-500">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0"
                />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Nexavision. All rights
            reserved.
          </p>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              Back to top
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;