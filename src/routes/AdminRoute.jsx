import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { useAdmin } from '../hooks/useAdmin';
import { FadeLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if (loading || isAdminLoading) {
        return (
            <div className='flex justify-center mt-5 mb-5'>
                {
                    loading && <FadeLoader color="#36d7b7" />
                }
            </div>
        )
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;