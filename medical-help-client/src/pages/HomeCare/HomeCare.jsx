import React, { use, useState } from 'react';
import Swal from 'sweetalert2';
import banner from '/banner_1.jpg';
import {
    FaUserEdit,
    FaBed,
    FaHandsHelping,
    FaPills,
    FaWalking,
    FaUserFriends,
    FaUserNurse,
    FaClock,
    FaHeart,
    FaStethoscope,
    FaUsers,
    FaAmbulance,
    FaBlind,
    FaWheelchair,
    FaHospital,
} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const HomeCare = () => {
    // Modal এবং ফর্মের জন্য স্টেট
    const {user} = use(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [formData, setFormData] = useState({
        patientName: '',
        patientEmail: '', // যিনি বুক করছেন তার ইমেইল
        phone: '',
        address: '',
        startDate: ''
    });

    // ৬টি হোম কেয়ার সার্ভিস
    const services = [
        { icon: FaUserEdit, title: 'বয়স্ক যত্ন', description: 'বয়োবৃদ্ধদের দৈনন্দিন ও স্বাস্থ্যসেবা', color: 'text-pink-500 bg-pink-100' },
        { icon: FaBed, title: 'রোগী পরিচর্যা', description: 'অসুস্থ রোগীদের সম্পূর্ণ পরিচর্যা সেবা', color: 'text-red-500 bg-red-100' },
        { icon: FaHandsHelping, title: 'ব্যক্তিগত যত্ন', description: 'গোসল, খাওয়া ও দৈনন্দিন কাজে সহায়তা', color: 'text-teal-600 bg-teal-100' },
        { icon: FaPills, title: 'ওষুধ ব্যবস্থাপনা', description: 'সময়মতো ওষুধ প্রদান ও পর্যবেক্ষণ', color: 'text-blue-500 bg-blue-100' },
        { icon: FaWalking, title: 'দৈনন্দিন সহায়তা', description: 'যাতায়াত ও দৈনন্দিন কার্যকলাপে সাহায্য', color: 'text-indigo-500 bg-indigo-100' },
        { icon: FaUserFriends, title: 'সঙ্গী সেবা', description: 'মানসিক সাপোর্ট ও সামাজিক সহায়তা', color: 'text-cyan-500 bg-cyan-100' },
    ];

    // ৩টি প্যাকেজ (ফুল-টাইম হাইলাইট করা)
    const pricingPlans = [
        {
            name: 'পার্ট-টাইম কেয়ার',
            price: '৳12,000',
            period: 'মাস',
            hours: 'দৈনিক ৪-৬ ঘণ্টা',
            features: ['দৈনিক ৪-৬ ঘণ্টা সেবা', 'প্রাথমিক যত্ন', 'ওষুধ প্রদান', 'খাবার সহায়তা', 'প্রাথমিক রিপোর্টিং'],
            highlight: false,
        },
        {
            name: 'ফুল-টাইম কেয়ার',
            badge: 'জনপ্রিয়',
            price: '৳22,000',
            period: 'মাস',
            hours: 'দৈনিক ৮-১০ ঘণ্টা',
            features: ['দৈনিক ৮-১০ ঘণ্টা সেবা', 'সম্পূর্ণ শারীরিক যত্ন', 'ওষুধ ব্যবস্থাপনা', 'খাবার প্রস্তুতি ও প্রদান', 'রোগীর পরিচর্যা', 'হালকা ব্যায়াম', 'দৈনিক রিপোর্টিং', 'ফোন সাপোর্ট'],
            highlight: true,
        },
        {
            name: 'লাইভ-ইন কেয়ার',
            price: '৳35,000',
            period: 'মাস',
            hours: '২৪ ঘণ্টা',
            features: ['২৪ ঘণ্টা সেবা', 'সম্পূর্ণ রোগীর পরিচর্যা', 'সবসময় ওষুধ প্রদান', 'খাবার প্রস্তুতি ও পর্যবেক্ষণ', 'জরুরি সহায়তা', 'পরিবারের সাথে সমন্বয়', 'দৈনিক বিস্তারিত রিপোর্ট', 'ডাক্তার পরামর্শ সুবিধা'],
            highlight: false,
        },
    ];


    const benefits = [
        { icon: FaUserNurse, title: 'প্রশিক্ষিত কেয়ারগিভার', description: 'দক্ষ ও মানসিকভাবে প্রশিক্ষিত প্রাপ্ত', color: 'text-pink-500' },
        { icon: FaClock, title: 'নমনীয় সময়সূচী', description: 'আপনার সুবিধামতো সময় নির্ধারণ করুন', color: 'text-teal-500' },
        { icon: FaHeart, title: 'সহানুভূতিশীল', description: 'সম্মানের সাথে যত্নশীল সেবা', color: 'text-green-500' },
        { icon: FaStethoscope, title: 'নিয়মিত মনিটরিং', description: 'রোগীর অবস্থার নিয়মিত পর্যবেক্ষণ', color: 'text-orange-500' },
        { icon: FaUsers, title: 'পরিবারের সমন্বয়', description: 'পরিবারের সাথে নিয়মিত যোগাযোগ', color: 'text-blue-500' },
        { icon: FaAmbulance, title: 'জরুরি সহায়তা', description: 'যেকোনো সময় জরুরি সহায়তা', color: 'text-red-500' },
    ];

    const targetAudience = [
        { icon: FaBlind, title: 'বয়স্ক ব্যক্তি' },
        { icon: FaBed, title: 'অসুস্থ রোগী' },
        { icon: FaWheelchair, title: 'প্রতিবন্ধী ব্যক্তি' },
        { icon: FaUserFriends, title: 'একাকী বৃদ্ধ' },
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
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'অনুগ্রহ করে সবগুলো তথ্য পূরণ করুন!' });
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

                // API Call (আগের মতোই)
                fetch('http://localhost:4000/homecare-bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({ icon: 'success', title: 'বুকিং সফল হয়েছে!', text: 'খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।', confirmButtonColor: '#0d9488' });
                            setFormData({ patientName: '', patientEmail: '', phone: '', address: '', startDate: '' });
                            setIsModalOpen(false);
                        } else {
                            Swal.fire({ icon: 'warning', title: 'দুঃখিত!', text: data.message || 'ইতিমধ্যে এই বুকিংটি করা হয়েছে।', confirmButtonColor: '#0d9488' });
                        }
                    })
                    .catch(error => console.error(error));
            }
        });
    };

    return (
        <div className='bg-gray-50 pb-12 font-sans'>
            {/* Hero Section */}
            <div
                className='hero h-70'
                style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className='hero-overlay bg-opacity-60'></div>
                <div className='hero-content text-neutral-content text-center'>
                    <div className='max-w-md'>
                        <h1 className='mb-5 text-4xl font-bold'>হোম কেয়ার সেবা</h1>
                        <p className='text-md md:text-lg mb-6'>ঘরে বসে পান সম্পূর্ণ স্বাস্থ্যসেবা</p>
                        <button className='btn btn-success'>
                            <FaHospital /> সেবা শুরু করুন
                        </button>
                    </div>
                </div>
            </div>
            

            <div className='max-w-6xl mx-auto px-4 py-12'>
                {/* Services Section */}
                <div className='mb-16'>
                    <h2 className='text-2xl font-bold text-center mb-8'>আমাদের হোম কেয়ার সেবা</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {services.map((service, idx) => (
                            <div key={idx} className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-start gap-4 hover:shadow-md transition'>
                                <div className={`p-3 rounded-md ${service.color} text-xl shrink-0`}>
                                    <service.icon />
                                </div>
                                <div>
                                    <h3 className='font-bold text-gray-800 mb-1'>{service.title}</h3>
                                    <p className='text-sm text-gray-500'>{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing Section */}
                <div className='mb-16'>
                    <h2 className='text-2xl font-bold text-center mb-2'>সেবা প্যাকেজ ও মূল্য</h2>
                    <p className='text-center text-gray-500 mb-8 text-sm'>আপনার পরিবারের জন্য সঠিক প্যাকেজ বেছে নিন</p>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
                        {pricingPlans.map((plan, idx) => (
                            <div key={idx} className={`relative bg-white rounded-lg border ${plan.highlight ? 'border-teal-500 shadow-xl md:-mt-4 md:mb-4' : 'border-gray-200 shadow-sm'} p-8 text-center flex flex-col h-full`}>
                                {plan.highlight && (
                                    <span className='absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
                                        {plan.badge}
                                    </span>
                                )}
                                <h3 className='font-bold text-gray-800 text-lg mb-2'>{plan.name}</h3>
                                <div className='mb-2'>
                                    <span className='text-3xl font-bold text-pink-600'>{plan.price}</span>
                                    <span className='text-gray-500 text-sm'> /{plan.period}</span>
                                </div>
                                <p className='text-xs text-gray-400 mb-6'>{plan.hours}</p>

                                <ul className='text-left space-y-3 mb-8 grow'>
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className='flex items-start gap-2 text-sm text-gray-600'>
                                            <span className='text-teal-500 mt-0.5'>✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button onClick={() => handlePlanSelect(plan)} className={`w-full py-2.5 rounded text-sm font-bold transition ${plan.highlight ? 'bg-teal-500 text-white hover:bg-teal-600' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                                    প্যাকেজ নির্বাচন করুন
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                

                {/* Why Choose Us */}
                <div className='mb-16'>
                    <h2 className='text-2xl font-bold text-center mb-8'>কেন আমাদের হোম কেয়ার সেবা</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className='bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4'>
                                <div className={`${benefit.color} text-2xl`}>
                                    <benefit.icon />
                                </div>
                                <div>
                                    <h4 className='font-bold text-gray-800 text-sm'>{benefit.title}</h4>
                                    <p className='text-xs text-gray-500'>{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Who is this for */}
                <div className='mb-16'>
                    <h2 className='text-2xl font-bold text-center mb-8'>কাদের জন্য এই সেবা</h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {targetAudience.map((item, idx) => (
                            <div key={idx} className='bg-white py-6 border border-gray-200 rounded-lg flex flex-col items-center justify-center text-center gap-3'>
                                <div className='w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 text-pink-500 text-xl'>
                                    <item.icon />
                                </div>
                                <span className='text-sm font-semibold text-gray-700'>{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pink CTA Footer */}
                <div className='bg-pink-500 text-white rounded-lg p-8 md:p-12 text-center'>
                    <h2 className='text-2xl md:text-3xl font-bold mb-2'>আপনার প্রিয়জনের যত্ন নিন</h2>
                    <p className='text-sm md:text-base mb-6 opacity-90'>আজই আমাদের হোম কেয়ার সেবা গ্রহণ করুন</p>
                    <div className='max-w-md mx-auto flex gap-2'>
                        <input type="text" placeholder="ইমেইল বা ফোন নম্বর" className="input w-full text-gray-800 focus:outline-none" />
                        <button className='bg-white text-pink-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap'>
                            যোগাযোগ করুন
                        </button>
                    </div>
                </div>
            </div>
            

            {/* Booking Modal (আগের মতোই) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-2xl">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl">&times;</button>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">সার্ভিস বুকিং</h3>
                        <p className="text-teal-600 font-semibold mb-6 text-sm">
                            প্যাকেজ: {selectedPlan?.name} ({selectedPlan?.price}/{selectedPlan?.period})
                        </p>
                        <form onSubmit={handleBookService} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">রোগীর নাম</label>
                                <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} className="input input-bordered w-full" placeholder="রোগীর নাম লিখুন" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">যোগাযোগের নম্বর</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input input-bordered w-full" placeholder="মোবাইল নম্বর" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ঠিকানা</label>
                                <textarea name="address" value={formData.address} onChange={handleInputChange} className="textarea textarea-bordered w-full" placeholder="বিস্তারিত ঠিকানা" rows="2" required></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">কবে থেকে সেবা শুরু হবে?</label>
                                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="input input-bordered w-full" required />
                            </div>
                            <button type="submit" className="btn bg-teal-500 hover:bg-teal-600 w-full text-white font-bold mt-4 border-none">বুকিং কনফার্ম করুন</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeCare;
