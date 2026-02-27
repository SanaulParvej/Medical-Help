import React from 'react';
import doctorLottie from '../../assets/lottie/doctors.json'
import Lottie from 'lottie-react';
import { IoIosPersonAdd } from "react-icons/io";
import { MdSlowMotionVideo } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { LuHospital } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";

const Hero = () => {
    return (
        <div className="hero bg-base-200 font-bangla overflow-hidden lg:py-14">
            <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl mx-auto w-full justify-between p-6 lg:p-12 gap-12">

                <div className="flex-1">
                    <Lottie
                        style={{ width: '550px' }}
                        animationData={doctorLottie}
                        loop={true}>
                    </Lottie>
                </div>
                <div className="flex-1 space-y-8 text-center lg:text-start">
                    <div className="space-y-4">
                        <h1 className="text-2xl lg:text-5xl font-extrabold text-[#1f2937] leading-[1.2]">
                            আপনার স্বাস্থ্যসেবা এখন আরও সহজ
                        </h1>
                        <p className="text-gray-500 text-lg lg:text-lg max-w-lg">
                            ২৪/৭ মেডিকেল সহায়তা, বিশেষজ্ঞ ডাক্তারের পরামর্শ এবং জরুরি সেবা
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <button className="btn btn-lg text-white btn-info">
                            <IoIosPersonAdd size={25} />
                            এখনই শুরু করুন
                        </button>
                        <button className="btn btn-outline btn-lg btn-info hover:text-white">
                            <MdSlowMotionVideo size={25} />
                            ভিডিও দেখুন
                        </button>
                    </div>
                    <div className="flex justify-center lg:justify-start gap-8 lg:gap-16 pt-6">
                        <div className="flex flex-col justify-center items-center text-center lg:text-left">
                            <IoIosPeople size={35} color='teal' />
                            <h3 className="text-2xl font-bold text-gray-800">১০,০০০+</h3>
                            <p className="text-gray-500 text-sm mt-1">সন্তুষ্ট রোগী</p>
                        </div>

                        <div className="flex flex-col items-center text-center lg:text-left">
                            <FaUserDoctor size={35} color='teal' />
                            <h3 className="text-2xl font-bold text-gray-800">৫০০+</h3>
                            <p className="text-gray-500 text-sm mt-1">বিশেষজ্ঞ ডাক্তার</p>
                        </div>

                        <div className="flex flex-col items-center text-center lg:text-left">
                            <LuHospital size={35} color='teal'></LuHospital>
                            <h3 className="text-2xl font-bold text-gray-800">২৫+</h3>
                            <p className="text-gray-500 text-sm mt-1">হাসপাতাল</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;