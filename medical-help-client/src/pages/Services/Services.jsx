import React from "react";
import {
    FaUserMd,
    FaCalendarCheck,
    FaPhoneAlt,
    FaUserNurse,
    FaHeartbeat,
    FaHome,
} from "react-icons/fa";
import { Link } from "react-router";

const Services = () => {
    const services = [
        {
            id: 1,
            title: "ডাক্তার পরামর্শ",
            description: "অভিজ্ঞ ও বিশেষজ্ঞ ডাক্তারদের সাথে সহজে পরামর্শ নিন।",
            icon: <FaUserMd color='#00BAFE' size={40} />,
            button: "অ্যাপয়েন্টমেন্ট নিন",
            link: '/doctors'
        },
        {
            id: 2,
            title: "অ্যাপয়েন্টমেন্ট বুকিং",
            description: "আপনার পছন্দের ডাক্তারের সাথে সহজেই অ্যাপয়েন্টমেন্ট বুক করুন।",
            icon: <FaCalendarCheck color='#00BAFE' size={40} />,
            button: "বুক করুন",
            link: '/doctors'
        },
        {
            id: 3,
            title: "ফিজিওথেরাপি",
            description: "অনলাইনে ওষুধ অর্ডার করুন এবং ঘরে পান",
            icon: <FaHeartbeat color='#00BAFE' size={40} />,
            button: "কল করুন",
            link: '/physiotherapy-services'
        },
        {
            id: 4,
            title: "হোম কেয়ার",
            description: "ঘরে বসে সাশ্রয়ী সুবিধা সহ টেস্ট",
            icon: <FaHome color='#00BAFE' size={40} />,
            button: "যোগাযোগ করুন",
            link: '/home-care-services'
        },
        {
            id: 5,
            title: "নার্সিং / হোম কেয়ার",
            description: "আপনার বাসায় পেশাদার নার্সিং ও রোগী সেবা।",
            icon: <FaUserNurse color='#00BAFE' size={40} />,
            button: "সেবা নিন",
            link: "/nursing-care-services",
        },
        {
            id: 6,
            title: "ডাক্তার খুঁজুন",
            description: "আপনার রোগ অনুযায়ী অভিজ্ঞ ডাক্তার খুঁজে নিন।",
            icon: <FaUserMd color='#00BAFE' size={40} />,
            button: "ডাক্তার দেখুন",
            link: '/doctors'
        },
    ];

    return (
        <section className="py-16 bg-gray-50 font-bangla">
            <div className="max-w-6xl mx-auto px-10">


                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        আমাদের সেবাসমূহ
                    </h2>
                    <p className="text-gray-500 mt-2">
                        আপনার এবং আপনার পরিবারের জন্য আমরা সর্বোত্তম চিকিৎসা সেবা প্রদান করি।
                    </p>
                </div>


                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">

                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="rounded-xl border-blue-200 border-r border-b-4 border-l-4 bg-white p-6 text-center shadow-xl transition duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="mb-4 flex justify-center">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                {service.title}
                            </h3>

                            <p className="text-gray-500 mb-4">
                                {service.description}
                            </p>

                            <Link
                                to={service.link ? service.link : "/"}
                                className="rounded-lg bg-blue-500 px-5 py-2 text-white transition hover:bg-blue-600"
                            >
                                {service.button}
                            </Link>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Services;