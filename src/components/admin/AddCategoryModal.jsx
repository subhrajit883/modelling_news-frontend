import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddCategoryModal = ({ isOpen, onClose, onSubmit, isSubmitting, initialData }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        setName(initialData?.name || '');
    }, [initialData, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }
        
        // Call the parent submit handler which will hit the API
        await onSubmit({ name });
        setName(''); // reset on success
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">{initialData ? 'Edit Category' : 'Add New Category'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Category Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Fashion, Beauty..."
                            className="w-full border border-gray-200 rounded p-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                            required
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-200 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-[#DC2626] text-white rounded text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center"
                        >
                            {isSubmitting ? (
                                <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                            ) : null}
                            {initialData ? 'Update Category' : 'Save Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryModal;
