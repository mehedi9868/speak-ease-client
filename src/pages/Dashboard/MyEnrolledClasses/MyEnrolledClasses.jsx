import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import { Helmet } from 'react-helmet';

const MyEnrolledClasses = () => {
    const { user } = useContext(AuthContext);
    const { data: enrolledClasses = [], refetch } = useQuery({
        queryKey: ['selected-classes'],
        queryFn: async () => {
            const response = await axios.get(`https://speak-ease-server.vercel.app/enrolled-classes/${user?.email}`)
            return response.data
        }
    })
    return (
        <>
            <Helmet>
                <title>Speak Ease | Enrolled Classes</title>
            </Helmet>
            <div className='w-5/6 py-10 px-5 bg-gray-100 rounded-md my-10'>
                <p className='text-3xl font-bold my-5 text-center mb-10'>My Enrolled Classes : {enrolledClasses.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#262626] bg-opacity-80 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Class Name</th>
                                <th>Instructor Name</th>
                                <th>Instructor Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolledClasses.map((classes, index) =>
                                <tr key={classes._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td><img className='w-20 rounded-md' src={classes?.singleClass?.image} alt="" /></td>
                                    <td>{classes?.singleClass?.className}</td>
                                    <td>{classes?.singleClass?.instructorName}</td>
                                    <td>{classes?.singleClass?.instructorEmail}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyEnrolledClasses;