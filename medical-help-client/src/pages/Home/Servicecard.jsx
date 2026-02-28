import React from 'react';
import { PiAmbulance } from "react-icons/pi";
import { GiPillDrop } from "react-icons/gi";
import { GiTestTubes } from "react-icons/gi";
import { LuStethoscope } from "react-icons/lu";


const ServiceCard = () => {
    const services = [
        {
            id: 1,
            icon: <LuStethoscope color='#00BAFE'/>,
            title: 'অনলাইন পরামর্শ',
            description: 'ঘরে বসে বিশেষজ্ঞ ডাক্তারের পরামর্শ নিন'
        },
        {
            id: 2,
            icon: <PiAmbulance color='#00BAFE'/>,
            title: 'জরুরি সেবা',
            description: '২৪/৭ অ্যাম্বুলেন্স জরুরি সেবা'
        },
        {
            id: 3,
            icon: <GiPillDrop color='#00BAFE'/>,
            title: 'ওষুধের সরবরাহ',
            description: 'অনলাইনে ওষুধ অর্ডার করুন এবং ঘরে পান'
        },
        {
            id: 4,
            icon: <GiTestTubes color='#00BAFE'/>,
            title: 'ল্যাব টেস্ট',
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