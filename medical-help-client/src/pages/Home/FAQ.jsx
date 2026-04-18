import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "আপনারা কি সেবা প্রদান করেন?",
      answer:
        "আমরা পরামর্শ, অ্যাপয়েন্টমেন্ট এবং স্বাস্থ্য তথ্য সহ সম্পূর্ণ চিকিৎসা সহায়তা প্রদান করি।",
    },
    {
      question: "আমি কীভাবে অ্যাপয়েন্টমেন্ট বুক করতে পারি?",
      answer:
        "আপনি আমাদের ওয়েবসাইটের মাধ্যমে আপনার পছন্দের ডাক্তার এবং উপলব্ধ সময় নির্বাচন করে সহজেই অ্যাপয়েন্টমেন্ট বুক করতে পারবেন।",
    },
    {
      question: "আপনাদের সাড়া দেওয়ার সময় কত?",
      answer: "আমরা সাধারণত জরুরি ছাড়াই ২৪ ঘন্টার মধ্যে সাড়া দিয়ে থাকি।",
    },
    {
      question: "আপনারা জরুরি সেবা প্রদান করেন?",
      answer: "হ্যাঁ, আমরা ২৪/৭ জরুরি চিকিৎসা সহায়তা প্রদান করি।",
    },
    {
      question: "আমার স্বাস্থ্য তথ্য কি সুরক্ষিত থাকবে?",
      answer:
        "হ্যাঁ, আমরা সর্বোচ্চ মানের এনক্রিপশন ব্যবহার করে আপনার সমস্ত স্বাস্থ্য তথ্য সুরক্ষিত রাখি।",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-14 bg-base-100 font-bangla">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            সাধারণ প্রশ্ন এবং উত্তর
          </h2>
          <p className="text-gray-500 mt-2">
            আমাদের স্বাস্থ্য সেবা সম্পর্কে আপনার প্রশ্নের উত্তর খুঁজুন
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`collapse collapse-arrow bg-base-200 border border-base-300 rounded-box ${activeIndex === index ? "collapse-open" : "collapse-close"}`}
            >
              <button
                className="collapse-title text-left text-lg font-semibold text-gray-800"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
              </button>
              {activeIndex === index && (
                <div className="collapse-content text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
