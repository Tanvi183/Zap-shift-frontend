import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        Welcome Back
      </h1>
      <p className="text-gray-600 mb-8">Login with ZapShift</p>

      <form className="space-y-5">
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

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-lime-600 hover:underline"
          >
            Forget Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-2 rounded-md"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Don’t have any account?{" "}
        <Link to="/register" className="text-lime-600 hover:underline">
          Register
        </Link>
      </p>

      <div className="my-4 text-center text-gray-500">Or</div>

      <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-50 cursor-pointer">
        <FaGoogle className="w-5" />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
