import {
  EnvelopeIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "./SocialIcons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: "Home", path: "/" },
      { name: "Tuitions", path: "/tuitions" },
      { name: "Tutors", path: "/tutors" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
    forStudents: [
      { name: "Find Tutors", path: "/tutors" },
      { name: "Post Tuition", path: "/register" },
      { name: "Browse Classes", path: "/tuitions" },
    ],
    forTutors: [
      { name: "Join as Tutor", path: "/register" },
      { name: "Find Jobs", path: "/tuitions" },
      { name: "Tutor Guidelines", path: "/about" },
    ],
  };

  const socialLinks = [
    { icon: FacebookIcon, href: "#", label: "Facebook" },
    { icon: InstagramIcon, href: "#", label: "Instagram" },
    { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
    { icon: XIcon, href: "#", label: "X (Twitter)" },
  ];

  return (
    <footer className="relative bg-gray-900 dark:bg-gray-950 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                <span className="text-white font-bold text-xl">e</span>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                TuitionBd
              </span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-sm leading-relaxed">
              A trusted platform connecting students with qualified tutors
              across Bangladesh. Quality education for everyone.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:info@etuitionbd.com"
                className="flex items-center gap-3 text-gray-400 hover:text-indigo-400 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-800 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                  <EnvelopeIcon className="w-4 h-4" />
                </div>
                <span className="text-sm">info@etuitionbd.com</span>
              </a>
              <a
                href="tel:+8801234567890"
                className="flex items-center gap-3 text-gray-400 hover:text-indigo-400 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-800 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                  <PhoneIcon className="w-4 h-4" />
                </div>
                <span className="text-sm">+880 1234 567890</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <span className="text-sm">Rajshahi, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              For Students
            </h3>
            <ul className="space-y-3">
              {footerLinks.forStudents.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Tutors */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              For Tutors
            </h3>
            <ul className="space-y-3">
              {footerLinks.forTutors.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-indigo-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            © {currentYear} eTuitionBd. Made with{" "}
            <HeartIcon className="w-4 h-4 text-red-500 animate-pulse" /> in
            Bangladesh
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-linear-to-br hover:from-indigo-500 hover:to-purple-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
