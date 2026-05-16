import React, { useContext } from 'react'
import { AuthContext } from '../Context/Auth.context'
import { Navigate, useLocation } from 'react-router';
import HomeLoading from '../pages/Home/HomeLoading';

export default function ProtectedRoute({ children }) {

    const { isAuthenticated, isLoading } = useContext(AuthContext);
    const location = useLocation()
    if (isLoading) return <HomeLoading />


    if (!isAuthenticated) {
        return <Navigate to={'/login'} state={{ from: location.pathname }} />
    }
    else {
        return children;
    }

}
