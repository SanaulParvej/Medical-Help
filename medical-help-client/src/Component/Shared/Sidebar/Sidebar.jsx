import React, { use } from 'react';
import { NavLink } from 'react-router';
import { FiMenu, FiX, FiUsers, FiSettings, FiLogOut, FiGrid, FiCalendar, FiHome, FiBookmark } from 'react-icons/fi';
import { FaFileMedical } from "react-icons/fa";
import useAdmin from '../../../hooks/useAdmin';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import Loading from '../../Loader/Loading';

const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
    const [role, isAdminLoading] = useAdmin();
    const { userSignOut } = use(AuthContext)
    const handleSignOut = () => {
        userSignOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sign out successfully",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
                console.log('Signed out user');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const adminMenuItems = [
        { name: "Home", icon: FiHome, path: '/' },
        { name: 'Dashboard', icon: FiGrid, path: '/dashboard' },
        { name: 'All Appointments', icon: FiCalendar, path: '/dashboard/all-appointments' },
        { name: 'All Doctors', icon: FiUsers, path: '/dashboard/all-doctors' },
        { name: 'All Bookings', icon: FaFileMedical, path: '/dashboard/all-bookings' },
        { name: 'All Users', icon: FiUsers, path: '/dashboard/all-users' },
    ];

    const userMenuItems = [
        { name: "Home", icon: FiGrid, path: '/' },
        { name: 'My Appointments', icon: FiCalendar, path: '/dashboard/my-appointments' },
        { name: 'My Profile', icon: FiUsers, path: '/dashboard/profile' },
    ];

    const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;

    if (isAdminLoading) {
        return <Loading></Loading>;
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
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors group">
                            <item.icon size={20} className="shrink-0" />
                            {sidebarOpen && (
                                <span className="text-sm font-medium">{item.name}</span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-6 left-3 right-3">
                    <button onClick={handleSignOut} className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors text-red-400">
                        <FiLogOut size={20} className="shrink-0" />
                        {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;