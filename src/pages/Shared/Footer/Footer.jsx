import React from "react";
import Logo from "../../../components/Logo/Logo";
import { FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import { NavLink } from "react-router";

const Footer = () => {
  const navItems = [
    { label: "Services", to: "/services" },
    { label: "Coverage", to: "/coverage" },
    { label: "About Us", to: "/about" },
    { label: "Pricing", to: "/pricing" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];

  const renderLinks = () =>
    navItems.map((item) => (
      <li key={item.to}>
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            `${
              isActive ? "text-gray-300" : "text-base"
            } hover:text-gray-300 transition`
          }
        >
          {item.label}
        </NavLink>
      </li>
    ));

  return (
    <footer className="footer footer-horizontal text-secondary footer-center">
      <div className="w-full bg-[#0f0f0f] text-white rounded-3xl py-20 px-6 md:px-27 flex flex-col items-center text-center my-10">
        {/* LOGO CENTERED */}
        <aside className="flex flex-col items-center justify-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          {/* Description */}
          <p className="max-w-3xl text-gray-300 text-sm md:text-base leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </aside>

        {/* Divider */}
        <div className="w-full border-t border-dashed border-gray-700 my-8"></div>

        {/* Nav Links */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            {renderLinks()}
          </ul>
        </nav>

        {/* Divider */}
        <div className="w-full border-t border-dotted border-gray-700 my-8"></div>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a
            href="#"
            className="bg-white text-[#0f0f0f] p-3 rounded-full hover:bg-gray-200 transition"
          >
            <FaLinkedinIn size={18} />
          </a>

          <a
            href="#"
            className="bg-white text-[#0f0f0f] p-3 rounded-full hover:bg-gray-200 transition"
          >
            <RxTwitterLogo size={18} />
          </a>

          <a
            href="#"
            className="bg-white text-[#0f0f0f] p-3 rounded-full hover:bg-gray-200 transition"
          >
            <FaFacebookF size={18} />
          </a>

          <a
            href="#"
            className="bg-white text-[#0f0f0f] p-3 rounded-full hover:bg-gray-200 transition"
          >
            <FaYoutube size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
