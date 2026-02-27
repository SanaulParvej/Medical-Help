import React from "react";
import {
    FaUserMd,
    FaCalendarCheck,
    FaAmbulance,
    FaPhoneAlt,
    FaUserNurse,
} from "react-icons/fa";

const Services = () => {
    const services = [
        {
            id: 1,
            title: "ডাক্তার পরামর্শ",
            description: "অভিজ্ঞ ও বিশেষজ্ঞ ডাক্তারদের সাথে সহজে পরামর্শ নিন।",
            icon: <FaUserMd className="text-4xl text-blue-500" />,
            button: "অ্যাপয়েন্টমেন্ট নিন",
        },
        {
            id: 2,
            title: "অ্যাপয়েন্টমেন্ট বুকিং",
            description: "আপনার পছন্দের ডাক্তারের সাথে সহজেই অ্যাপয়েন্টমেন্ট বুক করুন।",
            icon: <FaCalendarCheck className="text-4xl text-green-500" />,
            button: "বুক করুন",
        },
        {
            id: 3,
            title: "অ্যাম্বুলেন্স সার্ভিস",
            description: "২৪/৭ জরুরি অ্যাম্বুলেন্স সেবা উপলব্ধ।",
            icon: <FaAmbulance className="text-4xl text-red-500" />,
            button: "কল করুন",
        },
        {
            id: 4,
            title: "জরুরি যোগাযোগ",
            description: "জরুরি চিকিৎসা সহায়তার জন্য দ্রুত যোগাযোগ করুন।",
            icon: <FaPhoneAlt className="text-4xl text-orange-500" />,
            button: "যোগাযোগ করুন",
        },
        {
            id: 5,
            title: "নার্সিং / হোম কেয়ার",
            description: "আপনার বাসায় পেশাদার নার্সিং ও রোগী সেবা।",
            icon: <FaUserNurse className="text-4xl text-purple-500" />,
            button: "সেবা নিন",
        },
        {
            id: 6,
            title: "ডাক্তার খুঁজুন",
            description: "আপনার রোগ অনুযায়ী অভিজ্ঞ ডাক্তার খুঁজে নিন।",
            icon: <FaUserMd className="text-4xl text-blue-500" />,
            button: "ডাক্তার দেখুন",
        }
    ];

    return (
        <section className="py-16 bg-gray-50 font-bangla">
            <div className="max-w-6xl mx-auto px-10">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        আমাদের সেবাসমূহ
                    </h2>
                    <p className="text-gray-500 mt-2">
                        আপনার এবং আপনার পরিবারের জন্য আমরা সর্বোত্তম চিকিৎসা সেবা প্রদান করি।
                    </p>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white border-l-4 border-b-4 border-r rounded-xl shadow-xl p-6 text-center hover:scale-105 hover:shadow-2xl transition duration-300 "
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

                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition">
                                {service.button}
                            </button>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Services;