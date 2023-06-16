import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import { Fade } from 'react-awesome-reveal';

const PopularClasses = () => {
    const [classData, setClassData] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`https://speak-ease-server.vercel.app/popular-classes`)
            .then(res => setClassData(res.data))
    }, [])

    useEffect(() => {
        axios.get(`https://speak-ease-server.vercel.app/current-user?email=${user?.email}`)
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

        const selectedClass = { singleClass, studentEmail: user?.email, classId: singleClass._id }
        axios.post(`https://speak-ease-server.vercel.app/selected-class`, selectedClass)
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
        <div className='flex flex-col'>
            <p className='text-3xl font-bold my-10 md:my-20 text-center'>Popular Classes</p>
            <div className='grid grid-cols-1 md:grid-cols-3 mx-auto gap-5 p-5 md:p-0'>
                {classData.slice(0, 6).map((classes) =>
                    <Fade key={classes._id}>
                        <div className={`card w-full h-full rounded-md group border ${classes.seats === 0 && 'bg-red-600'}`}>
                            <figure><img className='w-full h-80' src={classes.image} alt="car!" /></figure>
                            <div className="card-body">
                                <p className='font-semibold'>Class name: <span className='font-normal'>{classes.className}</span></p>
                                <p className='font-semibold'>Instructor Name: <span className='font-normal'>{classes.instructorName}</span></p>
                                <p className='font-semibold'>Available Seats: <span className='font-normal'>{classes.seats}</span></p>
                                <p className='font-semibold'>Enrolled Students: <span className='font-normal'>{classes?.enrolledStudents}</span></p>
                                <p className='font-semibold'>Price: <span className='font-normal'>${classes.price}</span></p>
                                <button disabled={classes.seats === 0 ? 'disabled' : currentUser.role === 'admin' || currentUser.role === 'instructor' ? 'disabled' : ''} onClick={() => handleSelect(classes)} className="btn btn-primary">Select</button>
                            </div>
                        </div>
                    </Fade>
                )}
            </div>
        </div>
    );
};

export default PopularClasses;