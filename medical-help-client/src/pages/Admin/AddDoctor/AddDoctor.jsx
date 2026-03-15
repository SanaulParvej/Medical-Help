import React, { useState } from 'react';
import { Save, UserPlus } from 'lucide-react';

const AddDoctor = () => {
    const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        education: '',
        speciality: '',
        experience_years: '',
        registration_number: '',
        working_place: '',
        chamber_time: '',
        consultation_fee: '',
        about: '',
        availability: []
    });

    // Handle standard text/number inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'experience_years' || name === 'consultation_fee' 
                ? Number(value) 
                : value
        });
    };

    // Handle the availability array (checkboxes)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting new doctor data:", formData);
        alert("Doctor profile created! Check the console for the data payload.");
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <UserPlus className="text-blue-600" size={28} />
                    Add New Doctor
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Enter the professional and clinic details to register a new doctor in the system.
                </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" name="name" required placeholder="Dr. Ayesha Rahman"
                            value={formData.name} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                        <input type="url" name="image" placeholder="https://i.ibb.co.com/..."
                            value={formData.image} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Speciality */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                        <input type="text" name="speciality" required placeholder="Orthopedic Surgeon"
                            value={formData.speciality} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Education & Degrees</label>
                        <input type="text" name="education" required placeholder="MBBS, MS (Orthopedics) - BSMMU"
                            value={formData.education} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                        <input type="number" name="experience_years" required placeholder="12" min="0"
                            value={formData.experience_years} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Registration Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">BMDC Registration Number</label>
                        <input type="text" name="registration_number" required placeholder="REG20250002"
                            value={formData.registration_number} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Working Place */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Working Place</label>
                        <input type="text" name="working_place" required placeholder="Ibn Sina Hospital, Dhanmondi"
                            value={formData.working_place} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Consultation Fee */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (BDT)</label>
                        <input type="number" name="consultation_fee" required placeholder="1200" min="0"
                            value={formData.consultation_fee} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Chamber Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chamber Time</label>
                        <input type="text" name="chamber_time" required placeholder="4PM - 8PM"
                            value={formData.chamber_time} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Full Width Sections */}
                
                {/* Availability Checkboxes */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Availability (Visiting Days)</label>
                    <div className="flex flex-wrap gap-3">
                        {daysOfWeek.map((day) => (
                            <label key={day} className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                                formData.availability.includes(day) 
                                    ? 'bg-blue-50 border-blue-600 text-blue-700' 
                                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                            }`}>
                                <input type="checkbox" className="hidden" 
                                    checked={formData.availability.includes(day)}
                                    onChange={() => handleCheckboxChange(day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                {/* About Textarea */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-1">About & Biography</label>
                    <textarea name="about" required rows="4" placeholder="Orthopedic specialist with extensive experience..."
                        value={formData.about} onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    ></textarea>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <button type="button" className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                        Cancel
                    </button>
                    <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100">
                        <Save size={18} />
                        Save Doctor Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;