import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../../Component/Shared/Sidebar/Sidebar';
import DashNavbar from '../../Component/Shared/DashNavbar/DashNavbar';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}></Sidebar>

            <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col transition-all duration-300`}>
                <DashNavbar></DashNavbar>
                <main className="flex-1 overflow-auto">
                    <div className="p-4">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;