import axios from 'axios';
import { Fade } from 'react-awesome-reveal';
import { useQuery } from 'react-query';

const PopularInstructors = () => {

    const { data: popularInstructors = [] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const response = await axios.get(`https://speak-ease-server.vercel.app/popular-instructors`)
            return response.data
        }
    })
    // console.log(popularInstructors[0].photo);
    return (
        <div className='md:p-10 px-7 my-10 mx-auto w-11/12'>
            <p className='text-3xl font-bold text-center mb-10'>Popular Instructors</p>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-5 mx-auto'>
                {popularInstructors &&
                    popularInstructors.slice(0, 6).map((instructor) =>
                        <Fade key={instructor._id}>
                            <div className="card w-80 bg-base-100 border group">
                                <figure><img className='group-hover:scale-110 w-full h-72' src={instructor?.photo} alt={instructor?.name} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{instructor?.name}</h2>
                                    <p className='font-semibold'>Email: <span className='font-normal'>{instructor?.email}</span></p>
                                </div>
                            </div>
                        </Fade>
                    )
                }
            </div>
        </div>
    );
};

export default PopularInstructors;