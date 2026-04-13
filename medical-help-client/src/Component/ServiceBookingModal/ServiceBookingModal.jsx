import React, { use, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const ServiceBookingModal = ({ isOpen, onClose, selectedPlan, apiEndpoint }) => {
    const { user } = use(AuthContext);

    const [formData, setFormData] = useState({
        patientName: "",
        phone: "",
        disease: "",
        address: "",
        startDate: "",
        durationNumber: "1",
        durationUnit: "মাস",
        extraNotes: "",
    });

    // Only render null if there's no plan selected. 
    // We keep it in the DOM when closed to allow DaisyUI's smooth fade-out transition.
    if (!selectedPlan) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBookService = (e) => {
        e.preventDefault();

        const bookingData = {
            patientName: formData.patientName,
            phone: formData.phone,
            disease: formData.disease,
            address: formData.address,
            startDate: formData.startDate,
            duration: `${formData.durationNumber} ${formData.durationUnit}`,
            extraNotes: formData.extraNotes,

            patientEmail: user?.email || "Unknown Email",
            planName: selectedPlan.title,
            planPrice: selectedPlan.price,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        fetch(`http://localhost:4000/${apiEndpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "বুকিং সফল হয়েছে!",
                        text: "খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।",
                        confirmButtonColor: "#0d9488",
                    });

                    // ফর্ম রিসেট ও মডাল বন্ধ
                    setFormData({
                        patientName: "", phone: "", disease: "", address: "", startDate: "", durationNumber: "1", durationUnit: "মাস", extraNotes: ""
                    });
                    onClose();
                } else {
                    Swal.fire({ icon: "warning", title: "দুঃখিত!", text: "বুকিং করতে সমস্যা হয়েছে।" });
                }
            })
            .catch((error) => {
                Swal.fire({ icon: "error", title: "সার্ভার এরর", text: "সার্ভারের সাথে কানেক্ট করা যাচ্ছে না।" });
            });
    };

    return (
        <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition bg-transparent border-none outline-none cursor-pointer z-10"
                >
                    &times;
                </button>

                <h3 className="text-2xl font-bold text-gray-800 mb-1">সার্ভিস বুকিং</h3>
                <p className="text-teal-600 font-semibold mb-6 pb-4 border-b border-gray-100">
                    প্যাকেজ: {selectedPlan?.title} (৳{selectedPlan?.price})
                </p>


                <form onSubmit={handleBookService} className="space-y-4 pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">রোগীর নাম *</label>
                            <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">মোবাইল নম্বর *</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">বর্তমান সমস্যা/রোগ *</label>
                        <input type="text" name="disease" value={formData.disease} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="যেমন: স্ট্রোক, প্যারালাইসিস" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">শুরুর তারিখ *</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">কত সময়ের জন্য? *</label>
                            <div className="flex gap-2">
                                <input type="number" name="durationNumber" value={formData.durationNumber} onChange={handleInputChange} min="1" className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-center" required />
                                <select name="durationUnit" value={formData.durationUnit} onChange={handleInputChange} className="w-1/2 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white">
                                    <option value="দিন">দিন</option><option value="সপ্তাহ">সপ্তাহ</option><option value="মাস">মাস</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ঠিকানা *</label>
                        <textarea name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" rows="2" required></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">অতিরিক্ত তথ্য (যদি থাকে)</label>
                        <textarea name="extraNotes" value={formData.extraNotes} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" rows="2"></textarea>
                    </div>


                    <button type="submit" className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg shadow-md transition mt-4">
                        বুকিং কনফার্ম করুন
                    </button>
                </form>
            </div>

            {/* DaisyUI modal backdrop: Clicking outside the modal box triggers the close function */}
            <form method="dialog" className="modal-backdrop bg-black/60">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};

export default ServiceBookingModal;