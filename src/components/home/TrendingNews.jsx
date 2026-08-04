import { useEffect, useState } from "react";
import { newsUrl } from "../../../config/config";
import TrendingCard from "./TrendingCard";
import axios from "axios";

const trendingNews = [
    {
        slug: "top-models",
        title: "Top Models Dominating International Fashion Weeks",
        category: "Models",
        date: "July 30, 2026",
    },
    {
        slug: "beauty-trends",
        title: "Beauty Trends Everyone Is Talking About",
        category: "Beauty",
        date: "July 29, 2026",
    },
    {
        slug: "runway-show",
        title: "Inside Milan's Biggest Runway Show",
        category: "Runway",
        date: "July 28, 2026",
    },
    {
        slug: "new-faces",
        title: "Meet The New Faces Of Fashion Industry",
        category: "Fashion",
        date: "July 27, 2026",
    },
];


const TrendingNews = () => {

    const [trendingNews, setTrendingNews] = useState([]);

    const FetchTrendingNews = async () => {
        const res = await axios.get(newsUrl.getAll);
        console.log("trending", res.data.data);
        const trendingNews = res.data.data;
        setTrendingNews(trendingNews);
    }

    useEffect(() => {
        FetchTrendingNews();
    }, []);

    return (
        <div className="rounded-lg bg-white p-6 shadow">

            <h2 className="mb-6 border-l-4 border-red-600 pl-3 text-2xl font-bold">
                Trending
            </h2>

            <div className="space-y-5">
                {trendingNews.map((news, index) => (
                    <TrendingCard
                        key={news.slug}
                        news={news}
                        index={index}
                    />
                ))}
            </div>

        </div>
    );
};

export default TrendingNews;