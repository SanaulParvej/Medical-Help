import React from 'react';

export default function CTAService() {
    const handleEmergencyCall = () => {
        window.location.href = 'tel:999';
    };

    return (
        <section className="py-14 bg-base-200 font-bangla">
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
                <div className="hero bg-error/10 rounded-2xl shadow-2xl border-2 border-error/40 ring-2 ring-error/20">
                    <div className="hero-content text-center py-12 px-6">
                        <div className="space-y-4">
                            <span className="badge badge-error badge-lg text-white px-4 py-3">২৪/৭ জরুরি সহায়তা</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-base-content">জরুরি সহায়তা প্রয়োজন?</h2>
                            <p className="text-base-content/80 max-w-2xl mx-auto">জরুরি চিকিৎসা সহায়তার জন্য এখনই ৯৯৯ নম্বরে কল করুন</p>
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