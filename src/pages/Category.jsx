import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { categoryUrl, newsUrl } from '../../config/config';
import NewsCard from '../components/home/NewsCard';
import FilterSidebar from '../components/home/FilterSidebar';
import TrendingNews from '../components/home/TrendingNews';
import bg from '../assets/bg.png';
function Category() {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const newsPerPage = 6;
    const totalPages = Math.ceil(news.length / newsPerPage);
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    const currentNews = news.slice(startIndex, endIndex);

    const fetchCategoryData = async () => {
        setLoading(true);
        try {
            // Fetch category info to get the name and id
            const catRes = await axios.get(categoryUrl.getAll);
            const categories = Array.isArray(catRes.data?.data) ? catRes.data.data : [];
            const currentCategory = categories.find(c => c.slug === slug);
            setCategory(currentCategory || null);

            // If we have the category id, call the category-wise endpoint
            if (currentCategory && currentCategory._id) {
                
                try {
                    const catNewsRes = await axios.get(`${newsUrl.getCatWise}/${currentCategory._id}`);
                    const categoryNews = Array.isArray(catNewsRes.data?.data) ? catNewsRes.data.data : [];
                    setNews(categoryNews);
                    console.log('categoryNews (from categorywise API)', categoryNews);
                } catch (err) {
                    console.log('Error fetching category-wise news, falling back to all-news filter:', err);
                    // fallback to fetching all news and filtering by slug
                    const newsRes = await axios.get(newsUrl.getAll);
                    const allNews = Array.isArray(newsRes.data?.data) ? newsRes.data.data : [];
                    const categoryNews = allNews.filter(n => n.category && n.category.slug === slug);
                    setNews(categoryNews);
                }
            } else {
                // No category id found — fallback to fetching all news and filtering by slug
                const newsRes = await axios.get(newsUrl.getAll);
                const allNews = Array.isArray(newsRes.data?.data) ? newsRes.data.data : [];
                const categoryNews = allNews.filter(n => n.category && n.category.slug === slug);
                setNews(categoryNews);
            }
        } catch (err) {
            console.log("Error fetching category data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        fetchCategoryData();
    }, [slug]);

    if (loading) {
        return <div className="flex h-96 items-center justify-center text-xl">Loading...</div>;
    }

    if (!category) {
        return <div className="flex h-96 items-center justify-center text-xl">Category not found</div>;
    }

    return (
        <div className=" pb-12 pt-6 min-h-screen min-h-screen bg-cover bg-center bg-no-repeat pb-12 pt-6"
            style={{ backgroundImage: `url(${bg})` }}
        >

            <div className="mx-auto max-w-7xl px-5">
                {/* Breadcrumb */}
                <div className="mb-6 text-md text-gray-500 libertinus-serif-regular">
                    <Link to="/" className="hover:text-red-600">Home</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="capitalize text-red-600">{category.name}</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <h1 className="mb-3 text-4xl font-bold uppercase tracking-wide text-black  playfair-display-regular">
                        {category.name}
                    </h1>
                    <p className="text-gray-600 manrope-regular tracking-wide">
                        Get the latest {category.name.toLowerCase()} news, trend updates, designer collections, street style and editorials from around the world.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="mb-6 flex items-center justify-between border-b pb-4 libertinus-serif-regular">
                            <p className="text-md text-gray-600">
                                Showing {news.length > 0 ? startIndex + 1 : 0}–
                                {Math.min(endIndex, news.length)} of {news.length} results
                            </p>
                            {/* <select className="rounded border bg-white px-3 py-2 text-sm outline-none">
                                <option>Latest First</option>
                                <option>Oldest First</option>
                            </select> */}
                        </div>

                        {news.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {currentNews.map((item) => (
                                    <NewsCard key={item._id} news={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-10 text-center text-gray-500">No news found for this category.</div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex flex-wrap justify-center gap-2">

                                {/* Previous */}
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                                    }
                                    disabled={currentPage === 1}
                                    className={`flex h-10 items-center justify-center rounded border px-4 ${currentPage === 1
                                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                            : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    &laquo; Prev
                                </button>

                                {/* Page Numbers */}
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

                                {/* Next */}
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
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

                    {/* Sidebar */}
                    <div className="space-y-8 lg:col-span-1">
                        <FilterSidebar />

                        {/* <div className="rounded bg-white p-6 shadow">
                            <h2 className="mb-4 border-b pb-3 text-lg font-bold uppercase">Search News</h2>
                            <div className="flex">
                                <input type="text" placeholder="Search news..." className="w-full rounded-l border border-r-0 p-3 outline-none" />
                                <button className="flex items-center justify-center rounded-r bg-black px-4 text-white hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div> */}

                        <TrendingNews />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;