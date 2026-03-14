import React from 'react';
import { FaUserMd, FaHeartbeat, FaHome, FaUserNurse } from "react-icons/fa";

const ServiceCard = () => {
    const services = [
        {
            id: 1,
            icon: <FaUserMd color='#00BAFE' size={40} />,
            title: 'ডাক্তার খুঁজুন',
            description: 'ঘরে বসে বিশেষজ্ঞ ডাক্তারের পরামর্শ নিন'
        },
        {
            id: 2,
            icon: <FaUserNurse color='#00BAFE' size={40} />,
            title: 'নার্সিং কেয়ার',
            description: '২৪/৭ অ্যাম্বুলেন্স জরুরি সেবা'
        },
        {
            id: 3,
            icon: <FaHeartbeat color='#00BAFE' size={40} />,
            title: "ফিজিওথেরাপি",
            description: 'অনলাইনে ওষুধ অর্ডার করুন এবং ঘরে পান'
        },
        {
            id: 4,
            icon: <FaHome color='#00BAFE' size={40} />,
            title: "হোম কেয়ার",
            description: 'ঘরে বসে সাশ্রয়ী সুবিধা সহ টেস্ট'
        }
    ];

    return (
        <section className="py-14 bg-base-100 font-bangla">
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">আমাদের সেবাসমূহ</h2>
                    <p className="text-gray-500 mt-2">সম্পূর্ণ স্বাস্থ্যসেবা সমাধান আপনার হাতের মুঠোয়</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="card bg-base-100 shadow-xl border border-base-200  hover:scale-105 transition duration-300">
                            <div className="card-body items-center text-center">
                                <div className="text-4xl text-red-600">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                                <p className="text-gray-500">{service.description}</p>
                                <div className="card-actions mt-2">
                                    <button className="btn btn-info btn-sm text-white">বিস্তারিত</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceCard;