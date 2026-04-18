import React, { use, useState } from "react";
import banner from "/banner_1.jpg";
import {
  FaTools,
  FaHospital,
  FaRocket,
  FaStar,
  FaHeartbeat,
  FaPills,
  FaUserMd,
  FaPhone,
  FaUserNurse,
  FaShieldAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import ServiceCTA from "../../Component/ServiceCTA/ServiceCTA";
import ServiceBookingModal from "../../Component/ServiceBookingModal/ServiceBookingModal";

const NursingCare = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const services = [
    {
      icon: FaUserNurse,
      title: "দক্ষ নার্সদের সেবা",
      description: "অভিজ্ঞ এবং প্রশিক্ষিত নার্স দ্বারা সেবা",
    },
    {
      icon: FaShieldAlt,
      title: "নিরাপদ চিকিৎসা সেবা",
      description: "সর্বোচ্চ মানের চিকিৎসা পরিষেবা নিশ্চিত",
    },
    {
      icon: FaTools,
      title: "স্বাস্থ্যসেবা পণ্য",
      description: "আধুনিক যন্ত্রপাতি এবং সরঞ্জাম",
    },
    {
      icon: FaHospital,
      title: "ঘরে বসে পরিচর্যা",
      description: "আপনার ঘরেই পেশাদার চিকিৎসা সেবা",
    },
    {
      icon: FaRocket,
      title: "দ্রুত সেবা প্রদান",
      description: "জরুরি পরিস্থিতিতে তাৎক্ষণিক সেবা",
    },
    {
      icon: FaStar,
      title: "চব্বিশ ঘণ্টা সেবা",
      description: "সপ্তাহের সাতদিন চব্বিশ ঘণ্টা উপলব্ধ",
    },
  ];

  const pricingPlans = [
    {
      name: "বেসিক সেবা",
      price: 4000,
      period: "প্রতি সপ্তাহ",
      features: [
        "দৈনিক এক ঘণ্টা",
        "রক্তচাপ মাপা",
        "তাপমাত্রা পরিমাপন",
        "ওষুধ খাওয়ানো",
        "ব্যক্তিগত যত্ন",
      ],
      highlight: false,
    },
    {
      name: "স্ট্যান্ডার্ড সেবা",
      price: 15000,
      period: "প্রতি মাস",
      features: [
        "দৈনিক দুই ঘণ্টা",
        "সম্পূর্ণ শারীরিক পরিচর্যা",
        "প্রাথমিক চিকিৎসা",
        "ক্ষত পরিচর্যা",
        "খাবার তৈরিতে সহায়তা",
        "ঘর পরিষ্কার করা",
      ],
      highlight: true,
    },
    {
      name: "প্রিমিয়াম সেবা",
      price: 25000,
      period: "প্রতি মাস",
      features: [
        "দৈনিক তিন ঘণ্টা",
        "সম্পূর্ণ চিকিৎসা পরিচর্যা",
        "বিশেষ রোগীর পরিচর্যা",
        "ফিজিওথেরাপি সহায়তা",
        "চব্বিশ ঘণ্টা যোগাযোগ",
        "জরুরি সহায়তা সেবা",
      ],
      highlight: false,
    },
  ];

  const benefits = [
    {
      icon: FaHeartbeat,
      title: "স্বাস্থ্য পরীক্ষা",
      description: "নিয়মিত স্বাস্থ্য পরীক্ষা এবং পর্যবেক্ষণ",
    },
    {
      icon: FaPills,
      title: "ওষুধ সেবা",
      description: "সঠিক সময়ে ওষুধ প্রয়োগ নিশ্চিতকরণ",
    },
    {
      icon: FaUserMd,
      title: "বিশেষজ্ঞ পরামর্শ",
      description: "প্রয়োজন অনুযায়ী বিশেষজ্ঞ ডাক্তারের পরামর্শ",
    },
    {
      icon: FaPhone,
      title: "সবসময় যোগাযোগ",
      description: "যেকোনো সমস্যায় সর্বদা যোগাযোগযোগ্য",
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-base-300 pb-12">
      <div
        className="hero h-70"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold">নার্সিং কেয়ার সেবা</h1>
            <p className="mb-5 text-md">পেশাদার নার্সিং সেবা আপনার দোরগোড়ায়</p>
            <button className="btn btn-success">আরও জানুন</button>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">আমাদের সেবাসমূহ</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4"
              >
                <div className="p-3 rounded-md text-teal-600 bg-teal-100 text-xl shrink-0">
                  <service.icon />
                </div>
                <div>
                  <h3 className="text-gray-800 font-bold mb-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-base-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">মূল্য তালিকা</h2>
          <p className="text-center text-gray-600 mb-12">
            আমাদের বিভিন্ন প্যাকেজ থেকে আপনার পছন্দের সেবা বেছে নিন
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-lg border ${plan.highlight ? "border-teal-500 shadow-xl md:-mt-4 md:mb-4" : "border-gray-200 shadow-sm"} p-8 text-center flex flex-col h-full`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    জনপ্রিয়
                  </span>
                )}
                <h3 className="font-bold text-gray-800 text-lg mb-2">
                  {plan.name}
                </h3>
                <div className="mb-5">
                  <span className="text-3xl font-bold text-teal-600">
                    ৳{plan.price}
                  </span>
                  <p className="text-gray-600 text-sm">{plan.period}</p>
                </div>

                <ul className="text-left space-y-3 mb-8 grow">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-teal-500 mt-0.5">✓</span> {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-2.5 rounded text-sm font-bold transition ${plan.highlight ? "bg-teal-500 text-white hover:bg-teal-600" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                >
                  নির্বাচন করুন
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-base-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">কেন আমাদের বেছে নেবেন</h2>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-6 items-start bg-base-100 py-4 pl-4 rounded-xl shadow-md"
              >
                <div className="text-4xl shrink-0 text-teal-600">
                  <benefit.icon />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ServiceCTA></ServiceCTA>

      <ServiceBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
        apiEndpoint="nursing-bookings"
      />
    </div>
  );
};

export default NursingCare;
