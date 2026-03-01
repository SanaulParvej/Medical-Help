import React, { use } from 'react';
import Logo from '../../../assets/logo.png'
import { CgLogIn } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { Link, NavLink } from 'react-router';
import AuthProvider from '../../../contexts/AuthContext/AuthProvider';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';


const Navbar = () => {

    const { user } = use(AuthContext)

    console.log(user);

    const navLinks = <>
        <li className='text-lg'><NavLink to={'/'}>হোম</NavLink></li>
        <li className='text-lg'><NavLink to={'/services'}>সেবাসমূহ</NavLink></li>
        <li className='text-lg'><NavLink>আমাদের সম্পর্কে</NavLink></li>
        <li className='text-lg'><NavLink>যোগাযোগ</NavLink></li>
    </>
    return (
        <div className='sticky top-0 z-20 font-bangla'>
            <div className="navbar bg-base-100 shadow-sm lg:px-12">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link className='flex justify-center items-center font-open-sans'
                        to={"/"}>
                        <img className='w-8' src={Logo} alt="" />
                        <h1 className="font-bold text-xl text-info">Medical Help</h1>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end flex gap-3 lg:gap-6">
                    {
                        user ? (<>                    <Link to={"/auth/login"} className="btn btn-xs lg:btn-md rounded-2xl btn-info btn-outline hover:scale-105 hover:transition-all hover:text-white">
                            <CgLogIn size={20} />  সাইন ইন
                        </Link>

                            <Link to={"/auth/register"} className="btn btn-xs lg:btn-md rounded-2xl btn-info text-white hover:scale-105 hover:transition-all">
                                <FaUserFriends size={20} /> সাইন আপ
                            </Link></>) : (<Link to={"/auth/register"} className="btn btn-xs lg:btn-md rounded-2xl btn-info text-white hover:scale-105 hover:transition-all">
                                <FaUserFriends size={20} /> Logout
                            </Link>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;