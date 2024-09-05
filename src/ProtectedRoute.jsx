import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = sessionStorage.getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;