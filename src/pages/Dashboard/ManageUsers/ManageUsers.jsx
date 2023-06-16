import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FaUserAlt } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.get(`https://speak-ease-server.vercel.app/all-users`);
            return response.data;
        },
    });

    const handleUpdate = (id, role) => {
        axios.put(`https://speak-ease-server.vercel.app/all-users/${id}?role=${role}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        text: 'Role updated Successfully',
                    })
                }
                console.log(res.data)
            })
    }
    return (
        <>
            <Helmet>
                <title>Speak Ease | Manage Users</title>
            </Helmet>
            <div className='w-5/6 py-10 px-5 bg-gray-100 my-10 rounded-md'>
                <p className='text-3xl font-bold my-5 text-center mb-10'>All Users: {allUsers.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#262626] bg-opacity-80 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Make Instructor</th>
                                <th>Make Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user, index) =>
                                <tr key={user._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td><button disabled={user.role === 'instructor'} onClick={() => handleUpdate(user._id, 'instructor')} className='btn btn-ghost bg-[#262626] bg-opacity-80 rounded-md text-white'><FaUserAlt className='w-5 h-5' /></button></td>
                                    <td><button disabled={user.role === 'admin'} onClick={() => handleUpdate(user._id, 'admin')} className='btn btn-ghost bg-[#262626] bg-opacity-80 rounded-md text-white'><RiAdminFill className='w-5 h-5' /></button></td>

                                </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;