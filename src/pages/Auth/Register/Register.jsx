import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FaGoogle, FaUser } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Watch password and confirmPassword
  } = useForm();

  // Watch the values of password and confirmPassword
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  // Handle form submission
  const handleRegistation = (data) => {
    console.log(data);
  };

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
      <form onSubmit={handleSubmit(handleRegistation)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 20,
                message: "Name cannot be longer than 20 characters",
              },
            })}
            placeholder="Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
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
