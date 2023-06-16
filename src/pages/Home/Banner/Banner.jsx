import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Banner = () => {
    return (
        <>
            <Slide autoplay={true} duration={6000} pauseOnHover={false} pauseOnClick={false}>
                {/* slide 1 */}
                <div className="relative w-screen">
                    <img src="https://i.ibb.co/tpvpwvK/img1-min.jpg" alt="Image 1" className="w-full brightness-50" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-center">
                        <Fade delay={1e3} cascade damping={1e-1}>
                            <p className='text-4xl md:text-7xl font-bold uppercase md:leading-normal space-y-0 md:space-y-5 text-gray-200'>
                                Enroll now ! </p>
                            <p className='text-3xl hidden md:block italic '>For improving and advancing language proficiency <br />
                                during the summer camp language learning program.</p>
                            <Link to="/classes" className='btn btn-ghost bg-black bg-opacity-50 text-gray-200 mt-2 md:mt-10'>ALL CLASSES</Link>
                        </Fade>
                    </div>
                </div>

                {/* slide 2 */}
                <div className="relative w-screen">
                    <img src="https://i.ibb.co/N2twBzc/img2-min.jpg" alt="Image 1" className="w-full brightness-50" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-center">
                        <Fade delay={1e3} cascade damping={1e-1}>
                            <p className='text-4xl md:text-7xl font-bold uppercase md:leading-normal space-y-0 md:space-y-5 text-gray-200'>
                                Enroll now ! </p>
                            <p className='text-3xl hidden md:block italic '>For improving and advancing language proficiency <br />
                                during the summer camp language learning program.</p>
                            <Link to="/classes" className='btn btn-ghost bg-black bg-opacity-50 text-gray-200 mt-2 md:mt-10'>ALL CLASSES</Link>
                        </Fade>
                    </div>
                </div>

                {/* slide 3 */}
                <div className="relative w-screen">
                    <img src="https://i.ibb.co/t8q8y0s/img3-min.jpg" alt="Image 1" className="w-full brightness-50" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-center">
                        <Fade delay={1e3} cascade damping={1e-1}>
                            <p className='text-4xl md:text-7xl font-bold uppercase md:leading-normal space-y-0 md:space-y-5 text-gray-200'>
                                Enroll now ! </p>
                            <p className='text-3xl hidden md:block italic '>For improving and advancing language proficiency <br />
                                during the summer camp language learning program.</p>
                            <Link to="/classes" className='btn btn-ghost bg-black bg-opacity-50 text-gray-200 mt-2 md:mt-10'>ALL CLASSES</Link>
                        </Fade>
                    </div>
                </div>

                {/* slide 4 */}
                <div className="relative w-screen">
                    <img src="https://i.ibb.co/t3p4XLD/img4-min.jpg" alt="Image 1" className="w-full brightness-50" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-center">
                        <Fade delay={1e3} cascade damping={1e-1}>
                            <p className='text-4xl md:text-7xl font-bold uppercase md:leading-normal space-y-0 md:space-y-5 text-gray-200'>
                                Enroll now ! </p>
                            <p className='text-3xl hidden md:block italic '>For improving and advancing language proficiency <br />
                                during the summer camp language learning program.</p>
                            <Link to="/classes" className='btn btn-ghost bg-black bg-opacity-50 text-gray-200 mt-2 md:mt-10'>ALL CLASSES</Link>
                        </Fade>
                    </div>
                </div>

                {/* slide 5 */}
                <div className="relative w-screen">
                    <img src="https://i.ibb.co/BrgV1JH/img5-min.jpg" alt="Image 1" className="w-full brightness-50" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-center">
                        <Fade delay={1e3} cascade damping={1e-1}>
                            <p className='text-4xl md:text-7xl font-bold uppercase md:leading-normal space-y-0 md:space-y-5 text-gray-200'>
                                Enroll now ! </p>
                            <p className='text-3xl hidden md:block italic '>For improving and advancing language proficiency <br />
                                during the summer camp language learning program.</p>
                            <Link to="/classes" className='btn btn-ghost bg-black bg-opacity-50 text-gray-200 mt-2 md:mt-10'>ALL CLASSES</Link>
                        </Fade>
                    </div>
                </div>

                {/* slide 6 */}
                <div className="relative w-screen">
                    <img src="https://i.ibb.co/yFq247s/img6-min.jpg" alt="Image 1" className="w-full brightness-50" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-center">
                        <Fade delay={1e3} cascade damping={1e-1}>
                            <p className='text-4xl md:text-7xl font-bold uppercase md:leading-normal space-y-0 md:space-y-5 text-gray-200'>
                                Enroll now ! </p>
                            <p className='text-3xl hidden md:block italic '>For improving and advancing language proficiency <br />
                                during the summer camp language learning program.</p>
                            <Link to="/classes" className='btn btn-ghost bg-black bg-opacity-50 text-gray-200 mt-2 md:mt-10'>ALL CLASSES</Link>
                        </Fade>
                    </div>
                </div>
            </Slide >
        </>
    );
};

export default Banner;
