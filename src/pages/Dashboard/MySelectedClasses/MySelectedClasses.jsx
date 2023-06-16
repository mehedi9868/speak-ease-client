import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

const MySelectedClasses = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: selectedClasses = [], refetch } = useQuery({
        queryKey: ['selected-classes'],
        enabled: !loading,
        queryFn: async () => {
            const response = await axios.get(`https://speak-ease-server.vercel.app/selected-classes?email=${user?.email}`)
            return response.data
        }
    })
    // console.log(selectedClasses)
    const handleDelete = (id) => {
        axios.delete(`https://speak-ease-server.vercel.app/selected-classes/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        text: 'Class deleted successfully',
                    })
                }
                console.log(res.data)
            })
    }
    return (
        <>
            <Helmet>
                <title>Speak Ease | Selected Classes</title>
            </Helmet>
            <div className='w-11/12 py-10 px-5 bg-gray-100 rounded-md my-10'>
                <p className='text-3xl font-bold my-5 text-center mb-10'>My Selected Classes : {selectedClasses.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#262626] bg-opacity-80 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Instructor Name</th>
                                <th>Available Seats</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedClasses.map((classes, index) =>
                                <tr key={classes._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td><img className='w-20 rounded-md' src={classes?.singleClass?.image} alt="" /></td>
                                    <td>{classes?.singleClass?.className}</td>
                                    <td>{classes?.singleClass?.instructorName}</td>
                                    <td>{classes?.singleClass?.seats}</td>
                                    <td>${classes?.singleClass?.price}</td>
                                    <td className='flex justify-between gap-2'><button onClick={() => handleDelete(classes._id)} className='btn btn-error rounded-md'>Delete</button><Link to={`/dashboard/payment/${classes._id}`}><button className='btn btn-success rounded-md'>pay</button></Link></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MySelectedClasses;
