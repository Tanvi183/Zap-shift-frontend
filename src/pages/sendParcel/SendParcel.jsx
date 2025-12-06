import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const [parcelType, setParcelType] = useState("document");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderName: user?.displayName || "",
      senderEmail: user?.email || "",
    },
  });

  const serviceCenters = useLoaderData();
  const regionduplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionduplicate)]; // only took unique one
  // console.log(regions);

  // Sender Region wise District show
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const senderDistricts = senderRegion
    ? [
        ...new Set(
          serviceCenters
            .filter((c) => c.region === senderRegion)
            .map((c) => c.district)
        ),
      ].sort()
    : [];

  // Receiver Region wise District show
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const receiverDistricts = receiverRegion
    ? [
        ...new Set(
          serviceCenters
            .filter((c) => c.region === receiverRegion)
            .map((c) => c.district)
        ),
      ].sort()
    : [];

  const onSubmit = (data) => {
    // console.log(data);

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight) || 0;

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      const base = isSameDistrict ? 110 : 150;
      if (parcelWeight <= 3) {
        cost = base;
      } else {
        const extraWeight = parcelWeight - 3;
        const extraCharge = extraWeight * 40; // 40 per kg extra
        cost = base + extraCharge;
      }
    }

    console.log(cost);

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel", res.data);
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex justify-center py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white rounded-2xl shadow-sm p-8 md:p-12"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">Send A Parcel</h1>
        <p className="mt-4 text-gray-700 font-semibold">
          Enter your parcel details
        </p>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Parcel Type */}
        <div className="flex items-center gap-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="document"
              {...register("parcelType")}
              checked={parcelType === "document"}
              onChange={() => setParcelType("document")}
              className="w-4 h-4 text-green-600 focus:ring-green-600"
            />
            <span className="text-gray-800">Document</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="non-doc"
              {...register("parcelType")}
              checked={parcelType === "non-doc"}
              onChange={() => setParcelType("non-doc")}
              className="w-4 h-4 text-green-600 focus:ring-green-600"
            />
            <span className="text-gray-800">Not-Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <InputField
            label="Parcel Name"
            placeholder="Parcel Name"
            register={register("parcelName", {
              required: "Parcel name required",
            })}
            error={errors.parcelName}
          />

          <InputField
            label="Parcel Weight (KG)"
            placeholder="Parcel Weight (KG)"
            type="number"
            register={register("parcelWeight", {
              required: "Parcel weight required",
              min: { value: 0.1, message: "Weight must be greater than 0" },
            })}
            error={errors.parcelWeight}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {/* Sender */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Sender Details</h3>

            <div className="space-y-4">
              <InputField
                label="Sender Name"
                placeholder="Sender Name"
                register={register("senderName", {
                  required: "Sender name required",
                })}
                error={errors.senderName}
              />

              <InputField
                label="Address"
                placeholder="Address"
                register={register("senderAddress", {
                  required: "Address required",
                })}
                error={errors.senderAddress}
              />

              <InputField
                label="Sender Phone No"
                placeholder="Sender Phone No"
                register={register("senderPhone", {
                  required: "Phone number required",
                  minLength: { value: 10, message: "Invalid phone number" },
                })}
                error={errors.senderPhone}
              />

              <SelectField
                label="Your Region "
                register={register("senderRegion", {
                  required: "Region required",
                })}
                value={regions}
                error={errors.senderRegion}
                placeholder="Pick a region"
              />

              <SelectField
                label="Your District"
                register={register("senderDistrict", {
                  required: "District required",
                })}
                value={senderDistricts}
                error={errors.senderDistrict}
                placeholder="Pick a district"
              />

              <TextareaField
                label="Pickup Instruction"
                placeholder="Pickup Instruction"
                register={register("pickupInstruction")}
              />
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Receiver Details
            </h3>

            <div className="space-y-4">
              <InputField
                label="Receiver Name"
                placeholder="Receiver Name"
                register={register("receiverName", {
                  required: "Receiver name required",
                })}
                error={errors.receiverName}
              />

              <InputField
                label="Receiver Address"
                placeholder="Address"
                register={register("receiverAddress", {
                  required: "Address required",
                })}
                error={errors.receiverAddress}
              />

              <InputField
                label="Receiver Contact No"
                placeholder="Receiver Contact No"
                register={register("receiverPhone", {
                  required: "Contact number required",
                  minLength: { value: 10, message: "Invalid phone number" },
                })}
                error={errors.receiverPhone}
              />

              <SelectField
                label="Receiver Region"
                register={register("receiverRegion", {
                  required: "Region required",
                })}
                value={regions}
                error={errors.receiverRegion}
                placeholder="Pick a region"
              />

              <SelectField
                label="Receiver District"
                register={register("receiverDistrict", {
                  required: "District required",
                })}
                value={receiverDistricts}
                error={errors.receiverDistrict}
                placeholder="Pick a district"
              />

              <TextareaField
                label="Delivery Instruction"
                placeholder="Delivery Instruction"
                register={register("deliveryInstruction")}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          * PickUp Time 4pm-7pm Approx.
        </p>

        <button
          type="submit"
          className="mt-6 bg-lime-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-lime-600 transition cursor-pointer"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;

/* ---------------------- Reusable Components ---------------------- */

function InputField({ label, placeholder, register, error, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full mt-1 border rounded-md px-3 py-2 outline-none 
          ${
            error
              ? "border-red-500 focus:ring-red-600"
              : "border-gray-300 focus:ring-green-600"
          }
          focus:ring-2`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

function SelectField({
  label = "",
  register = () => {},
  error = null,
  value = [],
  placeholder,
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select
        {...register}
        className={`w-full mt-1 border rounded-md px-3 py-2 text-gray-600 bg-white outline-none 
        ${
          error
            ? "border-red-500 focus:ring-red-600"
            : "border-gray-300 focus:ring-green-600"
        }
        focus:ring-2`}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {value.map((r, i) => (
          <option key={i} value={r}>
            {r}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

function TextareaField({ label, placeholder, register }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <textarea
        placeholder={placeholder}
        rows={3}
        {...register}
        className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-600"
      ></textarea>
    </div>
  );
}
