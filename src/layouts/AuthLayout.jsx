import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <nav className="py-2">
        <Logo></Logo>
      </nav>
      <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white">
        {/* Left Section */}
        <div className="flex flex-col justify-center px-8 md:px-20">
          <Outlet />
        </div>

        {/* Right Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-[#FAFDF4]">
          <img
            src={authImage}
            alt="delivery illustration"
            className="w-[70%] max-w-[450px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
