import React, { use } from "react";
import Logo from "../../../assets/logo.png";
import { CgLogIn } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, userSignOut } = use(AuthContext);

  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign out successfully",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        console.log("Signed out user");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = (
    <>
      <li className="text-lg">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 underline underline-offset-6 decoration-3"
              : ""
          }
          to={"/"}
        >
          হোম
        </NavLink>
      </li>
      <li className="text-lg">
        <NavLink
          to={"/doctors"}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 underline underline-offset-6 decoration-3"
              : ""
          }
        >
          ডাক্তারসমূহ
        </NavLink>
      </li>
      <li className="text-lg">
        <NavLink
          to={"/services"}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 underline underline-offset-6 decoration-3"
              : ""
          }
        >
          সেবাসমূহ
        </NavLink>
      </li>
      <li className="text-lg">
        <NavLink
          to={"/emergency-service"}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 underline underline-offset-6 decoration-3"
              : ""
          }
        >
          জরুরি সেবা
        </NavLink>
      </li>

      {user && (
        <li className="text-lg">
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 underline underline-offset-4 decoration-3"
                : ""
            }
          >
            ড্যাশবোর্ড
          </NavLink>
        </li>
      )}
    </>
  );

  console.log(user);

  return (
    <div className="sticky top-0 z-20 font-bangla">
      <div className="navbar bg-base-100 shadow-sm lg:px-12">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            className="flex justify-center items-center font-open-sans"
            to={"/"}
          >
            <img className="w-8" src={Logo} alt="" />
            <h1 className="font-bold text-xl text-info">Medical Help</h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end flex gap-3 lg:gap-6">
          {!user ? (
            <>
              <Link
                to={"/auth/login"}
                className="btn btn-xs lg:btn-md rounded-2xl btn-info btn-outline hover:scale-105 hover:transition-all hover:text-white"
              >
                <CgLogIn size={20} /> সাইন ইন
              </Link>
              <Link
                to={"/auth/register"}
                className="btn btn-xs lg:btn-md rounded-2xl btn-info text-white hover:scale-105 hover:transition-all"
              >
                <FaUserFriends size={20} /> সাইন আপ
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleSignOut}
                className="btn btn-xs lg:btn-md rounded-2xl btn-info text-white hidden lg:flex "
              >
                <MdLogout size={16} /> Logout
              </button>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user.photoURL
                          ? user.photoURL
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">{user.displayName}</a>
                  </li>
                  <li>
                    <Link to={"/dashboard/my-profile"}>Profile</Link>
                  </li>
                  <li className="flex lg:hidden">
                    <button
                      onClick={handleSignOut}
                      className="btn btn-xs rounded-2xl btn-info text-white hidden lg:flex "
                    >
                      <MdLogout size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
