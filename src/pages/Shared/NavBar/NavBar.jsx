import React from "react";
import { NavLink, Link } from "react-router";
import Logo from "../../../components/Logo/Logo";

const NavBar = () => {
  const navItems = [
    { label: "Services", to: "/services" },
    { label: "About Us", to: "/about" },
    { label: "Coverage", to: "/coverage" },
  ];

  const renderLinks = () =>
    navItems.map((item) => (
      <li key={item.to}>
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "text-base"
          }
        >
          {item.label}
        </NavLink>
      </li>
    ));

  return (
    <nav className="navbar bg-base-100 shadow-sm px-4 lg:px-8 sticky top-0 z-50">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box"
          >
            {renderLinks()}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 btn btn-ghost text-xl">
          <Logo />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{renderLinks()}</ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end">
        <Link to="/contact" className="btn btn-primary rounded-full px-6">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
