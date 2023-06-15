import { Fade } from 'react-awesome-reveal';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Banner = () => {
    return (
        <>
            <Slide autoplay={false} duration={3000} pauseOnHover={false} pauseOnClick={false}>
                <div className="relative w-screen">

                    <Fade>
                        <img src="https://img.freepik.com/free-photo/beautiful-scenery-rock-formations-by-sea-queens-bath-kauai-hawaii-sunset_181624-36857.jpg?w=1380&t=st=1686695113~exp=1686695713~hmac=dea082b5a42595cafb95a77cd6f18216e9791db57e065a6907cbae134ff23c5a" alt="Image 1" className="w-full brightness-75" />
                    </Fade>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">



                        <Fade delay={1e3} cascade damping={1e-1}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis odit molestias eligendi dolores adipisci pariatur facere maxime quod obcaecati praesentium?
                            </p>
                        </Fade>

                    </div>
                </div>
                <div className="relative w-screen">
                    <img src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=1380&t=st=1686698236~exp=1686698836~hmac=2030997a60b8b50bd6c9d2af6b421264ebf847e67787221b6fa60f8d8f3993ac" alt="Image 2" className="w-full brightness-75" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                        <Fade>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis odit molestias eligendi dolores adipisci pariatur facere maxime quod obcaecati praesentium?
                            </p>
                        </Fade>
                    </div>
                </div>
                <div className="relative w-screen">
                    <img src="https://img.freepik.com/free-photo/beautiful-scenery-rock-formations-by-sea-queens-bath-kauai-hawaii-sunset_181624-36857.jpg?w=1380&t=st=1686695113~exp=1686695713~hmac=dea082b5a42595cafb95a77cd6f18216e9791db57e065a6907cbae134ff23c5a" alt="Image 1" className="w-full brightness-75" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                        <Fade>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis odit molestias eligendi dolores adipisci pariatur facere maxime quod obcaecati praesentium?
                            </p>
                        </Fade>
                    </div>
                </div>
            </Slide >
        </>
    );
};

export default Banner;
