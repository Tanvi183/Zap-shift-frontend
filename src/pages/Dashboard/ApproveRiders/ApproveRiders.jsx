import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch riders
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  // Update status function
  const updateRiderStatus = async (riderId, status, email) => {
    try {
      const res = await axiosSecure.patch(`/riders/${riderId}`, {
        status,
        email,
      });
      if (res.data.modifiedCount) {
        queryClient.invalidateQueries(["riders", "pending"]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status}.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update rider status.",
      });
    }
  };

  const handleDeleteRider = async (riderId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/riders/${riderId}`);
        if (res.data.deletedCount) {
          queryClient.invalidateQueries(["riders", "pending"]);
          Swal.fire("Deleted!", "Rider has been deleted.", "success");
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to delete rider.",
      });
    }
  };

  return (
    <div>
      <h2 className="text-5xl mb-4">
        Riders Pending Approval: {riders.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td
                  className={`font-bold ${
                    rider.status === "approved"
                      ? "text-green-600"
                      : rider.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {rider.status}
                </td>
                <td>{rider.workStatus}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      updateRiderStatus(rider._id, "approved", rider.email)
                    }
                    className="btn btn-success btn-sm"
                    disabled={rider.status === "approved"}
                    title="Approve Rider"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => updateRiderStatus(rider._id, "rejected")}
                    className="btn btn-warning btn-sm"
                    disabled={rider.status === "rejected"}
                    title="Reject Rider"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button
                    onClick={() => handleDeleteRider(rider._id)}
                    className="btn btn-error btn-sm"
                    title="Delete Rider"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
