import React from 'react';
import {
    Phone, AlertTriangle, Flame, Shield,
    Ambulance, HeartPulse, Baby, Snowflake, Info
} from 'lucide-react';

const EmergencyService = () => {
    const hotlines = [
        {
            title: 'জাতীয় জরুরি সেবা',
            desc: 'যেকোনো জরুরি পরিস্থিতিতে কল করুন',
            number: '999', icon: AlertTriangle,
            color: 'bg-red-500',
            btnColor: 'bg-red-500 hover:bg-red-600'
        },
        {
            title: 'অ্যাম্বুলেন্স সেবা',
            desc: 'দ্রুত অ্যাম্বুলেন্স সেবা পেতে কল করুন',
            number: '01700-000000',
            icon: Ambulance,
            color: 'bg-orange-500',
            btnColor: 'bg-red-500 hover:bg-red-600'
        },
        {
            title: 'ফায়ার সার্ভিস',
            desc: 'অগ্নিকাণ্ড ও উদ্ধার কাজের জন্য',
            number: '16163',
            icon: Flame,
            color: 'bg-yellow-500',
            btnColor: 'bg-red-500 hover:bg-red-600'
        },
        {
            title: 'পুলিশ',
            desc: 'নিরাপত্তা সংক্রান্ত জরুরি সেবা',
            number: '999',
            icon: Shield,
            color: 'bg-blue-500',
            btnColor: 'bg-red-500 hover:bg-red-600'
        },
    ];

    const ambulanceServices = [
        {
            title: 'বেসিক অ্যাম্বুলেন্স',
            desc: 'সাধারণ রোগী পরিবহন',
            features: ['অক্সিজেন সুবিধা', 'প্রশিক্ষিত স্টাফ', 'প্রাথমিক চিকিৎসা'],
            price: '১৫০০-২৫০০',
            phone: '01711-000001',
            icon: Ambulance,
            color: 'text-teal-600 bg-teal-100'
        },
        {
            title: 'এডভান্স লাইফ সাপোর্ট',
            desc: 'গুরুতর রোগীর জন্য',
            features: ['লাইফ-সাপোর্ট সুবিধা', 'ভেন্টিলেটর', 'জরুরি ওষুধ', 'প্যারামেডিক'],
            price: '৫০০০-৮০০০',
            phone: '01711-000002',
            icon: HeartPulse,
            color: 'text-teal-600 bg-teal-100'
        },
        {
            title: 'নবজাতক অ্যাম্বুলেন্স',
            desc: 'নবজাতক শিশুর জন্য',
            features: ['ইনকিউবেটর', 'শিশু বিশেষজ্ঞ', 'বিশেষ যত্ন'],
            price: '৬০০০-১০০০০',
            phone: '01711-000003',
            icon: Baby,
            color: 'text-teal-600 bg-teal-100'
        },
        {
            title: 'ফ্রিজ অ্যাম্বুলেন্স',
            desc: 'মৃতদেহ পরিবহন',
            features: ['ফ্রিজ সুবিধা', 'সম্মানজনক পরিবহন'],
            price: '৩০০০-৫০০০',
            phone: '01711-000004',
            icon: Snowflake,
            color: 'text-teal-600 bg-teal-100'
        }
    ];

    return (
        <div className="bg-gray-100 min-h-screen pb-12 font-sans">

            
            <div className="bg-red-800 text-white pt-12 pb-24 text-center px-4">
                <div className="flex justify-center mb-3">
                    <div className="bg-white/20 p-3 rounded-full inline-block">
                        <AlertTriangle size={32} />
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">জরুরি সেবা</h1>
                <p className="text-red-100 font-medium">২৪/৭ জরুরি চিকিৎসা সহায়তা</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-16">
                
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3">
                        <Phone className="text-red-600" size={20} /> জরুরি হটলাইন নম্বর
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hotlines.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-lg text-white flex items-center justify-center shrink-0 ${item.color}`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                                <a
                                    href={`tel:${item.number}`}
                                    className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2 transition ${item.btnColor}`}
                                >
                                    <Phone size={14} /> {item.number}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Ambulance className="text-teal-600" size={24} /> অ্যাম্বুলেন্স সেবা
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {ambulanceServices.map((service, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-3 rounded-lg ${service.color}`}>
                                        <service.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                                        <p className="text-sm text-gray-500">{service.desc}</p>
                                    </div>
                                </div>

                                <div className="grow">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">সুবিধাসমূহ:</p>
                                    <ul className="space-y-1 mb-6">
                                        {service.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="text-sm text-gray-600 flex items-center gap-2">
                                                <span className="text-teal-500">✓</span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-t pt-4 mb-5 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500 font-medium">হটলাইন নম্বর:</span>
                                        <span className="text-base font-bold text-gray-800 flex items-center gap-1">
                                            <Phone size={14} className="text-teal-600" /> {service.phone}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500 font-medium">আনুমানিক খরচ:</span>
                                        <span className="text-lg font-bold text-teal-600">৳{service.price}</span>
                                    </div>
                                </div>

                                <a
                                    href={`tel:${service.phone}`}
                                    className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-bold text-base flex items-center justify-center gap-2 transition shadow-sm"
                                >
                                    <Phone size={18} /> কল করুন
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                
                
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <Info size={20} className="text-blue-600" /> জরুরি পরিস্থিতিতে করণীয়
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex gap-3 items-start">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">১</span>
                            <span className="text-gray-700 text-sm">শান্ত থাকুন এবং দ্রুত জরুরি নম্বরে কল করুন।</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">২</span>
                            <span className="text-gray-700 text-sm">রোগীর অবস্থা এবং সঠিক ঠিকানা জানান।</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">৩</span>
                            <span className="text-gray-700 text-sm">প্রয়োজনীয় কাগজপত্র এবং ওষুধ প্রস্তুত রাখুন।</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">৪</span>
                            <span className="text-gray-700 text-sm">অ্যাম্বুলেন্স আসা পর্যন্ত রোগীর পাশে থাকুন।</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default EmergencyService;