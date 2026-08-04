import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { newsUrl } from "../../config/config";
import NewsCard from "../components/home/NewsCard";
import FilterSidebar from "../components/home/FilterSidebar";

function SearchedData() {
    const [searchParams] = useSearchParams();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const params = {};
            const search = searchParams.get("search");
            const country = searchParams.get("country");
            const year = searchParams.get("year");

            if (search) params.search = search;
            if (country) params.country = country;
            if (year) params.year = year;

            const res = await axios.get(newsUrl.getAll, { params });
            if (res.data.success) {
                setNews(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [searchParams]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Search Results</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <div className="lg:col-span-1">
                    <FilterSidebar />
                </div>

                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <p className="text-xl text-gray-500">Loading...</p>
                        </div>
                    ) : news.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {news.map((item) => (
                                <NewsCard key={item._id} news={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-64 items-center justify-center rounded bg-gray-50">
                            <p className="text-xl text-gray-500">No news found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchedData;