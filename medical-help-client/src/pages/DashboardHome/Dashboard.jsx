import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import Loading from '../../Component/Loader/Loading';

const Dashboard = () => {

    const [role, isAdminLoading] = useAdmin();

    if (isAdminLoading) {
        return <Loading></Loading>
    }

    if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else if (role === 'user') {
        return <UserDashboard></UserDashboard>
    }
    else {
        return <h1>Forbidden</h1>
    }
};

export default Dashboard;