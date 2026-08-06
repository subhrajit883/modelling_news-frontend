import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddNewsForm = ({ categories, countries, years, onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
        title: '',
        publishedDate: '',
        content: '',
        year: '',
        category: '',
        country: '',
        thumbnail: null
    });
    console.log("years1", years);
    console.log("countries", countries);
    console.log("categories", categories);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, thumbnail: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.title || !formData.publishedDate || !formData.content ||
            !formData.year || !formData.category || !formData.country || !formData.thumbnail) {
            toast.error("Please fill all required fields and upload a thumbnail.");
            return;
        }


        const submitData = new FormData();
        submitData.append('title', formData.title);
        const dateObj = new Date(formData.publishedDate);
        submitData.append('publishedDate', dateObj.toISOString());

        submitData.append('content', `<p>${formData.content}</p>`);
        submitData.append('year', formData.year);
        submitData.append('category', formData.category);
        submitData.append('country', formData.country);
        submitData.append('thumbnail', formData.thumbnail);

        await onSubmit(submitData);

    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Add News Post</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter post title"
                        className="w-full border border-gray-200 rounded p-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                        required
                    />
                </div>

                {/* Published Date */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Published Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        name="publishedDate"
                        value={formData.publishedDate}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded p-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                        required
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Content <span className="text-red-500">*</span>
                    </label>
                    {/* Basic Rich Text Toolbar Mockup */}
                    <div className="border border-gray-200 rounded overflow-hidden focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500 transition-colors">
                        <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center space-x-2 text-gray-600">
                            <select className="bg-transparent text-sm outline-none cursor-pointer">
                                <option>Paragraph</option>
                                <option>Heading 1</option>
                                <option>Heading 2</option>
                            </select>
                            <span className="w-px h-4 bg-gray-300 mx-2"></span>
                            <button type="button" className="p-1 hover:bg-gray-200 rounded font-serif font-bold">B</button>
                            <button type="button" className="p-1 hover:bg-gray-200 rounded font-serif italic">I</button>
                            <button type="button" className="p-1 hover:bg-gray-200 rounded font-serif underline">U</button>
                            <span className="w-px h-4 bg-gray-300 mx-2"></span>
                            <button type="button" className="p-1 hover:bg-gray-200 rounded text-xs">&bull;&bull;&bull;</button>
                        </div>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your content here..."
                            rows="6"
                            className="w-full p-3 text-sm outline-none resize-y"
                            required
                        ></textarea>
                    </div>
                </div>

                {/* Grid for Year and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Year <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded p-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors bg-white"
                            required
                        >
                            <option value="">Select Year</option>
                            {years.map(y => (
                                <option key={y._id || y.year} value={y._id}>{y}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded p-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors bg-white"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded p-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors bg-white"
                        required
                    >
                        <option value="">Select Country</option>
                        {countries.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Thumbnail <span className="text-red-500">*</span>
                    </label>

                    <div className="mt-1 border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center relative hover:bg-gray-100 transition-colors group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            required
                        />
                        {previewUrl ? (
                            <div className="relative w-full h-32 flex justify-center">
                                <img src={previewUrl} alt="Preview" className="h-full object-contain rounded" />
                            </div>
                        ) : (
                            <>
                                <FiUploadCloud className="text-4xl text-gray-400 mb-2 group-hover:text-red-500 transition-colors" />
                                <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                                <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP up to 5MB</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        className="px-5 py-2 border border-gray-200 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2 bg-[#DC2626] text-white rounded text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                    >
                        {isSubmitting ? (
                            <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                        ) : null}
                        Publish Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewsForm;
