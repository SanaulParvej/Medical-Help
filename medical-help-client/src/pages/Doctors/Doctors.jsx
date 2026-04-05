import React from 'react';
import { useLoaderData } from 'react-router';
import DoctorCard from './DoctorCard';

const Doctors = () => {
    const doctors = useLoaderData();

    return (
        <section className="min-h-screen px-6 py-16">
            <div className="max-w-7xl mx-auto">

                
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="text-indigo-600 font-semibold text-sm px-4 py-2 bg-indigo-50 rounded-full border border-indigo-200">
                            🩺 Our Medical Team
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">
                        Expert Doctors & Specialists
                    </h2>
                    <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Meet our experienced team of medical professionals dedicated to providing you with the best healthcare solutions and personalized treatment plans.
                    </p>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-8">
                    {doctors && doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-lg text-gray-500">No doctors available at the moment.</p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default Doctors;