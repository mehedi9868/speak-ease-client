import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Speak Ease | Home</title>
            </Helmet>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Home;