import axios from "axios";
import { useEffect, useState } from "react";
import { newsUrl } from "../../../config/config";
const FeaturedNews = () => {
    const [news, setNews] = useState([])

    const FeaturedNews = async (req, res) => {
        try {
            const res = await axios.get(newsUrl.getAll)
            setNews(res.data.data);
            console.log(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        FeaturedNews()
    }, [])

    return (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
            {/* Featured News */}
            <div className="lg:col-span-2">
                {news.length > 0 ? (
                    <div className="group relative h-130 overflow-hidden rounded">
                        <img
                            src={news[0].thumbnail.url}
                            alt={news[0].title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                        <span className="absolute left-5 top-5 bg-red-600 px-4 py-2 text-xs font-bold text-white">
                            FEATURED
                        </span>

                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <p className="mb-2 text-sm uppercase tracking-wider">
                                {news[0].category.name}
                            </p>

                            <h2 className="mb-4 text-4xl font-bold leading-tight">
                                {news[0].title}
                            </h2>

                            <div
                                className="prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: news[0].content }}
                            />
                            <div className="text-sm text-gray-300">
                                {news[0].publishedDate}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-130 items-center justify-center rounded bg-gray-100">
                        No Featured News
                    </div>
                )}
            </div>

            {/* Side Cards */}
            <div className="space-y-3">
                {news.slice(1, 3).map((item) => (
                    <div
                        key={item._id}
                        className="group relative h-63.25 overflow-hidden rounded"
                    >
                        <img
                            src={item.thumbnail.url}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                        <div className="absolute bottom-5 left-5 right-5 text-white">
                            <p className="mb-2 text-xs uppercase">
                                {item.category.name}
                            </p>

                            <h3 className="mb-2 line-clamp-2 text-2xl font-bold leading-tight">
                                {item.title}
                            </h3>

                            <p className="text-sm">
                                {item.publishedDate}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedNews;