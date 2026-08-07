import HeroSection from "../components/home/HeroSection";
import LatestNews from "../components/home/LatestNews";
import CategoryWiseNews from "../components/home/CategoryWiseNews";

const Home = () => {
    return (
        <div className="bg-gray-100">

            <HeroSection />

            <LatestNews />
            <CategoryWiseNews />

        </div>
    );
};

export default Home;