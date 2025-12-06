import React from "react";
import { NavLink, Link } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, signOutUser } = useAuth();

  const handleLogOut = () => {
    signOutUser()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const navItems = [
    { label: "Services", to: "/services" },
    { label: "About Us", to: "/about" },
    { label: "Send Parcel", to: "/send-parcel" },
    { label: "Coverage", to: "/coverage" },
  ];

  const renderLinks = () => (
    <>
      {navItems.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "bg-primary rounded-4xl px-5 py-2.5 font-semibold"
                : "text-base"
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}

      {user && (
        <li>
          <NavLink
            to="/dashboard/my-parcels"
            className={({ isActive }) =>
              isActive
                ? "bg-primary rounded-4xl px-5 py-2.5 font-semibold"
                : "text-base"
            }
          >
            My Parcels
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="py-6">
      <nav className="navbar bg-base-100 rounded-2xl shadow-sm px-4 py-5 lg:px-8 sticky top-0 z-50">
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
          <div to="/" className="flex items-center gap-2 text-xl">
            <Logo />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            {renderLinks()}
          </ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end space-x-2">
          {user ? (
            <a
              onClick={handleLogOut}
              className="btn btn-primary rounded-full px-6"
            >
              Logout
            </a>
          ) : (
            <Link to="/login" className="btn btn-primary rounded-full px-6">
              Login
            </Link>
          )}
          <Link to="/rider" className="btn btn-primary rounded-full px-6">
            Be a Rider
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
