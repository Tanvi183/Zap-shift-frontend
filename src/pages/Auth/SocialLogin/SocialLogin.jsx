import React from "react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // create user in the database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user data has been stored", res.data);
          navigate(location.state || "/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-50 cursor-pointer"
    >
      <FaGoogle className="w-5" />
      Login with Google
    </button>
  );
};

export default SocialLogin;
