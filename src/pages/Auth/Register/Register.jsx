import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // Watch password match
  const password = watch("password", "");

  // Store selected image preview
  const [previewImg, setPreviewImg] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  // const handleRegistation = async (data) => {
  //   const profileImg = data.photo[0];

  //   registerUser(data.email, data.password)
  //     .then((result) => {
  //       console.log(result.user);

  //       // 1. store the image in form data
  //       const formData = new FormData();
  //       formData.append("image", profileImg);

  //       // 2. send the photo to store and get the ul
  //       const image_API_URL = `https://api.imgbb.com/1/upload?key=${
  //         import.meta.env.VITE_image_host_key
  //       }`;

  //       axios.post(image_API_URL, formData).then((res) => {
  //         console.log("after image upload", res.data.data.url);

  //         // update user profile to firebase
  //         const userProfile = {
  //           displayName: data.name,
  //           photoURL: res.data.data.url,
  //         };

  //         updateUserProfile(userProfile)
  //           .then(() => {
  //             console.log("user profile updated done.");
  //             navigate(location.state || "/");
  //           })
  //           .catch((error) => console.log(error));
  //       });

  //       navigate(location?.state || "/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleRegistation = async (data) => {
    try {
      const profileImg = data.photo[0];

      // 1. Register User
      const result = await registerUser(data.email, data.password);
      console.log("User registered:", result.user);

      // 2. Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(image_API_URL, formData);

      const photoURL = imgRes.data.data.url;
      console.log("Uploaded image URL:", photoURL);

      // 3. Update Firebase profile
      const userProfile = {
        displayName: data.name,
        photoURL,
      };

      await updateUserProfile(userProfile);
      console.log("Profile updated");

      // 4. Navigate AFTER everything is done
      navigate(location.state || "/");
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  return (
    <div className="py-10">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        Create an Account
      </h1>
      <p className="text-gray-600 mb-8">Register with ZapShift</p>

      {/* Profile Icon */}
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        {previewImg ? (
          <img
            src={previewImg}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <FaUser className="text-gray-600" />
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleRegistation)} className="space-y-5">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: "image is required" })}
            onChange={handleImageChange}
            className="file-input file-input-accent w-full border border-gray-300 rounded-md"
          />
          {errors.photo && (
            <span className="text-red-500">{errors.photo.message}</span>
          )}
        </div>

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
          className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-2 rounded-md cursor-pointer"
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
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
