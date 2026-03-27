import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Shield, Users } from 'lucide-react';
import Swal from 'sweetalert2';

const AllUsers = () => {

    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    return (
        <div className="max-w-7xl mx-auto p-6 relative">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Users className="text-indigo-600" size={28} />
                    All Registered Users ({users.length})
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage system users and assign admin roles.
                </p>
            </div>

            {/* Simple Table Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-700">
                            {users.length > 0 ? (
                                users.map((user, idx) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-400">{idx + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{user.name || 'N/A'}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.role === 'admin' 
                                                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                                                : 'bg-green-50 text-green-700 border border-green-200'
                                            }`}>
                                                {user.role === 'admin' ? 'Admin' : 'User'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex justify-end gap-3">
                                            <button 
                                                disabled={user.role === 'admin'}
                                                className="btn btn-sm btn-primary disabled:bg-gray-100 disabled:text-gray-400 font-medium transition"
                                            >
                                                <Shield size={14} className="mr-1" /> Make Admin
                                            </button>
                                            <button className='btn btn-sm btn-error text-base-100'>
                                                Block User
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No users found.
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

export default AllUsers;