import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { Pencil, Trash2, UserPlus, Inbox, Save, X } from 'lucide-react';
import Swal from 'sweetalert2';

const AllDoctors = () => {
    const loadedDoctors = useLoaderData();
    const [doctors, setDoctors] = useState(loadedDoctors);

    const [currentDoctor, setCurrentDoctor] = useState({
        _id: '', name: '', image: '', education: '', speciality: '',
        experience_years: '', registration_number: '', working_place: '',
        chamber_time: '', consultation_fee: '', rating: '', patients_treated: '',
        about: '', availability: []
    });

    const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this doctor's data!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://medical-help-server.vercel.app/doctors/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'The doctor has been removed.', 'success');
                            setDoctors(doctors.filter(doctor => doctor._id !== id));
                        }
                    })
                    .catch(error => console.error(error));
            }
        });
    };

    const handleEditClick = (doctor) => {
        setCurrentDoctor({
            ...doctor,
            availability: doctor.availability || []
        });
        document.getElementById('edit_doctor_modal').showModal();
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentDoctor({
            ...currentDoctor,
            [name]: name === 'experience_years' || name === 'consultation_fee' || name === 'rating' || name === 'patients_treated'
                ? Number(value)
                : value
        });
    };

    const handleEditCheckboxChange = (day) => {
        setCurrentDoctor((prev) => {
            const isSelected = prev.availability.includes(day);
            return {
                ...prev,
                availability: isSelected
                    ? prev.availability.filter((d) => d !== day)
                    : [...prev.availability, day]
            };
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const { _id, ...updateData } = currentDoctor;

        fetch(`https://medical-help-server.vercel.app/doctors/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Updated!', 'Doctor details have been updated successfully.', 'success');
                    setDoctors(doctors.map(doc => doc._id === _id ? currentDoctor : doc));
                    document.getElementById('edit_doctor_modal').close(); // DaisyUI Modal Close
                } else {
                    Swal.fire('No Changes', 'You did not make any changes.', 'info');
                    document.getElementById('edit_doctor_modal').close();
                }
            })
            .catch(error => {
                console.error("Error updating doctor:", error);
                Swal.fire('Error!', 'Could not update doctor details.', 'error');
            });
    };

    return (
        <div className="px-6 py-8">
            
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Doctors ({doctors.length})</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your clinic's medical professionals and their details.</p>
                </div>
                <Link to={'/dashboard/add-doctor'} className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <UserPlus size={16} />
                    Add Doctor
                </Link>
            </div>

            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Doctor Name</th>
                                <th className="px-6 py-4">Specialty</th>
                                <th className="px-6 py-4">Consultation Fee</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-700">
                            {doctors.length > 0 ? (
                                doctors.map((doctor, idx) => (
                                    <tr key={doctor._id || idx} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 text-gray-400">{idx + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                            {doctor.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                {doctor.speciality}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">৳{doctor.consultation_fee}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleEditClick(doctor)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" aria-label="Edit">
                                                    <Pencil size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(doctor._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" aria-label="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Inbox size={48} strokeWidth={1} className="mb-4 text-gray-300" />
                                            <p className="text-base font-medium text-gray-900">No doctors found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            
            <dialog id="edit_doctor_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
                    
                    
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Pencil className="text-indigo-600" size={20} /> Edit Doctor Profile
                        </h3>
                        <form method="dialog">
                            <button className="text-gray-400 hover:text-red-500 bg-white p-1 rounded-full shadow-sm transition">
                                <X size={20} />
                            </button>
                        </form>
                    </div>

                    
                    <div className="p-6 overflow-y-auto">
                        <form id="editDoctorForm" onSubmit={handleUpdate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" name="name" required value={currentDoctor.name} onChange={handleEditChange} className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                                    <input type="url" name="image" value={currentDoctor.image} onChange={handleEditChange} className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                                    <input type="text" name="speciality" required value={currentDoctor.speciality} onChange={handleEditChange} className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Education & Degrees</label>
                                    <input type="text" name="education" required value={currentDoctor.education} onChange={handleEditChange} className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                                    <input type="number" name="experience_years" required min="0" value={currentDoctor.experience_years} onChange={handleEditChange} className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">BMDC Reg. Number</label>
                                    <input 
                                        type="text" 
                                        name="registration_number" 
                                        readOnly 
                                        value={currentDoctor.registration_number} 
                                        className="input input-bordered w-full bg-gray-100 text-gray-500 cursor-not-allowed" 
                                        title="Registration number cannot be changed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Working Place</label>
                                    <input type="text" name="working_place" required value={currentDoctor.working_place} onChange={handleEditChange} className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (BDT)</label>
                                    <input type="number" name="consultation_fee" required min="0" value={currentDoctor.consultation_fee} onChange={handleEditChange} className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Chamber Time</label>
                                    <input type="text" name="chamber_time" required value={currentDoctor.chamber_time} onChange={handleEditChange} className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                    <input type="number" name="rating" required min="0" max="5" step="0.1" value={currentDoctor.rating} onChange={handleEditChange} className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Treated Patient</label>
                                    <input type="number" name="patients_treated" required value={currentDoctor.patients_treated} onChange={handleEditChange} className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>

                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Availability (Visiting Days)</label>
                                <div className="flex flex-wrap gap-3">
                                    {daysOfWeek.map((day) => (
                                        <label key={day} className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${currentDoctor.availability.includes(day) ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={currentDoctor.availability.includes(day)}
                                                onChange={() => handleEditCheckboxChange(day)} />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">About & Biography</label>
                                <textarea
                                    name="about"
                                    required
                                    rows="4"
                                    value={currentDoctor.about}
                                    onChange={handleEditChange}
                                    className="textarea textarea-bordered w-full focus:ring-2 focus:ring-indigo-500 text-base"></textarea>
                            </div>
                        </form>
                    </div>

                    
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
                        <form method="dialog">
                            <button className="btn btn-neutral rounded-lg">
                                Cancel
                            </button>
                        </form>
                        <button
                            type="submit"
                            form="editDoctorForm"
                            className="btn btn-primary flex items-center gap-2 rounded-lg"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </div>

                </div>
            </dialog>

        </div>
    );
};

export default AllDoctors;