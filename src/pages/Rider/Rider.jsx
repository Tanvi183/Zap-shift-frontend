import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Load service centers data from loader
  const serviceCenters = useLoaderData() || [];

  // Get unique regions
  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  // Filter districts based on selected region
  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter((c) => c.region === region)
      .map((c) => c.district);
  };

  // Watch the selected region
  const selectedRegion = useWatch({
    control,
    name: "region",
    defaultValue: "",
  });

  // Form submission
  const handleRiderApplication = async (data) => {
    try {
      const res = await axiosSecure.post("/riders", data);

      if (res.data.insertedId) {
        await Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "We will reach out to you in 1-4 days.",
          confirmButtonText: "OK",
        });

        navigate("/login"); // Navigate after successful submission
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <h2 className="text-4xl text-primary">Be a Rider</h2>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-12 p-4 text-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Rider Personal Details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Rider Details</h4>

            <label className="label">Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName || ""}
              className="input w-full"
              placeholder="Your Name"
            />

            <label className="label mt-4">Email</label>
            <input
              type="email"
              {...register("email")}
              defaultValue={user?.email || ""}
              className="input w-full"
              placeholder="Your Email"
            />

            <label className="label mt-4">Region</label>
            <select {...register("region")} className="select">
              <option value="" disabled>
                Pick a region
              </option>
              {regions?.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <label className="label mt-4">District</label>
            <select {...register("district")} className="select">
              <option value="" disabled>
                Pick a district
              </option>
              {districtsByRegion(selectedRegion)?.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <label className="label mt-4">Address</label>
            <input
              type="text"
              {...register("address")}
              className="input w-full"
              placeholder="Your Address"
            />
          </fieldset>

          {/* Rider Verification & Bike Details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Verification & Bike</h4>

            <label className="label">Driving License</label>
            <input
              type="text"
              {...register("license")}
              className="input w-full"
              placeholder="Driving License Number"
            />

            <label className="label mt-4">NID</label>
            <input
              type="text"
              {...register("nid")}
              className="input w-full"
              placeholder="National ID Number"
            />

            <label className="label mt-4">Bike</label>
            <input
              type="text"
              {...register("bike")}
              className="input w-full"
              placeholder="Bike Model/Number"
            />
          </fieldset>
        </div>

        <input
          type="submit"
          className="btn btn-primary mt-8 text-black"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
