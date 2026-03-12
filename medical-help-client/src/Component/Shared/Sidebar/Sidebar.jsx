import React from 'react';
import { Link } from 'react-router';
import { FiMenu, FiX, FiUsers, FiSettings, FiLogOut, FiGrid, FiCalendar } from 'react-icons/fi';
import useAdmin from '../../../hooks/useAdmin';

const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
    const [role, isAdminLoading] = useAdmin();

    const adminMenuItems = [
        { name: "Home", icon: FiGrid, path: '/' },
        { name: 'Dashboard', icon: FiGrid, path: '/dashboard' },
        { name: 'Appointments', icon: FiCalendar, path: '/dashboard/appointments' },
        { name: 'Patients', icon: FiUsers, path: '/dashboard/patients' },
        { name: 'Analytics', icon: FiUsers, path: '/dashboard/analytics' },
        { name: 'Settings', icon: FiSettings, path: '/dashboard/settings' },
    ];

    const userMenuItems = [
        { name: "Home", icon: FiGrid, path: '/' },
        { name: 'My Appointments', icon: FiCalendar, path: '/dashboard/my-appointments' },
        { name: 'My Profile', icon: FiUsers, path: '/dashboard/profile' },
        { name: 'Settings', icon: FiSettings, path: '/dashboard/settings' },
    ];

    const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;

    if (isAdminLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-linear-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 ease-in-out fixed h-screen left-0 top-0 z-40`}>
                {/* Logo Section */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    {sidebarOpen && (
                        <div className="flex items-center gap-2">
                            <img src="" alt="" />
                            <h1 className="text-lg font-bold">Medical Help</h1>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-8 px-3 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors group"
                        >
                            <item.icon size={20} className="shrink-0" />
                            {sidebarOpen && (
                                <span className="text-sm font-medium">{item.name}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-6 left-3 right-3">
                    <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors text-red-400">
                        <FiLogOut size={20} className="shrink-0" />
                        {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;