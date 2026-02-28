import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: 'What services do you provide?',
            answer: 'We provide comprehensive medical assistance including consultations, appointments, and health information.'
        },
        {
            question: 'How do I book an appointment?',
            answer: 'You can book an appointment through our website by selecting your preferred doctor and available time slots.'
        },
        {
            question: 'What is your response time?',
            answer: 'Our team typically responds within 24 hours for non-emergency inquiries.'
        },
        {
            question: 'Do you offer emergency services?',
            answer: 'Yes, we have emergency support available 24/7 for urgent medical concerns.'
        },
        {
            question: 'Is my health information secure?',
            answer: 'Yes, we use industry-standard encryption to protect all patient data and comply with HIPAA regulations.'
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-14 bg-base-200 font-bangla">
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
                <div className="card bg-base-100 border border-base-300 shadow-xl">
                    <div className="card-body p-6 lg:p-10">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
                            <p className="text-gray-500 mt-2">Find quick answers to common health support questions</p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`collapse collapse-arrow bg-base-200 border border-base-300 rounded-box ${activeIndex === index ? 'collapse-open' : 'collapse-close'}`}
                                >
                                    <button
                                        className="collapse-title text-left text-lg font-semibold text-gray-800"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <span>{faq.question}</span>
                                    </button>
                                    {activeIndex === index && (
                                        <div className="collapse-content text-gray-600">{faq.answer}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;