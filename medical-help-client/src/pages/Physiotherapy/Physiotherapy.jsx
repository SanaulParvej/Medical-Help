import React, { use, useState } from "react";
import {
    Calendar,
    Bone,
    Activity,
    Brain,
    PersonStanding,
    Stethoscope,
    Baby,
    CheckCircle2,
    PhoneCall,
    ClipboardList,
    UserCog,
    HeartPulse,
    ThumbsUp,
} from "lucide-react";
import banner from "/banner_1.jpg";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const Physiotherapy = () => {
    const { user } = use(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const [formData, setFormData] = useState({
        patientName: "",
        phone: "",
        address: "",
        startDate: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBookService = (e) => {
        e.preventDefault();

        if (
            !formData.patientName ||
            !formData.phone ||
            !formData.address ||
            !formData.startDate
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "অনুগ্রহ করে সবগুলো তথ্য পূরণ করুন!",
            });
            return;
        }

        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: `আপনি ${formData.patientName}-এর জন্য "${selectedPlan.title}" প্যাকেজটি বুক করতে চাচ্ছেন।`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0d9488',
            cancelButtonColor: '#d33',
            confirmButtonText: 'হ্যাঁ, বুক করুন!',
            cancelButtonText: 'বাতিল করুন'
        }).then((result) => {
            if (result.isConfirmed) {
                const bookingData = {
                    ...formData,
                    patientEmail: user?.email || 'Unknown Email',
                    planName: selectedPlan.title,
                    planPrice: selectedPlan.price,
                    status: 'pending'
                };

                console.log("Submitting Physiotherapy Booking:", bookingData);

                fetch('http://localhost:4000/physiotherapy-bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookingData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                icon: 'success',
                                title: 'বুকিং সফল হয়েছে!',
                                text: 'খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।',
                                confirmButtonColor: '#0d9488'
                            });

                            setFormData({ patientName: '', phone: '', address: '', startDate: '' });
                            setIsModalOpen(false);
                        }
                        else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'দুঃখিত!',
                                text: data.message || 'ইতিমধ্যে এই বুকিংটি করা হয়েছে।',
                                confirmButtonColor: '#0d9488'
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error submitting physiotherapy booking:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'সার্ভার এরর',
                            text: 'সার্ভারের সাথে কানেক্ট করা যাচ্ছে না। একটু পর আবার চেষ্টা করুন।',
                            confirmButtonColor: '#0d9488'
                        });
                    });
            }
        });
    };

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };
    const services = [
        {
            title: "অর্থোপেডিক ফিজিওথেরাপি",
            desc: "হাড়, জয়েন্ট ও পেশীর সমস্যার চিকিৎসা",
            icon: Bone,
            color: "text-purple-600 bg-purple-100",
        },
        {
            title: "স্পোর্টস ইনজুরি",
            desc: "খেলাধুলার আঘাত ও পুনর্বাসন চিকিৎসা",
            icon: Activity,
            color: "text-orange-600 bg-orange-100",
        },
        {
            title: "নিউরোলজিক্যাল থেরাপি",
            desc: "স্ট্রোক ও স্নায়ুতন্ত্রের সমস্যার চিকিৎসা",
            icon: Brain,
            color: "text-pink-600 bg-pink-100",
        },
        {
            title: "ব্যাক পেইন থেরাপি",
            desc: "পিঠ ও কোমর ব্যথার বিশেষায়িত চিকিৎসা",
            icon: PersonStanding,
            color: "text-red-600 bg-red-100",
        },
        {
            title: "পোস্ট-সার্জিক্যাল রিহ্যাব",
            desc: "অপারেশন পরবর্তী পুনর্বাসন থেরাপি",
            icon: Stethoscope,
            color: "text-teal-600 bg-teal-100",
        },
        {
            title: "পেডিয়াট্রিক থেরাপি",
            desc: "শিশুদের বিকাশমূলক সমস্যার চিকিৎসা",
            icon: Baby,
            color: "text-blue-600 bg-blue-100",
        },
    ];

    const conditions = [
        {
            title: "হাড়ের ব্যথা",
            color: "text-purple-600 bg-purple-50 border-purple-100",
        },
        { title: "কোমর ব্যথা", color: "text-red-600 bg-red-50 border-red-100" },
        {
            title: "হাঁটু ব্যথা",
            color: "text-orange-600 bg-orange-50 border-orange-100",
        },
        { title: "ঘাড় ব্যথা", color: "text-pink-600 bg-pink-50 border-pink-100" },
        { title: "স্ট্রোক", color: "text-teal-600 bg-teal-50 border-teal-100" },
        { title: "আর্থ্রাইটিস", color: "text-blue-600 bg-blue-50 border-blue-100" },
        {
            title: "স্পোর্টস ইনজুরি",
            color: "text-yellow-600 bg-yellow-50 border-yellow-100",
        },
        {
            title: "ফ্র্যাকচার",
            color: "text-indigo-600 bg-indigo-50 border-indigo-100",
        },
    ];

    const packages = [
        {
            title: "সিঙ্গেল সেশন",
            price: 400,
            duration: "/ সেশন",
            subtitle: "১টি সেশন",
            features: [
                "প্রাথমিক মূল্যায়ন",
                "৪৫ মিনিট থেরাপি",
                "ব্যায়াম পরামর্শ",
                "হোম এক্সারসাইজ গাইড",
            ],
            isPopular: false,
        },
        {
            title: "সাপ্তাহিক প্যাকেজ",
            price: 5000,
            duration: "/ সপ্তাহ",
            subtitle: "৭টি সেশন",
            features: [
                "বিস্তারিত মূল্যায়ন",
                "দৈনিক ১ ঘণ্টা থেরাপি",
                "ম্যানুয়াল থেরাপি",
                "ইলেকট্রোথেরাপি",
                "এক্সারসাইজ প্রোগ্রাম",
                "দৈনিক প্রোগ্রেস রিপোর্ট",
                "ফোন সাপোর্ট",
            ],
            isPopular: true,
        },
        {
            title: "মাসিক প্যাকেজ",
            price: 18000,
            duration: "/ মাস",
            subtitle: "৩০টি সেশন",
            features: [
                "সম্পূর্ণ মূল্যায়ন",
                "দৈনিক ১.৫ ঘণ্টা থেরাপি",
                "সকল ধরনের থেরাপি",
                "হোম ভিজিট সুবিধা",
                "কাস্টমাইজড প্রোগ্রাম",
                "সাপ্তাহিক রিভিউ",
                "২৪/৭ সাপোর্ট",
                "ফ্রি ফলো-আপ",
            ],
            isPopular: false,
        },
    ];

    const processSteps = [
        {
            id: "১",
            title: "প্রাথমিক মূল্যায়ন",
            icon: ClipboardList,
            color: "text-purple-600 bg-purple-100",
        },
        {
            id: "২",
            title: "চিকিৎসা পরিকল্পনা",
            icon: UserCog,
            color: "text-pink-600 bg-pink-100",
        },
        {
            id: "৩",
            title: "থেরাপি সেশন",
            icon: HeartPulse,
            color: "text-orange-600 bg-orange-100",
        },
        {
            id: "৪",
            title: "ফলো-আপ",
            icon: ThumbsUp,
            color: "text-teal-600 bg-teal-100",
        },
    ];

    return (
        <div className="font-sans bg-gray-50 pb-16">
            {/* Hero Section */}
            <div
                className="hero h-70"
                style={{
                    backgroundImage: `url(${banner})`,
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-4xl font-bold">ফিজিওথেরাপি সেবা</h1>
                        <p className="mb-5 text-md">
                            আধুনিক ফিজিওথেরাপি চিকিৎসা ও পুনর্বাসন
                        </p>
                        <button className="btn btn-success">
                            <Calendar size={20} /> অ্যাপয়েন্টমেন্ট নিন
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12 space-y-10">
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2">
                        আমাদের ফিজিওথেরাপি সেবা
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col transition hover:shadow-md"
                            >
                                <div
                                    className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${service.color}`}
                                >
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-500">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        যেসব সমস্যার চিকিৎসা করি
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {conditions.map((condition, idx) => (
                            <div
                                key={idx}
                                className={`bg-white rounded-lg shadow-sm border py-4 flex flex-col items-center justify-center transition hover:shadow-md ${condition.color}`}
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-white shadow-sm">
                                    <Activity size={20} className="currentColor" />
                                </div>
                                <span className="font-semibold text-sm text-gray-800">
                                    {condition.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            চিকিৎসা প্যাকেজ ও মূল্য
                        </h2>
                        <p className="text-sm text-gray-500">
                            সাশ্রয়ী মূল্যে মানসম্মত ফিজিওথেরাপি সেবা
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
                        {packages.map((pkg, idx) => (
                            <div
                                key={idx}
                                className={`bg-white rounded-2xl p-8 relative transition-transform hover:-translate-y-1 h-full ${pkg.isPopular ? "border-2 border-purple-500 shadow-xl scale-105 z-10" : "border border-gray-200 shadow-sm"}`}
                            >
                                {pkg.isPopular && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                                        সবচেয়ে জনপ্রিয়
                                    </div>
                                )}
                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                                        {pkg.title}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span
                                            className={`text-3xl font-bold ${pkg.isPopular ? "text-purple-600" : "text-gray-900"}`}
                                        >
                                            ৳{pkg.price}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {pkg.duration}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">{pkg.subtitle}</p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, fIdx) => (
                                        <li
                                            key={fIdx}
                                            className="flex items-start gap-2 text-sm text-gray-600"
                                        >
                                            <CheckCircle2
                                                size={16}
                                                className={`mt-0.5 shrink-0 ${pkg.isPopular ? "text-purple-500" : "text-teal-500"}`}
                                            />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handlePlanSelect(pkg)}
                                    className={`w-full py-3 rounded-lg font-bold text-sm transition ${pkg.isPopular ? "bg-teal-500 hover:bg-teal-600 text-white" : "bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200"}`}
                                >
                                    প্যাকেজ বুক করুন
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-opacity-800 flex justify-center items-center z-50 px-4">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
                            >
                                &times;
                            </button>

                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                সার্ভিস বুকিং
                            </h3>
                            <p className="text-teal-600 font-semibold mb-6">
                                প্যাকেজ: {selectedPlan?.title} (৳{selectedPlan?.price})
                            </p>

                            <form onSubmit={handleBookService} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        রোগীর নাম
                                    </label>
                                    <input
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                        placeholder="রোগীর নাম লিখুন"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        যোগাযোগের নম্বর
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                        placeholder="মোবাইল নম্বর লিখুন"
                                        required
                                    />
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ঠিকানা (যেখানে সেবা প্রয়োজন)
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="textarea textarea-bordered w-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                        placeholder="বাড়ির নাম্বার, রাস্তা, এলাকা"
                                        rows="2"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        কবে থেকে সেবা শুরু হবে?
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-full bg-teal-600 text-white hover:bg-teal-700 mt-4 border-none"
                                >
                                    বুকিং কনফার্ম করুন
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                <section className="mt-20">
                    <h2 className="text-xl font-bold text-gray-800 mb-8 pb-2 text-center">
                        চিকিৎসা প্রক্রিয়া
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {processSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center"
                            >
                                <div
                                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${step.color}`}
                                >
                                    <step.icon size={28} />
                                </div>
                                <div className="text-lg font-bold mb-2">{step.id}</div>
                                <h3 className="font-bold text-gray-800 text-sm md:text-base">
                                    {step.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-neutral rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        আপনার ব্যথা দূর করুন আজই
                    </h2>
                    <p className="text-purple-200 mb-8">
                        বিশেষজ্ঞ ফিজিওথেরাপিস্টের সাথে পরামর্শ করুন
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
                        <div className="relative w-full">
                            <PhoneCall
                                size={20}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="আপনার মোবাইল নম্বর"
                                className="w-full pl-12 pr-4 py-2 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-purple-300 bg-base-100"
                            />
                        </div>
                        <button className="btn flex items-center justify-center gap-2">
                            <Calendar size={18} /> অনলাইন বুকিং
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Physiotherapy;
