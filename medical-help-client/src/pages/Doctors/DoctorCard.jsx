import { Link } from "react-router";
import { FaCalendarAlt, FaBriefcaseMedical, FaMapMarkerAlt } from "react-icons/fa";

const DoctorCard = ({ doctor }) => {
    const {
        _id,
        image,
        name,
        speciality,
        experience_years,
        working_place,
        consultation_fee,
        rating,
    } = doctor;

    return (
        <div className="h-full rounded-xl shadow-lg border border-gray-100">

            {/* Doctor Image Container */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                {/* Badge Overlay */}
                <div className="absolute top-4 right-4 bg-base-200 px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                    ⭐️ {rating}
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-2">
                {/* Name */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        {name}
                    </h3>
                </div>

                {/* Speciality Badge */}
                <div className="flex items-center gap-2">
                    <FaBriefcaseMedical className="text-indigo-600" size={16} />
                    <p className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        {speciality}
                    </p>
                </div>

                {/* Hospital */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" size={14} />
                    <p className="line-clamp-2">{working_place}</p>
                </div>

                {/* Experience & Fee */}
                <div className="flex items-center justify-between py-3 border-t border-b border-gray-100">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-indigo-600">{experience_years}+ <span className="text-xs text-gray-500 font-medium">Years Experience</span> </p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{consultation_fee} <span className="text-xs text-gray-500 font-medium">BDT/session</span></p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-2 pt-2">
                    <Link
                        to={`/doctor/${_id}`}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg btn btn-primary btn-outline"
                    >
                    <FaBriefcaseMedical size={16} />
                    Details
                </Link>

                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg btn btn-primary">
                    <FaCalendarAlt size={16} />
                    Book
                </button>
            </div>

        </div>
        </div >
    );
};

export default DoctorCard;