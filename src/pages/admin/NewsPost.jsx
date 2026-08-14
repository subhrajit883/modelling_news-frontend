
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { newsUrl } from "../../../config/config";
import { FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";
import EditNewsModal from "./EditNewsModal";
import { FaArrowLeft } from "react-icons/fa";

function NewsPost() {
    const navigate = useNavigate();

    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalNews, setTotalNews] = useState(0);
    const [loading, setLoading] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedNewsId, setSelectedNewsId] = useState(null);

    const fetchNews = async (page = 1) => {
        try {
            setLoading(true);

            const res = await axios.get(newsUrl.getAll, {
                params: {
                    page,   
                    limit: 10, // Adjust the limit as needed
                },
            });

            const data = res.data;

            setNews(data.data || []);
            setCurrentPage(data.currentPage || 1);
            setTotalPages(data.totalPages || 1);
            setTotalNews(data.total || 0);
        } catch (err) {
            console.log("Error fetching news:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        setSelectedNewsId(id);
        setShowEditModal(true);
    };
    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this news?"
        );
        console.log(id);

        if (!confirmDelete) return;

        try {
            const AuthToken = localStorage.getItem("token");
            // Replace this with your actual delete API
            await axios.delete(`${newsUrl.delete}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${AuthToken}`
                }
            });
            toast.success("News deleted successfully!");
            // Refresh current page
            fetchNews(currentPage);
        } catch (err) {
            toast.error("Error deleting news:" + err?.data?.message);
        }
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const truncateText = (text, length = 60) => {
        if (!text) return "-";

        const plainText = text.replace(/<[^>]*>/g, "");

        if (plainText.length <= length) {
            return plainText;
        }

        return `${plainText.substring(0, length)}...`;
    };

    return (
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">
                        All News
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Total {totalNews} news articles
                    </p>
                </div>

                <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center cursor-pointer rounded bg-[#DC2626] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                    <FaArrowLeft /> Back to Dashboard
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                            <th className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Image
                            </th>

                            <th className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Title
                            </th>

                            <th className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Category
                            </th>

                            <th className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Country
                            </th>

                            <th className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Year
                            </th>

                            <th className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Published Date
                            </th>

                            <th className="whitespace-nowrap p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Description
                            </th>

                            <th className="whitespace-nowrap p-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="p-10 text-center text-sm text-gray-500"
                                >
                                    Loading news...
                                </td>
                            </tr>
                        ) : news.length > 0 ? (
                            news.map((row) => (
                                <tr
                                    key={row._id}
                                    className="transition-colors hover:bg-gray-50"
                                >
                                    {/* Image */}
                                    <td className="p-4">
                                        {row.thumbnail?.url ? (
                                            <img
                                                src={row.thumbnail.url}
                                                alt={row.title}
                                                className="h-14 w-20 rounded object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-14 w-20 items-center justify-center rounded bg-gray-100 text-xs text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                    </td>

                                    {/* Title */}
                                    <td className="max-w-55 p-4">
                                        <p className="line-clamp-2 text-sm font-semibold text-gray-800">
                                            {row.title}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            /{row.slug}
                                        </p>
                                    </td>

                                    {/* Category */}
                                    <td className="p-4">
                                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                                            {row.category?.name || "-"}
                                        </span>
                                    </td>

                                    {/* Country */}
                                    <td className="p-4 text-sm text-gray-700">
                                        {row.country?.name || "-"}
                                    </td>

                                    {/* Year */}
                                    <td className="p-4 text-sm text-gray-700">
                                        {row.year || "-"}
                                    </td>

                                    {/* Published Date */}
                                    <td className="whitespace-nowrap p-4 text-sm text-gray-700">
                                        {formatDate(row.publishedDate)}
                                    </td>

                                    {/* Description */}
                                    <td className="max-w-62.5 p-4 text-sm text-gray-500">
                                        <div
                                            className="line-clamp-3 prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: row.content,
                                            }}
                                        />
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(row._id)}
                                                title="Edit"
                                                className="rounded border border-gray-200 p-2 text-gray-500 transition-colors hover:border-blue-500 hover:text-blue-600"
                                            >
                                                <FiEdit2 size={15} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(row._id)
                                                }
                                                title="Delete"
                                                className="rounded border border-gray-200 p-2 text-gray-500 transition-colors hover:border-red-500 hover:text-red-600"
                                            >
                                                <FiTrash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="p-10 text-center text-sm text-gray-500"
                                >
                                    No news available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                        Page{" "}
                        <span className="font-medium text-gray-800">
                            {currentPage}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-800">
                            {totalPages}
                        </span>
                    </p>

                    <div className="flex items-center gap-2">
                        {/* Previous */}
                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((prev) => prev - 1)
                            }
                            className="flex items-center gap-1 rounded border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <FiChevronLeft size={16} />
                            Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="hidden items-center gap-1 sm:flex">
                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`h-9 min-w-9 rounded px-3 text-sm font-medium transition-colors ${currentPage === page
                                        ? "bg-[#DC2626] text-white"
                                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        {/* Next */}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((prev) => prev + 1)
                            }
                            className="flex items-center gap-1 rounded border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                            <FiChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
            {showEditModal && selectedNewsId && (
                <EditNewsModal
                    newsId={selectedNewsId}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedNewsId(null);
                    }}
                    onUpdated={() => {
                        fetchNews(currentPage);
                    }}
                />
            )}

        </div>
    );
}

export default NewsPost;
