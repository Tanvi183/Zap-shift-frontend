import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const [parcelType, setParcelType] = useState("document");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("FORM SUBMITTED:", data);
    alert("Booking Submitted!");
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
            register={register("parcelWeight", {
              required: "Parcel weight required",
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
                label="Your District"
                register={register("senderDistrict", {
                  required: "District required",
                })}
                error={errors.senderDistrict}
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
                label="Receiver District"
                register={register("receiverDistrict", {
                  required: "District required",
                })}
                error={errors.receiverDistrict}
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

function InputField({ label, placeholder, register, error }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
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

function SelectField({ label, register, error }) {
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
        <option value="">Select your District</option>
        <option value="District 1">District 1</option>
        <option value="District 2">District 2</option>
        <option value="District 3">District 3</option>
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
