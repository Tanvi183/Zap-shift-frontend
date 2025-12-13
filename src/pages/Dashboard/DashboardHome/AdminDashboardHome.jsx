import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Utility to generate colors dynamically
const generateColor = (index) => {
  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28FFF",
    "#FF6F61",
    "#FFB6C1",
    "#8DD1E1",
    "#82CA9D",
    "#D0ED57",
  ];
  return colors[index % colors.length]; // cycle if more statuses than colors
};

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const pieData = deliveryStats.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  return (
    <div>
      <h2 className="text-4xl mb-6">Admin Dashboard</h2>

      {/* Stats */}
      <div className="stats shadow mb-10">
        {deliveryStats.map((stat) => (
          <div key={stat._id} className="stat">
            <div className="stat-title text-xl">{stat._id}</div>
            <div className="stat-value">{stat.count}</div>
            <div className="stat-desc">Total Parcels</div>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={generateColor(index)} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
