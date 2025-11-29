import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        Welcome Back
      </h1>
      <p className="text-gray-600 mb-8">Login with ZapShift</p>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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

        <div className="flex justify-end">
          <Link
            // to="/forgot-password"
            className="text-sm text-lime-600 hover:underline"
          >
            Forget Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-2 rounded-md cursor-pointer"
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

      {/* Google Login */}
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
