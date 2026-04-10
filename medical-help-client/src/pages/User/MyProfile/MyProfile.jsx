import React, { useState, useEffect } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Droplet,
    HeartPulse,
    Ruler,
    Weight,
    UserPlus,
    Calendar,
    Edit,
    ShieldCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import { use } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import Loading from "../../../Component/Loader/Loading";
import InfoCard from "./InfoCard";


const MyProfile = () => {
    const { user } = use(AuthContext);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:4000/users?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setUserData(data[0]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    console.log(user);

    if (loading) return <Loading></Loading>;

    return (
        <div className="p-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8 relative">
                {/* Edit Button */}
                <div className="absolute top-0 right-0 p-4">
                    <button
                        className="btn btn-circle bg-indigo-50 text-indigo-600 shadow-sm"
                    >
                        <Edit size={20} />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* User Image */}
                    <div className="avatar">
                        <div className="w-28 rounded-full ring-4 ring-indigo-50 shadow-xl">
                            <img
                                src={
                                    userData?.photoURL ||
                                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                                alt="Profile"
                            />
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                            {userData?.name}
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-xs font-bold uppercase">
                                {userData?.role || "Regular User"}
                            </span>
                        </div>
                        <p className="text-gray-500 mt-4 text-sm flex items-center justify-center md:justify-start gap-2">
                            <Mail size={16} /> {userData?.email}
                        </p>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3">
                            <User size={18} className="text-indigo-500" /> Personal
                            Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InfoCard
                                icon={<Phone className="text-teal-600" />}
                                label="Mobile Number"
                                value={userData?.phone || "Not Set"}
                            />
                            <InfoCard
                                icon={<UserPlus className="text-orange-600" />}
                                label="Emergency Contact"
                                value={userData?.emergencyContact || "Not Set"}
                            />
                            <InfoCard
                                icon={<Droplet className="text-red-600" />}
                                label="Blood Group"
                                value={userData?.bloodGroup || "Not Set"}
                            />
                            <InfoCard
                                icon={<MapPin className="text-blue-600" />}
                                label="Full Address"
                                value={userData?.address || "Not Set"}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3">
                        <HeartPulse size={18} className="text-red-500" /> Medical History /
                        Notes
                    </h3>
                    <div className="bg-red-50/30 p-4 rounded-xl border border-red-100">
                        <p className="text-sm text-gray-700 leading-relaxed italic">
                            {userData?.chronicIllness ||
                                "আপনার কোনো দীর্ঘস্থায়ী রোগ বা এলার্জি থাকলে তা এখানে আপডেট করুন।"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
