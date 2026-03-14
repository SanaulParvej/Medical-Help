import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import { FaStar, FaMapMarkerAlt, FaBriefcaseMedical, FaGraduationCap, FaStethoscope, FaClock, FaCalendarAlt, FaCheckCircle, } from 'react-icons/fa';

const DoctorDetails = () => {
    const doctor = useLoaderData();
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const { _id, name, image, speciality, experience_years, working_place, consultation_fee, rating, about, education, availability, chamber_time, registration_number, patients_treated, } = doctor;

    const generateTimeSlots = () => {
        if (!chamber_time) return [];

        const timeRegex = /(\d+)(?:PM|AM)?\s*-\s*(\d+)(PM|AM)/i;
        const match = chamber_time.match(timeRegex);

        if (!match) return [];

        const startHour = parseInt(match[1]);
        const endHour = parseInt(match[2]);

        const slots = [];
        for (let i = startHour; i <= endHour; i++) {
            const hour = i % 12 || 12;
            const ampm = i >= 12 ? 'PM' : 'AM';
            slots.push(`${hour}:00 ${ampm}`);
        }
        return slots;
    };

    const getDayName = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };
    const isDateAvailable = () => {
        if (!selectedDate) return true;
        const dayName = getDayName(selectedDate);
        return availability && availability.includes(dayName);
    };

    const timeSlots = generateTimeSlots();

    return (
        <div className="bg-base-300">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Doctor Card */}
                        <div className="bg-white rounded-2xl shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-8">
                                {/* Image */}
                                <div className="md:col-span-2">
                                    <div className="relative">
                                        <img
                                            src={image}
                                            alt={name}
                                            className="w-full h-80 object-cover rounded-xl shadow-lg"
                                        />
                                        <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white rounded-full p-2 shadow-lg flex items-center gap-2">
                                            <FaStar size={15} />
                                            <span className="text-sm font-bold">{rating}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="md:col-span-3 flex flex-col justify-center space-y-4">
                                    {/* Name & Title */}
                                    <div>
                                        <h1 className="text-xl md:text-3xl font-bold text-gray-900">{name}</h1>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                                                <FaBriefcaseMedical size={15} />
                                                {speciality}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="border-l-4 border-green-500 pl-4">
                                            <p className="text-sm text-gray-500 font-medium">Experience</p>
                                            <p className="text-2xl font-bold text-gray-900">{experience_years} Years</p>
                                        </div>
                                        <div className="border-l-4 border-indigo-500 pl-4">
                                            <p className="text-sm text-gray-500 font-medium">Patients Treated</p>
                                            <p className="text-2xl font-bold text-gray-900">{patients_treated}</p>
                                        </div>
                                    </div>

                                    {/* Availability & Chamber Time */}
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium mb-2 flex items-center gap-2">
                                                <FaClock size={14} className="text-indigo-600" />
                                                Chamber Hours
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900 bg-indigo-50 px-3 py-2 rounded-lg">
                                                {chamber_time}
                                            </p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium mb-2">Registration </p>
                                                <p className="text-sm font-semibold text-gray-900">{registration_number}</p>
                                            </div>
                                            <div className="flex items-start gap-3 text-gray-700">
                                                <FaMapMarkerAlt className="text-red-500 mt-1" size={18} />
                                                <div>
                                                    <p className="font-semibold">Hospital/Clinic</p>
                                                    <p className="text-sm text-gray-600">{working_place}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div >
                            </div >
                            {/* About Section */}
                            <div className="px-8 mt-4">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FaStethoscope className="text-indigo-600" />
                                    About
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {about}
                                </p>
                            </div>
                            {/* Available Days */}
                            <div className="px-8 mt-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FaCalendarAlt className="text-indigo-600" />
                                    Available Days
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        availability.map((day, idx) => (
                                            <span key={idx} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-semibold text-sm border border-indigo-200">
                                                {day}
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Education Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FaGraduationCap className="text-indigo-600" />
                                    Education & Qualifications
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-indigo-100 rounded-full p-3 mt-1">
                                            <FaCheckCircle className="text-indigo-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{education}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div >
                    </div >

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Booking Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-indigo-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Book an Appointment</h3>
                                {/* Select Date */}
                                <div className="mb-6">
                                    <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <FaCalendarAlt className="text-indigo-600" size={16} />
                                        Select Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    />
                                    {selectedDate && !isDateAvailable() && (
                                        <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                                            ⚠️ Doctor is not available on {getDayName(selectedDate)}
                                        </p>
                                    )}
                                    {selectedDate && isDateAvailable() && (
                                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                            ✓ Available on {getDayName(selectedDate)}
                                        </p>
                                    )}
                                </div>

                                {/* Select Time */}
                                <div className="mb-6">
                                    <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <FaClock className="text-indigo-600" size={16} />
                                        Chamber Hours: {chamber_time}
                                    </label>
                                    {selectedDate && !isDateAvailable() ? (
                                        <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                            Doctor is not available on {getDayName(selectedDate)}. Please select an available day.
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2">
                                            {timeSlots.length > 0 ? (
                                                timeSlots.map((time, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setSelectedTime(time)}
                                                        disabled={selectedDate && !isDateAvailable()}
                                                        className={`py-2 px-3 rounded-lg font-medium transition text-sm ${selectedTime === time
                                                            ? 'bg-indigo-600 text-white shadow-lg'
                                                            : selectedDate && !isDateAvailable()
                                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="col-span-2 text-sm text-gray-500 p-2">
                                                    Chamber time not specified
                                                </div >
                                            )}
                                        </div >
                                    )}
                                </div >

                                {/* Fee Summary */}
                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-700">Consultation Fee</span>
                                        <span className="font-semibold text-gray-900">{consultation_fee} BDT</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                                        <span>Platform Fee</span>
                                        <span>50 BDT</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <span className="font-bold text-indigo-600 text-lg">{consultation_fee + 50} BDT</span>
                                    </div>
                                </div>

                                {/* Book Button */}
                                <button className="btn btn-primary w-full rounded-lg font-semibold text-base">
                                    <FaCalendarAlt size={18} />
                                    Book Appointment
                                </button>

                                {/* Info Card */}
                                <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                                    <p className="text-xs text-gray-600 text-center">
                                        ✓ Secure booking • ✓ Confirmed instantly • ✓ Get reminder SMS
                                    </p>
                                </div>
                            </div>

                            {/* Quick Info Cards */}
                            <div className="space-y-3">
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
                                        <FaCheckCircle size={16} />
                                        Verified Doctor
                                    </p>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <p className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                                        <FaStethoscope size={16} />
                                        {registration_number ? `Reg: ${registration_number}` : 'Board Certified'}
                                    </p>
                                </div>
                                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                    <p className="text-sm font-semibold text-purple-900 flex items-center gap-2">
                                        <FaStar size={16} />
                                        Rating: {rating}/5
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;