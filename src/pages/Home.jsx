import HeroSection from "../components/home/HeroSection";
import LatestNews from "../components/home/LatestNews";
import CategoryWiseNews from "../components/home/CategoryWiseNews";
import bg from '../assets/bg.png';
const Home = () => {
    return (
        <div className="bg-gray-100"
                   style={{ backgroundImage: `url(${bg})` }}
        >
           
            <HeroSection />

            <LatestNews />
            <CategoryWiseNews />

        </div>
    );
};

export default Home;