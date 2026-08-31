
import { motion } from "framer-motion";
import {
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Platform",
    links: [
      {
        name: "Courses",
        path: "/courses",
      },
      {
        name: "Internships",
        path: "/internships",
      },
      {
        name: "Learning Paths",
        path: "/learning",
      },
      {
        name: "Certificates",
        path: "/certificates",
      },
    ],
  },

  {
    title: "Students",
    links: [
      {
        name: "Dashboard",
        path: "/student/dashboard",
      },
      {
        name: "My Learning",
        path: "/student/learning",
      },
      {
        name: "Applications",
        path: "/student/applications",
      },
      {
        name: "Profile",
        path: "/student/profile",
      },
    ],
  },

  {
    title: "Company",
    links: [
      {
        name: "About Us",
        path: "/about",
      },
      {
        name: "Contact",
        path: "/contact",
      },
      {
        name: "Privacy Policy",
        path: "/privacy-policy",
      },
      {
        name: "Terms",
        path: "/terms",
      },
    ],
  },
];

const HomeFooter = () => {
  return (
    <footer className="bg-slate-950 text-white">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
        }}
        className="mx-auto max-w-7xl px-6 py-16"
      >

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="rounded-xl bg-blue-600 p-3">
                <GraduationCap size={24} />
              </div>

              <span className="text-2xl font-bold">
                Nexavision
              </span>
            </Link>

            <p className="mt-5 max-w-sm leading-7 text-slate-400">
              A modern learning platform helping students
              learn industry skills, build projects and
              unlock internship opportunities.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3 text-sm text-slate-400">

              <div className="flex items-center gap-3">
                <Mail size={16} />
                <span>support@nexavision.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={16} />
                <span>India</span>
              </div>

            </div>

          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>

              <h3 className="font-semibold">
                {section.title}
              </h3>

              <ul className="mt-5 space-y-3">

                {section.links.map((link) => (
                  <li key={link.name}>

                    <Link
                      to={link.path}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.name}
                    </Link>

                  </li>
                ))}

              </ul>

            </div>
          ))}

        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Nexavision.
            All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">

            <a
              href="#"
              aria-label="LinkedIn"
              className="rounded-full bg-white/10 p-2 transition hover:bg-blue-600"
            >
              <FaLinkedin size={18} />
            </a>

            <a
              href="#"
              aria-label="GitHub"
              className="rounded-full bg-white/10 p-2 transition hover:bg-blue-600"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2 transition hover:bg-blue-600"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="rounded-full bg-white/10 p-2 transition hover:bg-blue-600"
            >
              <FaTwitter size={18} />
            </a>

          </div>

        </div>

      </motion.div>

    </footer>
  );
};

export default HomeFooter;
