import React from "react";

const InfoCard = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-sm shrink-0">
            {icon}
        </div>
        <div>
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-sm font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default InfoCard;
