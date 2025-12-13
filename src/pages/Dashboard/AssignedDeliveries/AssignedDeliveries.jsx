import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcles", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };
    let message = `Parcel Status is updated with ${status
      .split("_")
      .join(" ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            ttitle: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleParcelReject = (parcel) => {};

  return (
    <div>
      <h2 className="text-4xl">Parcels Pending Pickup: {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.deliveryStatus === "driver_assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning text-black ms-2">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>

                <td>
                  {/* Show Picked Up button ONLY when parcel is NOT yet picked up */}
                  {parcel.deliveryStatus !== "parcel_picked_up" &&
                    parcel.deliveryStatus !== "parcel_delivered" && (
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                        }
                        className="btn btn-primary text-black"
                      >
                        Mark as Picked Up
                      </button>
                    )}

                  {/* Show Delivered button ONLY after parcel is picked up */}
                  {parcel.deliveryStatus === "parcel_picked_up" && (
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="btn btn-success text-black mx-2"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
