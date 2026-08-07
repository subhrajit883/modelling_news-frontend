import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { categoryUrl, newsUrl } from '../../config/config';
import NewsCard from '../components/home/NewsCard';
import FilterSidebar from '../components/home/FilterSidebar';
import TrendingNews from '../components/home/TrendingNews';

function Category() {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCategoryData = async () => {
            setLoading(true);
            try {
                // Fetch category info to get the name
                const catRes = await axios.get(categoryUrl.getAll);
                const categories = Array.isArray(catRes.data?.data) ? catRes.data.data : [];
                const currentCategory = categories.find(c => c.slug === slug);
                setCategory(currentCategory || null);
                // Fetch news for this category
                const newsRes = await axios.get(newsUrl.getAll);
                const allNews = Array.isArray(newsRes.data?.data) ? newsRes.data.data : [];
                const categoryNews = allNews.filter(n =>
                    n.category && (n.category.slug === slug || (currentCategory && n.category._id === currentCategory._id))
                );
                setNews(categoryNews);
            } catch (err) {
                console.log("Error fetching category data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryData();
    }, [slug]);

    if (loading) {
        return <div className="flex h-96 items-center justify-center text-xl">Loading...</div>;
    }

    if (!category) {
        return <div className="flex h-96 items-center justify-center text-xl">Category not found</div>;
    }

    return (
        <div className="bg-gray-50 pb-12 pt-6 min-h-screen">
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
                                Showing 1–{news.length || 0} of {news.length || 0} results
                            </p>
                            <select className="rounded border bg-white px-3 py-2 text-sm outline-none">
                                <option>Latest First</option>
                                <option>Oldest First</option>
                            </select>
                        </div>

                        {news.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {news.map((item) => (
                                    <NewsCard key={item._id} news={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-10 text-center text-gray-500">No news found for this category.</div>
                        )}

                        {/* Pagination */}
                        {news.length > 0 && (
                            <div className="mt-12 flex justify-center gap-2">
                                <button className="flex h-10 w-10 items-center justify-center rounded bg-red-600 text-white">1</button>
                                <button className="flex h-10 w-10 items-center justify-center rounded border bg-white hover:bg-gray-100">2</button>
                                <button className="flex h-10 w-10 items-center justify-center rounded border bg-white hover:bg-gray-100">3</button>
                                <span className="flex h-10 w-10 items-center justify-center">...</span>
                                <button className="flex h-10 w-10 items-center justify-center rounded border bg-white hover:bg-gray-100">11</button>
                                <button className="flex h-10 items-center justify-center rounded border bg-white px-4 hover:bg-gray-100">Next &raquo;</button>
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