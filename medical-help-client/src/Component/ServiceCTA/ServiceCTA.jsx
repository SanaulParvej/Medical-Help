import React from 'react';

const ServiceCTA = () => {
    return (
      <div className='bg-teal-600 text-white py-12 max-w-6xl mx-auto rounded-2xl '>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-3'>আজই আমাদের সেবা নিন</h2><p className='text-md mb-8'>আজই যোগাযোগ করুন এবং সেরা সেবার অভিজ্ঞতা নিন</p>
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
    );
};

export default ServiceCTA;