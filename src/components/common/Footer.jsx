import React from "react";
import { Link } from "react-router";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              About eTuitionBd
            </h3>
            <p className="text-base text-gray-600">
              A trusted platform connecting students with qualified tutors
              across Bangladesh.
            </p>
          </div>

          {/* Quick links column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-600 hover:text-brand"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tuitions"
                  className="text-base text-gray-600 hover:text-brand"
                >
                  Tuitions
                </Link>
              </li>
              <li>
                <Link
                  to="/tutors"
                  className="text-base text-gray-600 hover:text-brand"
                >
                  Tutors
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-base text-gray-600 hover:text-brand"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base text-gray-600 hover:text-brand"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="text-base text-gray-600">
                Email: info@etuitionbd.com
              </li>
              <li className="text-base text-gray-600">
                Phone: +880 1234 567890
              </li>
              <li className="text-base text-gray-600">
                Location: Rajshahi, Bangladesh
              </li>
            </ul>
          </div>

          {/* Social column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-brand">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand">
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand">
                <LinkedinIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand">
                <XIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-base text-gray-500">
            © {new Date().getFullYear()} eTuitionBd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
