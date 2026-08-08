import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";
import { newsUrl, categoryUrl, countryUrl } from "../../../config/config";
import toast from "react-hot-toast";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const QUILL_MODULES = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote", "code-block"],
        ["link"],
        [{ color: [] }, { background: [] }],
        ["clean"],
    ],
};

const QUILL_FORMATS = [
    "header", "bold", "italic", "underline", "strike",
    "list", "bullet", "indent",
    "blockquote", "code-block",
    "link", "color", "background",
];

const getResponseItems = (response) => (
    Array.isArray(response.data) ? response.data : response.data?.data || []
);

const getOptionId = (option) => (
    typeof option === "string" ? option : option?._id || option?.id || ""
);

const EditNewsModal = ({ newsId, onClose, onUpdated }) => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        country: "",
        year: "",
        publishedDate: "",
        content: "",
        featuredNews: false,
        trendingNews: false,
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState("");

    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);

    /*
    |--------------------------------------------------------------------------
    | Fetch complete news data
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                setLoading(true);

                const token = localStorage.getItem("token");

                const res = await axios.get(
                    `${newsUrl.getById}/${newsId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = res.data.data;

                console.log("EDIT NEWS DATA:", data);

                /*
                | Set form values from API response
                */

                setFormData({
                    title: data.title || "",
                    category: getOptionId(data.category),
                    country: getOptionId(data.country),
                    year: data.year || "",
                    publishedDate: data.publishedDate
                        ? new Date(data.publishedDate)
                            .toISOString()
                            .slice(0, 16)
                        : "",
                    content: data.content || "",
                    featuredNews: data.featuredNews || false,
                    trendingNews: data.trendingNews || false,

                    
                });

                /*
                | Existing Cloudinary image
                */

                setThumbnailPreview(
                    data.thumbnail?.url || ""
                );
            } catch (error) {
                console.log(
                    "Error fetching news:",
                    error
                );

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to fetch news"
                );

                onClose();
            } finally {
                setLoading(false);
            }
        };

        if (newsId) {
            fetchNewsData();
        }
    }, [newsId]);

    /*
    |--------------------------------------------------------------------------
    | Fetch categories and countries
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [categoryRes, countryRes] =
                    await Promise.all([
                        axios.get(categoryUrl.getAll),
                        axios.get(countryUrl.getAll),
                    ]);

                setCategories(getResponseItems(categoryRes));
                setCountries(getResponseItems(countryRes));
            } catch (error) {
                console.log(
                    "Error fetching categories/countries:",
                    error
                );
            }
        };

        fetchOptions();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Handle input change
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {
        const { name, value, type, checked } =
            e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | Handle thumbnail
    |--------------------------------------------------------------------------
    */

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setThumbnail(file);

        setThumbnailPreview(
            URL.createObjectURL(file)
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Update news
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setUpdating(true);

            const token =
                localStorage.getItem("token");

            const form = new FormData();

            form.append(
                "title",
                formData.title
            );

            form.append(
                "category",
                formData.category
            );

            form.append(
                "country",
                formData.country
            );

            form.append(
                "year",
                formData.year
            );

            form.append(
                "publishedDate",
                formData.publishedDate
            );

            form.append(
                "content",
                formData.content
            );

            form.append(
                "featuredNews",
                formData.featuredNews
            );

            form.append(
                "trendingNews",
                formData.trendingNews
            );

            /*
            | Only send image if user selected
            | a new image.
            */

            if (thumbnail) {
                form.append(
                    "thumbnail",
                    thumbnail
                );
            }

            const res = await axios.put(
                `${newsUrl.update}/${newsId}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            toast.success(
                res.data.message ||
                "News updated successfully!"
            );

            /*
            | Refresh NewsPost table
            */

            onUpdated();

            /*
            | Close modal
            */

            onClose();
        } catch (error) {
            console.log(
                "Update error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to update news"
            );
        } finally {
            setUpdating(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="rounded-lg bg-white px-8 py-6 shadow-xl">
                    <p className="text-sm text-gray-600">
                        Loading news...
                    </p>
                </div>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Modal
    |--------------------------------------------------------------------------
    */

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Edit News
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Update news details
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* Body */}

                <form
                    onSubmit={handleSubmit}
                    className="max-h-[calc(90vh-80px)] overflow-y-auto p-6"
                >
                    <div className="space-y-6">

                        {/* Title */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-red-500"
                                required
                            />
                        </div>

                        {/* Category / Country */}

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-red-500"
                                    required
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    {categories.map(
                                        (category) => (
                                            <option
                                                key={getOptionId(category)}
                                                value={getOptionId(category)}
                                            >
                                                {category.name || category}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Country
                                </label>

                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-red-500"
                                    required
                                >
                                    <option value="">
                                        Select Country
                                    </option>

                                    {countries.map(
                                        (country) => (
                                            <option
                                                key={getOptionId(country)}
                                                value={getOptionId(country)}
                                            >
                                                {country.name || country}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Year / Date */}

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Year
                                </label>

                                <input
                                    type="number"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-red-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Published Date
                                </label>

                                <input
                                    type="datetime-local"
                                    name="publishedDate"
                                    value={
                                        formData.publishedDate
                                    }
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-red-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Content */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Content
                            </label>

                            <div className="rounded-lg border border-gray-300 focus-within:border-red-500 transition-colors">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            content: value,
                                        }))
                                    }
                                    modules={QUILL_MODULES}
                                    formats={QUILL_FORMATS}
                                    placeholder="Write your content here..."
                                    style={{ minHeight: "250px" }}
                                />
                            </div>
                        </div>

                        {/* Thumbnail */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Thumbnail
                            </label>

                            {thumbnailPreview && (
                                <div className="mb-4">
                                    <img
                                        src={
                                            thumbnailPreview
                                        }
                                        alt={
                                            formData.title
                                        }
                                        className="h-40 w-64 rounded-lg object-cover"
                                    />
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleImageChange
                                }
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                            />
                        </div>

                        {/* Featured / Trending */}

                        <div className="flex flex-wrap gap-6">

                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    name="featuredNews"
                                    checked={
                                        formData.featuredNews
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="h-4 w-4"
                                />

                                Featured News
                            </label>

                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    name="trendingNews"
                                    checked={
                                        formData.trendingNews
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="h-4 w-4"
                                />

                                Trending News
                            </label>
                        </div>
                    </div>

                    {/* Footer */}

                    <div className="mt-8 flex justify-end gap-3 border-t border-gray-200 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={updating}
                            className="rounded-lg bg-[#DC2626] px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {updating
                                ? "Updating..."
                                : "Update News"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNewsModal;