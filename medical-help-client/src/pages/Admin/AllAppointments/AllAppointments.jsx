import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const AllAppointments = () => {
    const loadedData = useLoaderData();
    const [appointments, setAppointments] = useState(loadedData);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
        document.getElementById('details_modal').showModal();
    };

    const handleApprove = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to approve this appointment?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:4000/appointments/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'approved' })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            Swal.fire('Approved!', 'The appointment has been approved.', 'success');
                            setAppointments(prev => prev.map(app =>
                                app._id === id ? { ...app, status: 'approved' } : app
                            ));
                        }
                    })
                    .catch(error => console.error(error));
            }
        });
    };

    const handleCancel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to cancel this appointment?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:4000/appointments/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'cancelled' })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            Swal.fire('Cancelled!', 'The appointment has been cancelled.', 'success');

                            setAppointments(prev => prev.map(app =>
                                app._id === id ? { ...app, status: 'cancelled' } : app
                            ));
                        }
                    })
                    .catch(error => console.error(error));
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">All Appointments ({appointments.length})</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Doctor</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Patient</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map((item, idx) => (
                                <tr key={item._id} className="hover:bg-blue-50 transition">
                                    <td className="px-4 py-3 text-sm text-gray-600 font-medium">{idx + 1}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{item.doctorName}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{item.patientName}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        <div className="font-medium">{item.date}</div>
                                        <div className="text-xs text-gray-500">{item.time}</div>
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
                                            <button
                                                onClick={() => handleViewDetails(item)}
                                                className="btn btn-sm btn-info text-white"
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() => handleApprove(item._id)}
                                                className="btn btn-sm btn-success text-white"
                                                disabled={item.status === 'approved' || item.status === 'completed' || item.status === 'cancelled'}
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() => handleCancel(item._id)}
                                                className="btn btn-sm btn-error text-white"
                                                disabled={item.status === 'cancelled'}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            
            <dialog id="details_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-4 border-b pb-2">Appointment Details</h3>

                    {selectedAppointment && (
                        <div className="space-y-3 text-gray-700">
                            <div className="grid grid-cols-2 gap-4">
                                <p><span className="font-semibold text-gray-900">Doctor Name:</span><br /> {selectedAppointment.doctorName}</p>
                                <p><span className="font-semibold text-gray-900">Patient Name:</span><br /> {selectedAppointment.patientName}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <p><span className="font-semibold text-gray-900">Contact:</span><br /> {selectedAppointment.contactNumber}</p>
                                <p><span className="font-semibold text-gray-900">Email:</span><br /> {selectedAppointment.patientEmail}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg">
                                <p><span className="font-semibold text-gray-900">Date:</span><br /> {selectedAppointment.date}</p>
                                <p><span className="font-semibold text-gray-900">Time:</span><br /> {selectedAppointment.time}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-t pt-3 mt-3">
                                <p className="text-center text-sm"><span className="font-semibold text-gray-900">Consultation</span><br /> ৳{selectedAppointment.consultationFee}</p>
                                <p className="text-center text-sm border-l border-r"><span className="font-semibold text-gray-900">Platform</span><br /> ৳{selectedAppointment.platformFee}</p>
                                <p className="text-center text-sm text-indigo-600"><span className="font-semibold text-gray-900">Total</span><br /> ৳{selectedAppointment.totalFee}</p>
                            </div>
                        </div>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AllAppointments;