import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";

import {
    FiClock,
    FiMapPin,
    FiCalendar,
    FiChevronRight,
} from "react-icons/fi";

import { newsUrl } from "../../config/config";
import FilterSidebar from "../components/home/FilterSidebar";
import TrendingNews from "../components/home/TrendingNews";

const NewsDetails = () => {

    const { slug } = useParams();

    const [news, setNews] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {

        try {

            const url = newsUrl.getBySlug.replace(
                ":slug",
                slug
            );

            const res = await axios.get(url);

            if (res.data.success) {
                setNews(res.data.data);
            }

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchNews();

    }, [slug]);

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
            </div>

        );

    }

    if (!news) {

        return (

            <div className="flex min-h-screen flex-col items-center justify-center">

                <h1 className="text-5xl font-black">

                    News Not Found

                </h1>

                <Link
                    to="/"
                    className="mt-8 bg-red-600 px-8 py-3 text-white"
                >
                    Go Home
                </Link>

            </div>

        );

    }

    return (

        <div className="bg-white">
            {/* Breadcrumb */}

            <div className="border-b border-gray-200">

                <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-5 text-md text-gray-500 libertinus-serif-regular">

                    <Link
                        to="/"
                        className="transition hover:text-red-600"
                    >
                        Home
                    </Link>

                    <FiChevronRight />

                    {news.category && (
                        <>
                            <Link
                                to={`/category/${news.category.slug}`}
                                className="transition hover:text-red-600 "
                            >
                                {news.category.name}
                            </Link>

                            <FiChevronRight />
                        </>
                    )}


                    <span className="line-clamp-1 capitalize text-red-600">
                        {news.title}
                    </span>

                </div>

            </div>

            {/* Hero */}

            <section className="mx-auto max-w-5xl px-5 py-5">

                {news.category && (

                    <span className="rounded bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white libertinus-serif-bold">
                        {news.category.name}
                    </span>

                )}

                <h1 className="mt-8 text-3xl font-black leading-tight text-gray-900 md:text-5xl playfair-display-regular ">
                    {news.title}
                </h1>

                <div className="mt-8 flex flex-wrap items-center gap-6 border-b border-gray-200 pb-8 text-sm text-gray-600">

                    {news.publishedDate && (

                        <div className="flex items-center gap-2">

                            <FiCalendar className="text-red-600" />

                            {new Date(news.publishedDate).toLocaleDateString(
                                "en-US",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}

                        </div>
                    )}

                    {news.country && (

                        <div className="flex items-center gap-2">

                            <FiMapPin className="text-red-600" />

                            {news.country.name}

                        </div>

                    )}
                    {/* 
                    <div className="flex items-center gap-2">

                        <FiClock className="text-red-600" />

                        5 min read

                    </div> */}

                </div>

            </section>

            {/* Hero Image */}

            <section className="mx-auto max-w-7xl px-5">

                {news.thumbnail?.url ? (

                    <img
                        src={news.thumbnail.url}
                        alt={news.title}
                        className="h-75 w-full rounded-xl object-contain md:h-112.5"
                    />

                ) : (

                    <div className="flex h-162.5 items-center justify-center rounded-xl bg-gray-100">

                        <span className="text-gray-400">

                            No Image Available

                        </span>

                    </div>

                )}

            </section>
            {/* ===================== ARTICLE ===================== */}

            <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 py-16 lg:grid-cols-12">

                {/* Main Content */}

                <div className="min-w-0 lg:col-span-8">

                    <div
                        className="
                        article-content manrope-regular text-base leading-relaxed tracking-wider text-gray-600
                    "
                        dangerouslySetInnerHTML={{
                            __html: news.content,
                        }}
                    />

                    {/* Tags */}

                    {/* <div className="mt-5 border-t pt-2">

                        <h3 className="mb-5 text-xl font-bold">

                            Tags

                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {news.category && (

                                <Link
                                    to={`/category/${news.category.slug}`}
                                    className="rounded-full border border-gray-300 px-5 py-2 text-sm transition hover:bg-red-600 hover:text-white"
                                >
                                    {news.category.name}
                                </Link>

                            )}

                            {news.country && (

                                <span className="rounded-full border border-gray-300 px-5 py-2 text-sm">

                                    {news.country.name}

                                </span>

                            )}

                            {news.year && (

                                <span className="rounded-full border border-gray-300 px-5 py-2 text-sm">

                                    {news.year}

                                </span>

                            )}

                        </div>

                    </div> */}

                    {/* Previous / Next */}
                    {/* 
                    <div className="mt-16 grid gap-8 border-t pt-10 md:grid-cols-2">

                        <div>

                            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">

                                Previous Article

                            </p>

                            <h4 className="mt-3 text-xl font-bold leading-8 transition hover:text-red-600">

                                Previous article title will appear here

                            </h4>

                        </div>

                        <div className="text-left md:text-right">

                            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">

                                Next Article

                            </p>

                            <h4 className="mt-3 text-xl font-bold leading-8 transition hover:text-red-600">

                                Next article title will appear here

                            </h4>

                        </div>

                    </div> */}

                </div>

                {/* Sidebar */}

                <aside className="min-w-0 lg:col-span-4">

                    {/* Advertisement */}

                    {/* <div className="rounded-xl bg-gray-100 p-8 text-center">

                        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">

                            Advertisement

                        </p>

                        <div className="mt-6 flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">

                            300 × 600

                        </div>

                    </div> */}

                    {/* Trending */}

                    {/* <div className="mt-12">

                        <h3 className="mb-8 border-l-4 border-red-600 pl-4 text-2xl font-black">

                            Trending News

                        </h3>

                        {[1, 2, 3, 4].map((item) => (

                            <div
                                key={item}
                                className="mb-8 flex gap-4 border-b pb-6"
                            >

                                <div className="h-24 w-28 flex-shrink-0 rounded-lg bg-gray-200"></div>

                                <div>

                                    <p className="text-xs uppercase tracking-widest text-red-600">
                                        Fashion
                                    </p>

                                    <h4 className="mt-2 cursor-pointer text-lg font-bold leading-7 transition hover:text-red-600">
                                        Trending article title goes here
                                    </h4>

                                    <p className="mt-2 text-sm text-gray-500">

                                        July 30, 2026

                                    </p>

                                </div>

                            </div>

                        ))}

                    </div> */}

                    {/* Newsletter */}

                    {/* <div className="mt-14 rounded-xl bg-black p-8 text-white">

                        <h3 className="text-3xl font-black">

                            Stay Updated

                        </h3>

                        <p className="mt-4 text-gray-300">

                            Subscribe to receive the latest modelling,
                            fashion and beauty news.

                        </p>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="mt-8 w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none placeholder:text-gray-400"
                        />

                        <button className="mt-5 w-full rounded-lg bg-red-600 py-3 font-semibold uppercase tracking-wide transition hover:bg-red-700">

                            Subscribe

                        </button>

                    </div> */}
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

                </aside>

            </section>

        </div>

    );

};

export default NewsDetails;
