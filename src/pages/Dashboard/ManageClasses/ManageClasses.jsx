import axios from 'axios';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';

const ManageClasses = () => {

    const [modal, setModal] = useState(false)
    const [selectedClassId, setSelectedClassId] = useState(null);
    const { data: allClasses = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const response = await axios.get(`https://speak-ease-server.vercel.app/all-classes`);
            return response.data;
        },
    });

    // console.log(allClasses)
    const handleUpdate = (id, status) => {
        fetch(`https://speak-ease-server.vercel.app/all-classes/${id}?status=${status}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                console.log(data)
            })
    }
    const handleModal = (id) => {
        setSelectedClassId(id)
        setModal(true)

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const feedback = event.target.feedback.value;
        const id = selectedClassId; // Access the selected class ID
        axios.put(`https://speak-ease-server.vercel.app/all-classes/${id}?feedback=${feedback}`)
            .then((res) => {
                console.log(res.data);
            });
        setModal(false);
    };

    return (
        <>
            <Helmet>
                <title>Speak Ease | Manage Classes</title>
            </Helmet>
            {
                modal && <dialog className="modal modal-bottom sm:modal-middle" open>
                    <form onSubmit={handleSubmit} method="dialog" className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg">Feedback</h3>
                        <div className="form-control mt-3">
                            <textarea placeholder="Feedback" name='feedback' className="textarea textarea-bordered textarea-md w-full focus:outline-none" ></textarea>
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn rounded-md">
                                submit
                            </button>
                        </div>
                    </form>
                </dialog>
            }
            <div className='w-5/6 py-10 px-5 bg-gray-100 my-10 rounded-md'>
                <p className='text-3xl font-bold my-5 text-center mb-10'>All Classes: {allClasses.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#262626] bg-opacity-80 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Class Name</th>
                                <th>Instructor Name</th>
                                <th>Instructor email</th>
                                <th>Price</th>
                                <th>Seats</th>
                                <th>Feedback</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allClasses.map((classes, index) =>
                                <tr key={classes._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td><img className='w-20 rounded-md' src={classes.image} alt="" /></td>
                                    <td>{classes.className}</td>
                                    <td>{classes.instructorName}</td>
                                    <td>{classes.instructorEmail}</td>
                                    <td>${classes.price}</td>
                                    <td>{classes.seats}</td>
                                    <td><button onClick={() => handleModal(classes._id)} className='btn btn-ghost bg-gray-200 rounded-md'>Feedback</button></td>
                                    {
                                        classes.status === 'Pending' && <td><div className='text-sm p-3 rounded-md flex justify-center items-center border-2 border-yellow-600 font-semibold'>{classes.status}</div></td>
                                    }
                                    {
                                        classes.status === 'Approved' && <td><div className='text-sm p-3 rounded-md flex justify-center items-center border-2 border-green-600 font-semibold'>{classes.status}</div></td>
                                    }
                                    {
                                        classes.status === 'Denied' && <td><div className='text-sm p-3 rounded-md flex justify-center items-center border-2 border-red-600 font-semibold'>{classes.status}</div></td>
                                    }
                                    <td><div className='flex justify-between gap-2'><button disabled={classes.status === 'Approved' || classes.status == 'Denied'} onClick={() => handleUpdate(classes._id, 'approved')} className='btn btn-success rounded-md'>Approve</button><button disabled={classes.status === 'Approved' || classes.status == 'Denied'} onClick={() => handleUpdate(classes._id, 'denied')} className='btn btn-error rounded-md'>Denied</button></div></td>
                                </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageClasses;