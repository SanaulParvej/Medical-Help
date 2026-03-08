import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';

const DashNavbar = () => {
    const [notificationOpen, setNotificationOpen] = useState(false);

    return (
        <div>
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-8 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                        <p className="text-sm text-gray-500">Welcome back!</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <button
                                onClick={() => setNotificationOpen(!notificationOpen)}
                                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FiBell size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {notificationOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                    <div className="p-4 border-b border-gray-100">
                                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <p className="text-sm font-medium text-gray-800">New appointment request</p>
                                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                        </div>
                                        <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                            <p className="text-sm font-medium text-gray-800">Patient check-in reminder</p>
                                            <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                            <img src="" alt="" />
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-gray-800">Dr. Admin</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default DashNavbar;