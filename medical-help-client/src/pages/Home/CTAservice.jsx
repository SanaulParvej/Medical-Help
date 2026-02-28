import React from 'react';

export default function CTAService() {
    const handleEmergencyCall = () => {
        window.location.href = 'tel:999';
    };

    return (
        <section className="py-14 bg-base-200 font-bangla">
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
                <div className="hero bg-base-100 rounded-2xl shadow-xl border border-base-200">
                    <div className="hero-content text-center py-12 px-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">জরুরি সহায়তা প্রয়োজন?</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">জরুরি চিকিৎসা সহায়তার জন্য এখনই ৯৯৯ নম্বরে কল করুন</p>
                            <button onClick={handleEmergencyCall} className="btn btn-error text-white btn-lg mt-2">
                                এখনই ৯৯৯ এ কল করুন
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}