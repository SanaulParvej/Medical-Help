import React from 'react';
import { Link, useLoaderData } from 'react-router';
import { Pencil, Trash2, UserPlus, Inbox } from 'lucide-react';

const AllDoctors = () => {
    const doctors = useLoaderData();

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Doctors</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your clinic's medical professionals and their details.
                    </p>
                </div>
                <Link to={'/dashboard/add-doctor'} className="btn btn-primary">
                    <UserPlus size={16} />
                    Add Doctor
                </Link>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-base-200 border-b border-gray-200 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Doctor Name</th>
                                <th className="px-6 py-4">Specialty</th>
                                <th className="px-6 py-4">Consultation Fee</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-700">
                            {Array.isArray(doctors) && doctors.length > 0 ? (
                                doctors.map((doctor, idx) => (
                                    <tr 
                                        key={doctor._id || idx} 
                                        className="hover:bg-gray-50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 text-gray-400">{idx + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {doctor.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                {doctor.speciality}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            ${doctor.consultation_fee}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    className="p-2 text-blue-600  rounded-lg"
                                                    aria-label="Edit"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button 
                                                    className="p-2 text-red-600  rounded-lg"
                                                    aria-label="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Inbox size={48} strokeWidth={1} className="mb-4 text-gray-300" />
                                            <p className="text-base font-medium text-gray-900">No doctors found</p>
                                            <p className="text-sm mt-1">Get started by adding a new doctor to the system.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllDoctors;