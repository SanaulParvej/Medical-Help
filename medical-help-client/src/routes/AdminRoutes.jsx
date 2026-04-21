import { Navigate, useLocation } from 'react-router';
import useAdmin from '../hooks/useAdmin';
import { use } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const AdminRoutes = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const [role, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (user && role === 'admin') {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;