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
            setNewsStats({ total: Array.isArray(newsData) ? newsData.length : (newsData.total || 0) });

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
                    'Content-Type': 'multipart/form-data',
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

    const handleAddCountry = async (payload) => {
        setIsSubmittingCountry(true);
        const AuthToken = localStorage.getItem("token");
        try {
            await axios.post(countryUrl.create, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

    // Table Columns Config
    const categoryColumns = [
        // { header: '#', render: (_, index) => index + 1 },
        { header: 'Name', accessor: 'name' },
        // { header: 'Slug', accessor: 'slug' }
    ];

    const countryColumns = [
        // { header: '#', render: (_, index) => index + 1 },
        { header: 'Name', accessor: 'name' },
        // { header: 'Code', accessor: 'code', render: (row) => row.code || 'N/A' } // Fallback if no code
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
                        data={categories.slice(0, 5)} // Show top 5 for dashboard
                        addText="Add Category"
                        onAdd={() => setIsCategoryModalOpen(true)}
                        onEdit={(row) => console.log('Edit Category', row)}
                        onDelete={(row) => console.log('Delete Category', row)}
                    />

                    <DashboardTable
                        title="Countries"
                        columns={countryColumns}
                        data={countries.slice(0, 5)} // Show top 5 for dashboard
                        addText="Add Country"
                        onAdd={() => setIsCountryModalOpen(true)}
                        onEdit={(row) => console.log('Edit Country', row)}
                        onDelete={(row) => console.log('Delete Country', row)}
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
                onClose={() => setIsCategoryModalOpen(false)}
                onSubmit={handleAddCategory}
                isSubmitting={isSubmittingCategory}
            />

            <AddCountryModal
                isOpen={isCountryModalOpen}
                onClose={() => setIsCountryModalOpen(false)}
                onSubmit={handleAddCountry}
                isSubmitting={isSubmittingCountry}
            />
        </div>
    );
}

export default Dashboard;