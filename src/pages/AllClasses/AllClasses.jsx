import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import { useQuery } from 'react-query';

const AllClasses = () => {
    const [currentUser, setCurrentUser] = useState({})

    const { user } = useContext(AuthContext)

    const { data: allClasses = [], refetch } = useQuery({
        queryKey: ['all-classes'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/all-classes`)
            return response.data
        }
    })

    useEffect(() => {
        axios.get(`http://localhost:5000/current-user?email=${user?.email}`)
            .then(res => {
                setCurrentUser(res.data)
            })
    }, [user?.email])

    const handleSelect = (singleClass) => {
        const selectedClass = { singleClass, studentEmail: user?.email }
        axios.post(`http://localhost:5000/selected-classes`, selectedClass)
            .then(res => {
                if (res.data.acknowledged) {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        text: 'Class selected successfully',
                    })
                }
            })
    }
    return (
        <div className='md:p-10 my-10'>
            <p className='text-3xl font-bold mb-10 text-center'>All Classes</p>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
                {allClasses.map((classes) =>
                    <div key={classes._id} className={`card w-96 glass ${classes.seats === 0 && 'bg-red-600'}`}>
                        <figure><img className='w-full h-96' src={classes.image} alt="car!" /></figure>
                        <div className="card-body">
                            <p className='font-semibold'>Class name: <span className='font-normal'>{classes.className}</span></p>
                            <p className='font-semibold'>Instructor Name: <span className='font-normal'>{classes.instructorName}</span></p>
                            <p className='font-semibold'>Available Seats: <span className='font-normal'>{classes.seats}</span></p>
                            <p className='font-semibold'>Price: <span className='font-normal'>${classes.price}</span></p>
                            <button disabled={classes.seats === 0 ? 'disabled' : currentUser.role === 'admin' || currentUser.role === 'instructor' ? 'disabled' : ''} onClick={() => handleSelect(classes)} className="btn btn-primary">Select</button>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default AllClasses;