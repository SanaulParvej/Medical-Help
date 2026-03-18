 import React, { use, useState } from 'react';
import banner from '/banner_1.jpg';
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
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const NursingCare = () => {

  const { user } = use(AuthContext);

  // Modal এবং ফর্মের জন্য স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    address: '',
    startDate: ''
  });

  const services = [
    {
      icon: FaUserNurse,
      title: 'দক্ষ নার্সদের সেবা',
      description: 'অভিজ্ঞ এবং প্রশিক্ষিত নার্স দ্বারা সেবা',
    },
    {
      icon: FaShieldAlt,
      title: 'নিরাপদ চিকিৎসা সেবা',
      description: 'সর্বোচ্চ মানের চিকিৎসা পরিষেবা নিশ্চিত',
    },
    {
      icon: FaTools,
      title: 'স্বাস্থ্যসেবা পণ্য',
      description: 'আধুনিক যন্ত্রপাতি এবং সরঞ্জাম',
    },
    {
      icon: FaHospital,
      title: 'ঘরে বসে পরিচর্যা',
      description: 'আপনার ঘরেই পেশাদার চিকিৎসা সেবা',
    },
    {
      icon: FaRocket,
      title: 'দ্রুত সেবা প্রদান',
      description: 'জরুরি পরিস্থিতিতে তাৎক্ষণিক সেবা',
    },
    {
      icon: FaStar,
      title: 'চব্বিশ ঘণ্টা সেবা',
      description: 'সপ্তাহের সাতদিন চব্বিশ ঘণ্টা উপলব্ধ',
    },
  ];

  const pricingPlans = [
    {
      name: 'বেসিক সেবা',
      price: '৳৪,০০০', // চাইলে 4,000 ও রাখতে পারেন
      period: 'প্রতি সপ্তাহ',
      features: [
        'দৈনিক এক ঘণ্টা',
        'রক্তচাপ মাপা',
        'তাপমাত্রা পরিমাপন',
        'ওষুধ খাওয়ানো',
        'ব্যক্তিগত যত্ন',
      ],
      highlight: false,
    },
    {
      name: 'স্ট্যান্ডার্ড সেবা',
      price: '৳১৫,০০০',
      period: 'প্রতি মাস',
      features: [
        'দৈনিক দুই ঘণ্টা',
        'সম্পূর্ণ শারীরিক পরিচর্যা',
        'প্রাথমিক চিকিৎসা',
        'ক্ষত পরিচর্যা',
        'খাবার তৈরিতে সহায়তা',
        'ঘর পরিষ্কার করা',
      ],
      highlight: true,
    },
    {
      name: 'প্রিমিয়াম সেবা',
      price: '৳২৫,০০০',
      period: 'প্রতি মাস',
      features: [
        'দৈনিক তিন ঘণ্টা',
        'সম্পূর্ণ চিকিৎসা পরিচর্যা',
        'বিশেষ রোগীর পরিচর্যা',
        'ফিজিওথেরাপি সহায়তা',
        'চব্বিশ ঘণ্টা যোগাযোগ',
        'জরুরি সহায়তা সেবা',
      ],
      highlight: false,
    },
  ];

  const benefits = [
    {
      icon: FaHeartbeat,
      title: 'স্বাস্থ্য পরীক্ষা',
      description: 'নিয়মিত স্বাস্থ্য পরীক্ষা এবং পর্যবেক্ষণ',
    },
    {
      icon: FaPills,
      title: 'ওষুধ সেবা',
      description: 'সঠিক সময়ে ওষুধ প্রয়োগ নিশ্চিতকরণ',
    },
    {
      icon: FaUserMd,
      title: 'বিশেষজ্ঞ পরামর্শ',
      description: 'প্রয়োজন অনুযায়ী বিশেষজ্ঞ ডাক্তারের পরামর্শ',
    },
    {
      icon: FaPhone,
      title: 'সবসময় যোগাযোগ',
      description: 'যেকোনো সমস্যায় সর্বদা যোগাযোগযোগ্য',
    },
  ];


  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookService = (e) => {
    e.preventDefault();

    if (!formData.patientName || !formData.phone || !formData.address || !formData.startDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'অনুগ্রহ করে সবগুলো তথ্য পূরণ করুন!'
      });
      return;
    }
	

    Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: `আপনি ${formData.patientName}-এর জন্য "${selectedPlan.name}" প্যাকেজটি বুক করতে চাচ্ছেন।`,
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
          planName: selectedPlan.name,
          planPrice: selectedPlan.price,
          status: 'pending'
        };

        console.log("Submitting Nursing Booking:", bookingData);

        fetch('http://localhost:4000/nursing-bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        })
          .then(res => res.json())
          .then(data => {
            // যদি ডাটাবেসে সফলভাবে সেভ হয় (insertedId থাকে)
            if (data.insertedId) {
              Swal.fire({
                icon: 'success',
                title: 'বুকিং সফল হয়েছে!',
                text: 'খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।',
                confirmButtonColor: '#0d9488'
              });

              // ফর্ম রিসেট এবং মোডাল ক্লোজ
              setFormData({ patientName: '', phone: '', address: '', startDate: '' });
              setIsModalOpen(false);
            }
            // যদি ডাবল বুকিং থাকে (insertedId না আসে এবং ব্যাকএন্ড থেকে মেসেজ আসে)
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
            console.error("Error submitting nursing booking:", error);
            // সার্ভার বা নেটওয়ার্ক এরর হলে
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

  return (
    <div className='bg-base-300 pb-12'>
      {/* Hero Banner */}
      <div
        className='hero h-70'
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content text-neutral-content text-center'>
          <div className='max-w-md'>
            <h1 className='mb-5 text-4xl font-bold'>নার্সিং কেয়ার সেবা</h1>
            <p className='mb-5 text-md'>পেশাদার নার্সিং সেবা আপনার দোরগোড়ায়</p>
            <button className='btn btn-success'>আরও জানুন</button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className='py-12'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-2xl font-bold mb-3'>আমােদর সবাসমূহ</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {services.map((service, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-b border-t border-teal-500'
              >
                <div className='text-4xl mb-4 text-teal-600'>
                  <service.icon />
                </div>

                <h3 className='text-lg font-bold mb-2'>{service.title}</h3>
                <p className='text-gray-600 text-sm'>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
	  

      {/* Pricing Section */}
      <div className='bg-base-200 py-12'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-3'>মূল্য তালিকা</h2>
          <p className='text-center text-gray-600 mb-12'>আমাদের বিভিন্ন প্যাকেজ থেকে আপনার পছন্দের সেবা বেছে নিন</p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`rounded-lg p-8 hover:scale-105 transition ${plan.highlight ? 'bg-teal-50 border-2 border-teal-500 shadow-lg transform md:scale-105 ' : 'bg-white border border-gray-200 shadow hover:bg-teal-50 hover:border-2 hover:border-teal-500'}`}>
                <h3 className='text-xl font-bold mb-3'>{plan.name}</h3>
                <div className='mb-6'>
                  <span className='text-3xl font-bold text-teal-600'>{plan.price}</span>
                  <p className='text-gray-600 text-sm'>{plan.period}</p>
                </div>

                <ul className='space-y-3 mb-8'>
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className='flex items-start'>
                      <span className='text-teal-500 font-bold mr-2'>✓</span>
                      <span className='text-gray-700'>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* বাটন ক্লিক ইভেন্ট অ্যাড করা হয়েছে */}
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-3 rounded-lg font-bold transition ${plan.highlight ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  নির্বাচন করুন
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section & CTA Section - আগের মতোই থাকবে */}

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-800 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">সার্ভিস বুকিং</h3>
            <p className="text-teal-600 font-semibold mb-6">
              প্যাকেজ: {selectedPlan?.name} ({selectedPlan?.price})
            </p>

            <form onSubmit={handleBookService} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">রোগীর নাম</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">যোগাযোগের নম্বর</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">ঠিকানা (যেখানে সেবা প্রয়োজন)</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">কবে থেকে সেবা শুরু হবে?</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="input input-bordered w-full focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>

              <button type="submit" className="btn w-full bg-teal-600 text-white hover:bg-teal-700 mt-4 border-none">
                বুকিং কনফার্ম করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <div className='bg-base-200 py-12'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-2xl font-bold mb-3'>কেন আমাদের বেছে নেবেন</h2>          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className='flex gap-6 items-start bg-base-100 py-4 pl-4 rounded-xl shadow-md hover:scale-[1.01] transition-all'
              >
                <div className='text-4xl shrink-0 text-teal-600'>
                  <benefit.icon />
                </div>
                <div>
                  <h3 className='text-lg font-bold mb-2'>{benefit.title}</h3>
                  <p className='text-gray-600'>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-teal-600 text-white py-12 max-w-6xl mx-auto rounded-2xl '>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-3'>আজই আমাদের সেবা নিন</h2><p className='text-md mb-8'>আজই যোগাযোগ করুন এবং সেরা চিকিৎসা সেবার অভিজ্ঞতা নিন</p>
          <div className='flex flex-col items-center md:flex-row gap-4 justify-center'>
            <input
              type='email'
              placeholder='আপনার ইমেইল লিখুন'
              className='flex-1 bg-base-100 max-w-xs px-4 py-3 rounded-lg text-gray-800'
            />
            <button className='btn btn-neutral rounded-lg font-bold hover:btn-success transition'>নিবন্ধন করুন</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NursingCare;
