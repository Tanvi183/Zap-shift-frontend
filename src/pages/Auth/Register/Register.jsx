import React from "react";
import { FaGoogle, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  return (
    <div>
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        Create an Account
      </h1>
      <p className="text-gray-600 mb-8">Register with ZapShift</p>

      {/* Profile Icon */}
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <FaUser />
      </div>

      {/* Form */}
      <form className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-2 rounded-md"
        >
          Register
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-lime-600 hover:underline">
          Login
        </Link>
      </p>

      <div className="my-4 text-center text-gray-500">Or</div>

      {/* Google Login */}
      <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-50 cursor-pointer">
        <FaGoogle className="w-5" />
        Register with Google
      </button>
    </div>
  );
};

export default Register;
