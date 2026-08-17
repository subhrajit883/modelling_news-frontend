import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiFileText, FiTag, FiGlobe, FiCalendar } from 'react-icons/fi';
import { newsUrl, categoryUrl, countryUrl, yearUrl } from '../../../config/config';

import StatCard from '../../components/admin/StatCard';
import DashboardTable from '../../components/admin/DashboardTable';
import AddNewsForm from '../../components/admin/AddNewsForm';
import AddCategoryModal from '../../components/admin/AddCategoryModal';
import AddCountryModal from '../../components/admin/AddCountryModal';

function Dashboard() {
    // Data State
    const [newsStats, setNewsStats] = useState({ total: 0 });
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [years, setYears] = useState([]);

    // Loading State
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmittingNews, setIsSubmittingNews] = useState(false);
    const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);
    const [isSubmittingCountry, setIsSubmittingCountry] = useState(false);

    // Modal State
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingCountry, setEditingCountry] = useState(null);

    const fetchNewsCount = async () => {
        try {
            const res = await axios.get(newsUrl.getCount);
            console.log("News count response:", res.data.totalNews);
            if (res.data.success) {
                setNewsStats({ total: res.data.totalNews });
            }
        } catch (error) {
            console.error("Error fetching news count:", error);
            toast.error("Failed to load news count");
        }
    };

    // Fetch Data
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [newsRes, catsRes, countriesRes, yearsRes] = await Promise.all([
                axios.get(newsUrl.getAll),
                axios.get(categoryUrl.getAll),
                axios.get(countryUrl.getAll),
                axios.get(yearUrl.getAll)
            ]);

            // Assuming newsRes.data is an array or contains a total count
            // Adapt according to the actual API response structure
            const newsData = newsRes.data?.data || newsRes.data || [];

            setCategories(catsRes.data?.data || catsRes.data || []);
            setCountries(countriesRes.data?.data || countriesRes.data || []);
            setYears(yearsRes.data?.data || []);
            console.log("years", yearsRes.data.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Failed to load dashboard data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchNewsCount();
    }, []);

    // Handlers
    const handleAddNews = async (formData) => {
        setIsSubmittingNews(true);
        const AuthToken = localStorage.getItem("token");
        try {
            await axios.post(newsUrl.create, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${AuthToken}`
                }
            });
            toast.success("News post created successfully!");
            fetchData(); // Refresh data
        } catch (error) {
            console.error("Error creating news post:", error);
            toast.error(error.response?.data?.message || "Failed to create news post");
        } finally {
            setIsSubmittingNews(false);
        }
    };

    const handleAddCategory = async (payload) => {
        setIsSubmittingCategory(true);
        const AuthToken = localStorage.getItem("token");
        try {
            await axios.post(categoryUrl.create, payload, {
                headers: {
                    'Authorization': `Bearer ${AuthToken}`
                }
            });
            toast.success("Category added successfully!");
            setIsCategoryModalOpen(false);
            fetchData(); // Refresh lists
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error(error.response?.data?.message || "Failed to add category");
        } finally {
            setIsSubmittingCategory(false);
        }
    };

    const handleEditCategory = async (payload) => {
        setIsSubmittingCategory(true);
        const AuthToken = localStorage.getItem("token");
        try {
            await axios.put(`${categoryUrl.update}/${editingCategory._id}`, payload, {
                headers: { Authorization: `Bearer ${AuthToken}` }
            });
            toast.success("Category updated successfully!");
            setEditingCategory(null);
            setIsCategoryModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error updating category:", error);
            toast.error(error.response?.data?.message || "Failed to update category");
        } finally {
            setIsSubmittingCategory(false);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        const isConfirmed = window.confirm(
            "Sure you want to delete this category?"
        );

        if (!isConfirmed) {
            return;
        }

        const AuthToken = localStorage.getItem("token");

        try {
            console.log("Deleting category with ID:", categoryId);

            await axios.delete(`${categoryUrl.delete}/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${AuthToken}`,
                },
            });

            toast.success("Category deleted successfully!");

            fetchData();
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error(
                error.response?.data?.message ||
                "Failed to delete category"
            );
        }
    };

    const handleAddCountry = async (payload) => {
        setIsSubmittingCountry(true);
        const AuthToken = localStorage.getItem("token");
        try {
            await axios.post(countryUrl.create, payload, {
                headers: {
                    'Authorization': `Bearer ${AuthToken}`
                }
            });
            toast.success("Country added successfully!");
            setIsCountryModalOpen(false);
            fetchData(); // Refresh lists
        } catch (error) {
            console.error("Error adding country:", error);
            toast.error(error.response?.data?.message || "Failed to add country");
        } finally {
            setIsSubmittingCountry(false);
        }
    };

    const handleEditCountry = async (payload) => {
        setIsSubmittingCountry(true);
        const AuthToken = localStorage.getItem("token");
        try {
            await axios.put(`${countryUrl.update}/${editingCountry._id}`, payload, {
                headers: { Authorization: `Bearer ${AuthToken}` }
            });
            toast.success("Country updated successfully!");
            setEditingCountry(null);
            setIsCountryModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error updating country:", error);
            toast.error(error.response?.data?.message || "Failed to update country");
        } finally {
            setIsSubmittingCountry(false);
        }
    };

    const handleDeleteCountry = async (countryId) => {
        const isConfirmed = window.confirm(
            "Sure you want to delete this country?"
        );

        if (!isConfirmed) {
            return;
        }

        try {
            const AuthToken = localStorage.getItem("token");
            await axios.delete(`${countryUrl.delete}/${countryId}`, {
                headers: {
                    Authorization: `Bearer ${AuthToken}`,
                },
            });
            toast.success("Country deleted successfully!");
            fetchData();
        } catch (error) {
            console.error("Error deleting country:", error);
            toast.error(
                error.response?.data?.message ||
                "Failed to delete country"
            );
        }
    }

    // Table Columns Config
    const categoryColumns = [
        { header: 'Name', accessor: 'name' },
    ];

    const countryColumns = [
        { header: 'Name', accessor: 'name' },
    ];

    if (isLoading) {
        return <div className="flex h-full items-center justify-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626]"></div></div>;
    }

    return (
        <div className="space-y-6">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Posts"
                    value={newsStats.total}
                    icon={<FiFileText size={24} />}
                    actionText="View all posts"
                />
                <StatCard
                    label="Categories"
                    value={categories.length}
                    icon={<FiTag size={24} />}
                    actionText="Manage categories"
                />
                <StatCard
                    label="Countries"
                    value={countries.length}
                    icon={<FiGlobe size={24} />}
                    actionText="Manage countries"
                />
                <StatCard
                    label="Years"
                    value={years.length}
                    icon={<FiCalendar size={24} />}
                    actionText="Manage years"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Left Column (Tables) */}
                <div className="xl:col-span-2 space-y-6">
                    <DashboardTable
                        title="Categories"
                        columns={categoryColumns}
                        data={categories.slice(0, 10)} // Show top 10 for dashboard
                        addText="Add Category"
                        onAdd={() => setIsCategoryModalOpen(true)}
                        onEdit={(row) => { setEditingCategory(row); setIsCategoryModalOpen(true); }}
                        onDelete={(row) => handleDeleteCategory(row._id)}
                    />

                    <DashboardTable
                        title="Countries"
                        columns={countryColumns}
                        data={countries.slice(0, 10)} // Show top 5 for dashboard
                        addText="Add Country"
                        onAdd={() => setIsCountryModalOpen(true)}
                        onEdit={(row) => { setEditingCountry(row); setIsCountryModalOpen(true); }}
                        onDelete={(row) => handleDeleteCountry(row._id)}
                    />
                </div>

                {/* Right Column (Form) */}
                <div className="xl:col-span-2">
                    <AddNewsForm
                        categories={categories}
                        countries={countries}
                        years={years}
                        onSubmit={handleAddNews}
                        isSubmitting={isSubmittingNews}
                    />
                </div>
            </div>

            {/* Modals */}
            <AddCategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }}
                onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
                isSubmitting={isSubmittingCategory}
                initialData={editingCategory}
            />

            <AddCountryModal
                isOpen={isCountryModalOpen}
                onClose={() => { setIsCountryModalOpen(false); setEditingCountry(null); }}
                onSubmit={editingCountry ? handleEditCountry : handleAddCountry}
                isSubmitting={isSubmittingCountry}
                initialData={editingCountry}
            />
        </div>
    );
}

export default Dashboard;