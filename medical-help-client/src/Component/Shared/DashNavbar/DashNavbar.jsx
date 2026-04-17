import React, { use, useState } from "react";
import { FiBell } from "react-icons/fi";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAdmin from "../../../hooks/useAdmin";
import { Link } from "react-router";
import { MdLogout } from "react-icons/md";

const DashNavbar = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { user } = use(AuthContext);
  const [role] = useAdmin();

  return (
    <div>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-sm text-gray-500">
              Welcome back! {user.displayName}
            </p>
          </div>
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
              <li className="uppercase">
                <span className="justify-between">{role}</span>
              </li>
              <li>
                <span className="justify-between">{user.displayName}</span>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default DashNavbar;
