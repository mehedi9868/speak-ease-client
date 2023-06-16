import axios from 'axios';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';

const Instructors = () => {
    const { data: allInstructors = [] } = useQuery({
        queryKey: ['users'],
        retry: 6,
        queryFn: async () => {
            const response = await axios.get(`https://speak-ease-server.vercel.app/all-instructors`);
            return response.data;
        },
    });
    return (
        <>
            <Helmet>
                <title>Speak Ease | Instructors</title>
            </Helmet>
            <div className='flex flex-col mb-20'>
                <p className='text-3xl font-bold my-20 text-center'>All Instructors </p>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mx-auto'>
                    {
                        allInstructors.map(instructor =>
                            <Fade key={instructor._id} >
                                <div className="card w-full rounded-md bg-base-100 border group">
                                    <figure><img className=' w-full h-80' src={instructor?.photo} alt={instructor.name} /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{instructor.name}</h2>
                                        <p className='font-semibold'>Email: <span className='font-normal'>{instructor.email}</span></p>
                                    </div>
                                </div>
                            </Fade>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Instructors;