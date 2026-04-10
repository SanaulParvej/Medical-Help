import React, { use, useEffect, useState } from 'react';
import {
  Activity,
  CalendarDays,
  User,
  CreditCard,
  Phone,
  XCircle,
} from "lucide-react";
import Loading from '../../../Component/Loader/Loading';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

const MyPhysiotherapyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:4000/physiotherapy-bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6 max-w-8xl mx-auto animate-fade-in font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="text-teal-600" size={28} />
          My Physiotherapy Bookings
        </h1>
      </div>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {booking.planName}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold capitalize tracking-wide ${
                    booking.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Patient Name</p>
                    <p className="font-semibold text-gray-800">
                      {booking.patientName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <CalendarDays size={16} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Starting Date</p>
                    <p className="font-semibold text-gray-800">
                      {booking.startDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Contact Number</p>
                    <p className="font-semibold text-gray-800">
                      {booking.phone}
                    </p>
                  </div>
                </div>
                

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Plan Price</p>
                    <p className="font-bold text-gray-800">
                      ৳{booking.planPrice}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  className="w-full btn btn-error font-semibold rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  <XCircle size={18} /> Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No Bookings Found
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            আপনি এখনও কোনো বুকিং করেননি।
          </p>
        </div>
      )}
    </div>
  );
};

export default MyPhysiotherapyBookings;