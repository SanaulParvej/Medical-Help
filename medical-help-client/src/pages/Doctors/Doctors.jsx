import React, { useState } from "react";
import { useLoaderData } from "react-router";
import DoctorCard from "./DoctorCard";
import { IoSearch } from "react-icons/io5";

const Doctors = () => {
  const doctors = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");

  // Get unique specialities
  let specialities = ["All"];
  if (doctors && doctors.length > 0) {
    doctors.forEach((doc) => {
      const speciality = doc.speciality;
      if (speciality && !specialities.includes(speciality)) {
        specialities.push(speciality);
      }
    });
  }

  // Filter doctors
  let filteredDoctors = doctors;
  if (doctors && doctors.length > 0) {
    filteredDoctors = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.speciality?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpeciality =
        selectedSpeciality === "All" ||
        doctor.speciality === selectedSpeciality;

      return matchesSearch && matchesSpeciality;
    });
  }

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
            Meet our experienced team of medical professionals dedicated to
            providing you with the best healthcare solutions and personalized
            treatment plans.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
            />
          </div>

          {/* Filter by Specialty */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="text-sm md:text-base font-semibold text-gray-700 self-center">
              Filter:
            </span>
            <div className="flex flex-wrap gap-2">
              {specialities.map((speciality) => (
                <button
                  key={speciality}
                  onClick={() => setSelectedSpeciality(speciality)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedSpeciality === speciality
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {speciality}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {searchQuery || selectedSpeciality !== "All" ? (
            <p className="text-sm text-gray-600">
              Found{" "}
              <span className="font-semibold text-indigo-600">
                {filteredDoctors.length}
              </span>{" "}
              doctor(s)
            </p>
          ) : null}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredDoctors && filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500">
                {searchQuery || selectedSpeciality !== "All"
                  ? "No doctors match your search criteria."
                  : "No doctors available at the moment."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
