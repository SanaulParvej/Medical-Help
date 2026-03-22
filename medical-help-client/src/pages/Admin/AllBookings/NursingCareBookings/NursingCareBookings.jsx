import React, { useState, useEffect } from 'react';
import Loading from '../../../../Component/Loader/Loading';

const NursingCareBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:4000/nursing-bookings")
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Nursing Care Bookings ({bookings.length})</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Patient</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Plan & Date</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.map((item, idx) => (
                                <tr key={item._id} className="hover:bg-blue-50 transition">
                                    <td className="px-4 py-3 text-sm text-gray-600 font-medium">{idx + 1}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        <div className="font-medium">{item.patientName}</div>
                                        <div className="text-xs text-gray-500">{item.patientEmail}</div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        <div className="font-medium">{item.phone}</div>
                                        <div className="text-xs text-gray-500 truncate w-32" title={item.address}>{item.address}</div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        <div className="font-medium">{item.planName}</div>
                                        <div className="text-xs text-gray-500 font-semibold">{item.startDate}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={
                                                item.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold"
                                                    : item.status === "completed" || item.status === "approved"
                                                        ? "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold"
                                                        : item.status === "cancelled"
                                                            ? "bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold"
                                                            : "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold"
                                            }
                                        >
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center items-center gap-2">

                                            <button className="btn btn-sm btn-success text-white">
                                                Approve
                                            </button>

                                            <button className="btn btn-sm btn-error text-white">
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {bookings.length === 0 && !loading && (
                        <div className="text-center py-8 text-gray-500">
                            No nursing bookings found.
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default NursingCareBookings;