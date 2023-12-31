import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';

const AddClass = () => {
    const { user } = useContext(AuthContext)

    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target;
        const className = form.className.value;
        const classImage = form.classImage.files[0];
        const seats = parseInt(form.availableSeats.value);
        const price = parseFloat(form.price.value)

        const classPhoto = new FormData()
        classPhoto.append('image', classImage)

        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`, classPhoto)
        const image = response.data.data.display_url;

        const classes = { className, image: image, instructorEmail: user?.email, instructorName: user?.displayName, seats, price, status: 'Pending', enrolledStudents: 0, date: new Date() }

        await axios.post(`https://speak-ease-server.vercel.app/all-classes`, classes)
            .then(res => {
                if (res.data.acknowledged) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Class added successfully',
                    })
                }
                console.log(res.data)
            })
    }
    return (
        <>
            <Helmet>
                <title>Speak Ease | Add Class</title>
            </Helmet>
            <form onSubmit={handleSubmit} className='w-5/6 bg-gray-100 p-10 my-10 rounded-md'>
                <p className='text-3xl font-bold text-center my-5 mb-10'>Add Class</p>
                <div className='flex justify-between w-full space-x-5'>
                    <div className="form-control w-full">
                        <label htmlFor="" className='font-semibold mb-2'>Class name</label>
                        <input type="text" name="className" placeholder='Class Name' className='input input-bordered focus:outline-none' />
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor="" className='font-semibold mb-2'>Class Image</label>
                        <input type="file" name='classImage' className="file-input file-input-bordered w-full" />
                    </div>
                </div>
                <div className='flex justify-between w-full space-x-5 mt-5'>
                    <div className="form-control w-full">
                        <label htmlFor="" className='font-semibold mb-2'>Instructor name</label>
                        <input type="text" name="instructorName" value={user?.displayName} placeholder='Instructor Name' className='input input-bordered focus:outline-none' />
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor="" className='font-semibold mb-2'>Instructor Email</label>
                        <input type="text" name="instructorEmail" value={user?.email} placeholder='Instructor email' className='input input-bordered focus:outline-none' />
                    </div>
                </div>
                <div className='flex justify-between w-full space-x-5 mt-5'>
                    <div className="form-control w-full">
                        <label htmlFor="" className='font-semibold mb-2'>Available Seats</label>
                        <input type="text" name="availableSeats" placeholder='Available Seats' className='input input-bordered focus:outline-none' />
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor="" className='font-semibold mb-2'>Price</label>
                        <input type="text" name="price" placeholder='price' className='input input-bordered focus:outline-none' />
                    </div>
                </div>
                <button type='submit' className='btn btn-ghost bg-[#262626] bg-opacity-80 hover:bg-opacity-70 text-gray-200 mt-5 w-full font-bold'>Add Class</button>
            </form>
        </>
    );
};

export default AddClass;