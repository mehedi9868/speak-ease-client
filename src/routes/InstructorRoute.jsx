import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FadeLoader } from "react-spinners";
import { useInstructor } from '../hooks/useInstructor';

const InstructorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const [isInstructor, isInstructorLoading] = useInstructor()
    const location = useLocation()

    if (loading || isInstructorLoading) {
        return (
            <div className='flex justify-center mt-5 mb-5'>
                {
                    loading && <FadeLoader color="#36d7b7" />
                }
            </div>
        )
    }

    if (user && isInstructor) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
}

export default InstructorRoute;