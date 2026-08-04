import FeaturedNews from "./FeaturedNews";
import FilterSidebar from "./FilterSidebar";

const HeroSection = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid lg:grid-cols-12">
                {/* Featured News + Side Cards */}
                <div className="lg:col-span-9">
                    <FeaturedNews />
                </div>

                {/* Filter Sidebar */}
                <div className="lg:col-span-3">
                    <FilterSidebar />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;