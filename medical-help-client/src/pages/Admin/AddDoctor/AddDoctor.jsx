import React, { useState } from 'react';
import { Save, UserPlus } from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const AddDoctor = () => {
    const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const initialState = {
        name: '',
        image: '',
        education: '',
        speciality: '',
        experience_years: '',
        registration_number: '',
        working_place: '',
        chamber_time: '',
        consultation_fee: '',
        rating: '',
        patients_treated: '',
        about: '',
        availability: []
    };

    const [formData, setFormData] = useState(initialState);

    const handleCheckboxChange = (day) => {
        setFormData((prev) => {
            const isSelected = prev.availability.includes(day);
            return {
                ...prev,
                availability: isSelected
                    ? prev.availability.filter((d) => d !== day) // Remove if already selected
                    : [...prev.availability, day] // Add if not selected
            };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'experience_years' || name === 'consultation_fee' || name === 'rating' || name === 'patients_treated'
                ? Number(value)
                : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://medical-help-server.vercel.app/doctors', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.insertedId) {
                Swal.fire({
                    title: 'সফল!',
                    text: 'নতুন ডাক্তারের প্রোফাইল সফলভাবে তৈরি হয়েছে।',
                    icon: 'success',
                    confirmButtonText: 'ওকে',
                    confirmButtonColor: '#3085d6'
                });

                setFormData(initialState);

            } else {
                Swal.fire({
                    title: 'সতর্কতা!',
                    text: data.message || 'এই ডাক্তার আগে থেকেই ডেটাবেসে আছেন।',
                    icon: 'warning',
                    confirmButtonText: 'ঠিক আছে',
                    confirmButtonColor: '#f39c12'
                });
            }

        } catch (error) {
            console.error("Error submitting form:", error);
            Swal.fire({
                title: 'দুঃখিত!',
                text: 'সার্ভারে কোনো সমস্যা হয়েছে। একটু পর আবার চেষ্টা করুন।',
                icon: 'error',
                confirmButtonText: 'বন্ধ করুন',
                confirmButtonColor: '#d33'
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <UserPlus className="text-blue-600" size={28} />
                    Add New Doctor
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Enter the professional and clinic details to register a new doctor in the system.
                </p>
            </div>

            
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Dr. Ayesha Rahman"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                        <input
                            type="url"
                            name="image"
                            placeholder="https://i.ibb.co.com/..."
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                        <input
                            type="text"
                            name="speciality"
                            required
                            placeholder="Orthopedic Surgeon"
                            value={formData.speciality}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Education & Degrees</label>
                        <input
                            type="text"
                            name="education"
                            required
                            placeholder="MBBS, MS (Orthopedics) - BSMMU"
                            value={formData.education}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                        <input
                            type="number"
                            name="experience_years"
                            required
                            placeholder="12"
                            min="0"
                            value={formData.experience_years}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">BMDC Registration Number</label>
                        <input
                            type="text"
                            name="registration_number"
                            required
                            placeholder="REG20250002"
                            value={formData.registration_number}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Working Place</label>
                        <input
                            type="text"
                            name="working_place"
                            required
                            placeholder="Ibn Sina Hospital, Dhanmondi"
                            value={formData.working_place}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (BDT)</label>
                        <input
                            type="number"
                            name="consultation_fee"
                            required
                            placeholder="1200"
                            min="0"
                            value={formData.consultation_fee}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none "
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chamber Time</label>
                        <input
                            type="text"
                            name="chamber_time"
                            required
                            placeholder="4PM - 8PM"
                            value={formData.chamber_time}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <input
                            type="number"
                            name="rating"
                            required
                            placeholder="4.0"
                            min="0"
                            max="5"
                            step="0.1"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none "
                        />
                    </div>

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Treated Patient</label>
                        <input
                            type="number"
                            name="patients_treated"
                            required
                            placeholder="1200"
                            value={formData.patients_treated}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none "
                        />
                    </div>
                </div>

                

                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Availability (Visiting Days)</label>
                    <div className="flex flex-wrap gap-3">
                        {daysOfWeek.map((day) => (
                            <label
                                key={day}
                                className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium transition-colors 
                                ${formData.availability.includes(day) ?
                                        'bg-blue-50 border-blue-600 text-blue-700' :
                                        'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                    }`}>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.availability.includes(day)}
                                    onChange={() => handleCheckboxChange(day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-1">About & Biography</label>
                    <textarea
                        name="about"
                        required
                        rows="4"
                        placeholder="Orthopedic specialist with extensive experience..."
                        value={formData.about}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    ></textarea>
                </div>

                
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <Link
                        to={'/dashboard/all-doctors'}
                        className="btn btn-error rounded-lg text-base-100 hover:bg-red-500">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="btn btn-primary flex items-center gap-2 text-white rounded-lg ">
                        <Save size={18} />
                        Save Doctor Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;