import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/UserContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a proper spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
