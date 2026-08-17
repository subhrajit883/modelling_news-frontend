import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { newsUrl } from "../../config/config";
import NewsCard from "../components/home/NewsCard";
import FilterSidebar from "../components/home/FilterSidebar";
import TrendingNews from "../components/home/TrendingNews";
import bg from '../assets/bg.png';

function SearchedData() {
    const [searchParams] = useSearchParams();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const newsPerPage = 6;
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + news.length;

    const fetchNews = async (page = currentPage) => {
        setLoading(true);
        try {
            const params = { page };
            const search = searchParams.get("search");
            const country = searchParams.get("country");
            const year = searchParams.get("year");

            if (search) params.search = search;
            if (country) params.country = country;
            if (year) params.year = year;

            const res = await axios.get(newsUrl.getAll, { params });

            if (res.data.success) {
                const resultData = Array.isArray(res.data.data) ? res.data.data : [];
                setNews(resultData);

                const backendTotalPages = Number(res.data?.pagination?.totalPages ?? res.data?.totalPages ?? 0);
                const backendTotalItems = Number(res.data?.pagination?.totalItems ?? res.data?.totalItems ?? resultData.length);

                if (backendTotalPages > 0) {
                    setTotalPages(backendTotalPages);
                } else {
                    setTotalPages(Math.max(1, Math.ceil((backendTotalItems || resultData.length) / newsPerPage)));
                }

                setTotalItems(backendTotalItems || resultData.length);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            setNews([]);
            setTotalPages(1);
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchParams]);

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage, searchParams]);

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat pb-12 pt-6"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="mx-auto max-w-7xl px-5">
                <div className="mb-6 text-md text-gray-500 libertinus-serif-regular">
                    <Link to="/" className="hover:text-red-600">Home</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="capitalize text-red-600">Searched Results</span>
                </div>

                <div className="mb-10">
                    <h1 className="mb-3 text-4xl font-bold capitalize tracking-wide text-black playfair-display-regular">
                        Searched Results
                    </h1>
                    <p className="text-gray-600 manrope-regular tracking-wide">
                        Explore curated stories, trending updates, and headline coverage matching your search.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        <div className="mb-6 flex items-center justify-between border-b pb-4 libertinus-serif-regular">
                            <p className="text-md text-gray-600">
                                Showing {news.length > 0 ? startIndex + 1 : 0}–
                                {Math.min(endIndex, totalItems || news.length)} of {totalItems || news.length} results
                            </p>
                            {/* <select className="rounded border bg-white px-3 py-2 text-sm outline-none">
                                <option>Latest First</option>
                                <option>Oldest First</option>
                            </select> */}
                        </div>

                        {news.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {news.map((item) => (
                                    <NewsCard key={item._id} news={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-10 text-center text-gray-500">No news found matching your criteria.</div>
                        )}

                        {totalPages > 1 && (
                            <div className="mt-12 flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`flex h-10 items-center justify-center rounded border px-4 ${currentPage === 1
                                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                            : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    &laquo; Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, index) => {
                                    const page = index + 1;

                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`flex h-10 w-10 items-center justify-center rounded border ${currentPage === page
                                                    ? "border-red-600 bg-red-600 text-white"
                                                    : "bg-white hover:bg-gray-100"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`flex h-10 items-center justify-center rounded border px-4 ${currentPage === totalPages
                                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                            : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    Next &raquo;
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-8 lg:col-span-1">
                        <FilterSidebar />
                        <TrendingNews />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchedData;