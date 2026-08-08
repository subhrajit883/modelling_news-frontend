import { useEffect, useState } from "react";
import { newsUrl } from "../../../config/config";
import TrendingCard from "./TrendingCard";
import axios from "axios";


const TrendingNews = () => {

    const [trendingNews, setTrendingNews] = useState([]);

    const FetchTrendingNews = async () => {
        const res = await axios.get(newsUrl.getTrending);
        console.log("trending", res.data.data);
        const trendingNews = res.data.data;
        setTrendingNews(trendingNews);
    }

    useEffect(() => {
        FetchTrendingNews();
    }, []);

    return (
        <div className="rounded-lg bg-white p-6 shadow">

            <h2 className="mb-6 border-l-4 border-red-600 pl-3 text-2xl font-semibold  libertinus-serif-semibold">
                Trending
            </h2>

            <div className="space-y-5">
                {trendingNews.slice(0, 5).map((news, index) => (
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