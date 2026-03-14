import React from 'react';

export default function CTAService() {
    const handleEmergencyCall = () => {
        window.location.href = 'tel:999';
    };

    return (
        <section className="py-14 bg-base-200 font-bangla">
            <div className="">
                <div className="hero bg-red-500 shadow-sm ">
                    <div className="hero-content text-center py-12 px-6">
                        <div className="space-y-4 ">
                            <h2 className="text-3xl lg:text-4xl font-bold text-base-100">জরুরি সহায়তা প্রয়োজন?</h2>
                            <p className="text-base-100 max-w-2xl mx-auto">জরুরি চিকিৎসা সহায়তার জন্য এখনই ৯৯৯ নম্বরে কল করুন</p>
                            <button onClick={handleEmergencyCall} className="btn btn-error text-white btn-lg mt-2 px-8 btn-wide max-w-xs w-full sm:w-auto">
                                এখনই ৯৯৯ এ কল করুন
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}