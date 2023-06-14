import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';

const PopularClasses = () => {
    const [classData, setClassData] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:5000/popular-classes`)
            .then(res => setClassData(res.data))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/current-user?email=${user?.email}`)
            .then(res => {
                setCurrentUser(res.data)
            })
    }, [user?.email])

    const handleSelect = (singleClass) => {
        if (!user) {
            Swal.fire({
                icon: 'error',
                text: 'Without login you can not select class',
                footer: '<a href="/login">Please login</a>'
            })
            return;
        }
        if (currentUser.role === 'admin') {
            Swal.fire({
                icon: 'error',
                text: 'As an admin you can not select any class',
            })
            return;
        }
        if (currentUser.role === 'instructor') {
            Swal.fire({
                icon: 'error',
                text: 'As an instructor you can not select any class',
            })
            return;
        }
        const selectedClass = { singleClass, studentEmail: user?.email, classId: singleClass._id }
        axios.post(`http://localhost:5000/selected-classes`, selectedClass)
            .then(res => {
                if (res.data.acknowledged) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Class selected successfully',
                    })
                }
                // console.log(res.data)
            })
    }
    console.log(classData)

    return (
        <div className='md:p-10 my-10 flex flex-col'>
            <p className='text-3xl font-bold mb-10 text-center'>All Classes</p>
            <div className='grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 mx-auto gap-5'>
                {classData.map((classes) =>
                    <div key={classes._id} className={`card w-80 group glass ${classes.seats === 0 && 'bg-red-600'}`}>
                        <figure><img className='w-80 h-80 group-hover:scale-110' src={classes.image} alt="car!" /></figure>
                        <div className="card-body">
                            <p className='font-semibold'>Class name: <span className='font-normal'>{classes.className}</span></p>
                            <p className='font-semibold'>Instructor Name: <span className='font-normal'>{classes.instructorName}</span></p>
                            <p className='font-semibold'>Available Seats: <span className='font-normal'>{classes.seats}</span></p>
                            <p className='font-semibold'>Enrolled Students: <span className='font-normal'>{classes?.enrolledStudents}</span></p>
                            <p className='font-semibold'>Price: <span className='font-normal'>${classes.price}</span></p>
                            <button onClick={() => handleSelect(classes)} className="btn btn-primary">Select</button>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default PopularClasses;