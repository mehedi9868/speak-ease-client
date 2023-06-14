import { Navigate, useLocation } from 'react-router-dom';
import { useStudent } from '../hooks/useStudent';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FadeLoader } from "react-spinners";

const StudentRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const [isStudent, isStudentLoading] = useStudent()
    const location = useLocation()

    if (loading || isStudentLoading) {
        return (
            <div className='flex justify-center mt-5 mb-5'>
                {
                    loading && <FadeLoader color="#36d7b7" />
                }
            </div>
        )
    }

    if (user && isStudent) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default StudentRoute;