import React from 'react';
import Swal from 'sweetalert2';

const UpdateProfileForm = ({ userData, userEmail, onUpdateSuccess, onClose }) => {
console.log(userData,userEmail);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedInfo = {
            name: form.name.value,
            phone: form.phone.value,
            bloodGroup: form.bloodGroup.value,
            address: form.address.value,
            emergencyContact: form.emergencyContact.value,
            chronicIllness: form.chronicIllness.value,
        };

        fetch(`https://medical-help-server.vercel.app/users/${userEmail}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire(
                        "Updated!",
                        "Profile information updated successfully.",
                        "success"
                    );
                    onUpdateSuccess(updatedInfo);
                    onClose();
                }
            })
    };

    return (
        <dialog id="edit_profile_modal" className="modal">
            <div className="modal-box max-w-2xl bg-white rounded-2xl p-8">
                <h3 className="font-bold text-2xl mb-6 text-gray-800">
                    Edit Profile Information
                </h3>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label text-xs font-bold text-gray-500 uppercase">Full Name</label>
                            <input type="text" name="name" defaultValue={userData?.name} className="input input-bordered focus:border-indigo-500" required />
                        </div>
                        <div className="form-control">
                            <label className="label text-xs font-bold text-gray-500 uppercase">Mobile Number</label>
                            <input type="text" name="phone" defaultValue={userData?.phone} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label text-xs font-bold text-gray-500 uppercase">Emergency Contact</label>
                            <input type="text" name="emergencyContact" defaultValue={userData?.emergencyContact} className="input input-bordered" placeholder="পারিবারিক কেউ" />
                        </div>
                        <div className="form-control">
                            <label className="label text-xs font-bold text-gray-500 uppercase">Blood Group</label>
                            <select name="bloodGroup" defaultValue={userData?.bloodGroup || "Not Set"} className="select select-bordered bg-white">
                                <option value="Not Set">Select</option>
                                <option value="A+">A+</option><option value="A-">A-</option>
                                <option value="B+">B+</option><option value="B-">B-</option>
                                <option value="O+">O+</option><option value="O-">O-</option>
                                <option value="AB+">AB+</option><option value="AB-">AB-</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label text-xs font-bold text-gray-500 uppercase">Address</label>
                        <textarea name="address" defaultValue={userData?.address} className="textarea textarea-bordered" rows="2"></textarea>
                    </div>


                    <div className="form-control">
                        <label className="label text-xs font-bold text-gray-500 uppercase">Disease / Allergies (If any)</label>
                        <textarea name="chronicIllness" defaultValue={userData?.chronicIllness} className="textarea textarea-bordered" placeholder="যেমন: ডায়াবেটিস, ধুলিকণায় এলার্জি..." rows="2"></textarea>
                    </div>

                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn bg-gray-100 border-none text-gray-600 hover:bg-gray-200">
                            Cancel
                        </button>
                        <button type="submit" className="btn bg-indigo-600 border-none text-white hover:bg-indigo-700 px-8 shadow-md">
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};

export default UpdateProfileForm;
