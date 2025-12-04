import React from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img src={logo} alt="ZapShift logo" className="mb-2.5 z-10" />
        <h3 className="text-4xl font-extrabold -ms-7 z-0">ZapShift</h3>
      </div>
    </Link>
  );
};

export default Logo;
