import React, { useState, useEffect, use } from "react";
import {
    CalendarCheck,
    Clock,
    User,
    Stethoscope,
    XCircle,
    CalendarDays,
} from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { Link } from "react-router";
import Loading from "../../../Component/Loader/Loading";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const { user, loading, setLoading } = use(AuthContext);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://medical-help-server.vercel.app/appointments?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setAppointments(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching appointments:", error);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleCancelAppointment = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this doctor appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://medical-help-server.vercel.app/appointments/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "cancelled" }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.modifiedCount > 0) {
                            Swal.fire(
                                "Cancelled!",
                                "Your appointment has been cancelled.",
                                "success",
                            );
                            setAppointments(
                                appointments.map((app) =>
                                    app._id === id ? { ...app, status: "cancelled" } : app,
                                ),
                            );
                        }
                    })
                    .catch((error) =>
                        console.error("Error cancelling appointment:", error),
                    );
            }
        });
    };

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div className="p-6 mx-auto animate-fade-in font-sans">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    My Appointments
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    আপনার সকল ডাক্তারের সিরিয়াল এবং অ্যাপয়েন্টমেন্টের বিস্তারিত তথ্য।
                </p>
            </div>


            {appointments.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {appointments.map((appointment) => (
                        <div
                            key={appointment._id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md"
                        >
                            {/* Card Top / Doctor Name & Status Badge */}
                            <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                                <div className="flex gap-3 items-center">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                        <Stethoscope size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            Dr. {appointment.doctorName}
                                        </h3>
                                        <p className="text-xs font-medium text-indigo-600 mt-0.5">
                                            {appointment.speciality || "Specialist"}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize tracking-wide ${appointment.status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : appointment.status === "cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                >
                                    {appointment.status}
                                </span>
                            </div>

                            {/* Booking Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <CalendarDays size={16} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Appointment Date</p>
                                        <p className="font-semibold text-gray-800">
                                            {appointment.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                                        <Clock size={16} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Time Slot</p>
                                        <p className="font-semibold text-gray-800">
                                            {appointment.time}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Patient Name</p>
                                        <p className="font-semibold text-gray-800">
                                            {appointment.patientName}
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/* Cancel Button (Only if pending) */}
                            {(appointment.status === "pending") && (
                                <div className="pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleCancelAppointment(appointment._id)}
                                        className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition"
                                    >
                                        <XCircle size={18} /> Cancel Appointment
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarCheck size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        No Appointments Found
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        আপনি এখনও কোনো ডাক্তারের সিরিয়াল নেননি। সিরিয়াল নিতে "Find Doctor"
                        পেজে যান।
                    </p>
                    <Link to={"/doctors"} className="btn btn-primary mt-2 w-sm">
                        Find Doctor
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyAppointments;
