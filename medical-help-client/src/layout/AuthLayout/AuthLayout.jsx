import React from 'react';
import { Outlet, NavLink } from 'react-router';
import Navbar from '../../Component/Shared/Navbar/Navbar';

const AuthLayout = () => {
    return (
        <div className="min-h-screen relative bg-cover bg-center" style={{
            backgroundImage: "url(https://i.ibb.co/Df7SCRDg/Auth-Layout.jpg)",
        }}>

            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
            <div>
                <Navbar></Navbar>
            </div>

            <div className="flex items-center justify-center min-h-[calc(100vh-68px)] px-4 z-10 relative">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;