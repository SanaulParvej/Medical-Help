import React from 'react';
import { use } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Component/Loader/Loading';

const PrivateRoutes = ({ children }) => {

    const { user, loading } = use(AuthContext);
    const location = useLocation()

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to={'/auth/login'} state={location.pathname}></Navigate>
    }

    return children;
};

export default PrivateRoutes;