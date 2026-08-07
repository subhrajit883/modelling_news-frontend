import axios from "axios";
import { useEffect, useState } from "react";
import { categoryUrl, newsUrl } from "../../../config/config";

const FeaturedNews = () => {
    const [news, setNews] = useState([])
    const [categories, setCategories] = useState([])
    const FeaturedNews = async (req, res) => {
        try {
            const res = await axios.get(newsUrl.getAll)
            setNews(res.data.data);
            console.log(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }


    const GetCatWise = async (categoryId) => {
        console.log("inside cat");
        try {
            const res = await axios.get(`${newsUrl.getCatWise}/${categoryId}`);
            // setNews(res.data.data);
            console.log("cat wise data", res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get(categoryUrl.getAll);
            const categoriesData = res.data.data;
            setCategories(categoriesData);
            console.log("cat", categoriesData);
            
            if (categoriesData && categoriesData.length > 0) {
                const categoryIds = categoriesData.map(cat => cat._id);
                categoryIds.forEach(id => {
                    GetCatWise(id);
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        FeaturedNews();
        fetchCategories();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
            {/* Featured News */}
            <div className="lg:col-span-2 ">
                {news.length > 0 ? (
                    <div className="group relative h-130 overflow-hidden rounded hover:text-red-600 hover:text-2xl duration-500">
                        <img
                            src={news[0].thumbnail.url}
                            alt={news[0].title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-103 group-hover:blur-sm"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

                        <span className="absolute left-5 top-5 bg-red-600 px-4 py-2 text-xs font-bold text-white ">
                            FEATURED
                        </span>

                        <div className="absolute bottom-8 left-8 right-8 text-white transition-all duration-500 group-hover:text-red-600 group-hover:scale-105 origin-bottom-left z-10">
                            <p className="mb-2 text-sm uppercase tracking-wider">
                                {news[0].category.name}
                            </p>

                            <h2 className="mb-4 text-4xl font-bold leading-tight playfair-display-regular">
                                {news[0].title}
                            </h2>

                            <div
                                className="prose prose-invert max-w-none group-hover:text-red-600 transition-colors duration-500"
                                dangerouslySetInnerHTML={{ __html: news[0].content }}
                            />
                            <div className="text-sm text-gray-300 group-hover:text-red-600 transition-colors duration-500">
                                {new Date(news[0].publishedDate).toLocaleDateString("en-GB")}
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
                        className="group relative h-63.25 overflow-hidden rounded hover:text-red-600 hover:text-2xl duration-500"
                    >
                        <img
                            src={item.thumbnail.url}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-103 group-hover:blur-sm"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

                        <div className="absolute bottom-5 left-5 right-5 text-white transition-all duration-500 group-hover:text-red-600 group-hover:scale-105 origin-bottom-left z-10 ">
                            <p className="mb-2 text-xs uppercase ">
                                {item.category.name}
                            </p>

                            <h3 className="mb-2 line-clamp-2 text-2xl font-bold leading-tight playfair-display-regular">
                                {item.title}
                            </h3>

                            <p className="text-sm">
                                {new Date(item.publishedDate).toLocaleDateString("en-GB")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedNews;