import React, { use, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, CheckCircle, Clock, XCircle, Activity } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import Loading from '../../Component/Loader/Loading'

const UserDashboard = () => {
    const {user} = use(AuthContext)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const email = user.email


    useEffect(() => {
        fetch(`http://localhost:4000/user-stats/${email}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
    }, [email]);

    if (loading) return <Loading></Loading>;

    const { stats, upcomingAppointments, pastAppointments } = data;

    const chartData = [
        { name: 'Total', value: stats.totalServiceTaken, color: '#3b82f6' },
        { name: 'Approved', value: stats.totalApprovedService, color: '#10b981' },
        { name: 'Pending', value: stats.pendingAppointments, color: '#f59e0b' },
        { name: 'Cancelled', value: stats.totalCancelled, color: '#ef4444' },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Activity className="text-blue-600" /> User Activity Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={<Calendar size={20}/>} label="Total Services" value={stats.totalServiceTaken} color="blue" />
                <StatCard icon={<CheckCircle size={20}/>} label="Approved" value={stats.totalApprovedService} color="green" />
                <StatCard icon={<Clock size={20}/>} label="Pending" value={stats.pendingAppointments} color="yellow" />
                <StatCard icon={<XCircle size={20}/>} label="Cancelled" value={stats.totalCancelled} color="red" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4">Service Status Breakdown</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 text-green-600">Upcoming ({stats.upcomingCount})</h2>
                    <div className="space-y-4">
                        {upcomingAppointments.length > 0 ? upcomingAppointments.map(app => (
                            <div key={app._id} className="border-l-4 border-green-500 pl-3 py-1">
                                <p className="font-medium text-sm">{app.serviceName || 'Medical Consultation'}</p>
                                <p className="text-xs text-gray-500">{new Date(app.date).toLocaleDateString()}</p>
                            </div>
                        )) : <p className="text-gray-400 text-sm">No upcoming appointments.</p>}
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold">Past Appointments</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm">
                            <tr>
                                <th className="px-6 py-3 font-medium">Service</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pastAppointments.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium">{app.serviceName || 'General Service'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(app.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            app.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            app.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        yellow: "bg-yellow-50 text-yellow-600",
        red: "bg-red-50 text-red-600",
    };
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${colors[color]}`}>{icon}</div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
};

export default UserDashboard;