import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Loading from "../../Component/Loader/Loading";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/admin-stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) {
    return <Loading></Loading>;
  }

  const revenueData = [
    { name: "Doctor", value: stats.revenueByService.doctor },
    { name: "Nursing", value: stats.revenueByService.nursing },
    { name: "Homecare", value: stats.revenueByService.homecare },
    { name: "Physiotherapy", value: stats.revenueByService.physiotherapy },
  ];

  const appointmentData = [
    { name: "Pending", value: stats.appointments.pending },
    { name: "Approved", value: stats.appointments.approved },
    { name: "Cancelled", value: stats.appointments.cancelled },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2>Total Users</h2>
          <p className="text-xl font-bold">{stats.overview.totalUsers}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2>Total Doctors</h2>
          <p className="text-xl font-bold">{stats.overview.totalDoctors}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h2>Appointments</h2>
          <p className="text-xl font-bold">
            {stats.overview.totalAppointments}
          </p>
        </div>

        <div className="bg-purple-100 p-4 rounded-xl shadow">
          <h2>Total Revenue</h2>
          <p className="text-xl font-bold">৳ {stats.overview.totalRevenue}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Appointment Status</h2>
          <PieChart width={350} height={300}>
            <Pie data={appointmentData} dataKey="value" outerRadius={100} label>
              {appointmentData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Revenue by Service</h2>
          <BarChart width={400} height={300} data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="mb-4 font-semibold">Recent Appointments</h2>

        <table className="table">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentAppointments?.map((app) => (
              <tr key={app._id} className=" border-t">
                <td>{app.patientName}</td>
                <td>{app.doctorName}</td>
                <td>{app.date}</td>
                <td
                  className={`font-bold ${
                    app.status === "approved"
                      ? "text-green-600"
                      : app.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {app.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
