import { useEffect, useState } from "react";
import { newsUrl } from "../../../config/config";
import NewsCard from "./NewsCard";
import TrendingNews from "./TrendingNews";
import axios from "axios";


const LatestNews = () => {
    const [news, setNews] = useState([])
    const [categories, setCategories] = useState([]);
    const getLatestNews = async () => {
        try {
            const res = await axios.get(newsUrl.recent);
            setNews(res.data.data);
            console.log("latest", res.data.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getLatestNews()

    }, [])
    return (
        <section className="mx-auto max-w-7xl px-4 pb-10">

            <div className="grid gap-8 lg:grid-cols-12">

                <div className="lg:col-span-8">

                    <h2 className="mb-6 border-l-4 border-red-600 pl-3 text-3xl  libertinus-serif-semibold" >
                        Latest News
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        {news.slice(0, 4).map((item) => (
                            <NewsCard
                                key={item._id}
                                news={item}
                            />
                        ))}
                    </div>


                </div>

                <div className="lg:col-span-4">
                    <TrendingNews />
                </div>

            </div>

        </section>
    );
};

export default LatestNews;