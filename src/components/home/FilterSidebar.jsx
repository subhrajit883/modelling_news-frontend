import { categoryUrl } from "../../../config/config";
import Button from "../common/Button";
import { useState, useEffect } from "react";
import { countryUrl } from "../../../config/config";
import { yearUrl } from "../../../config/config";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const FilterSidebar = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const currentSearch = searchParams.get('search') || '';

    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [years, setYears] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
    const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || '');

    const fetchCategories = async () => {
        try {
            const res = await axios.get(categoryUrl.getAll);
            setCategories(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCountry = async () => {
        try {
            const res = await axios.get(countryUrl.getAll);
            setCountries(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchYear = async () => {
        try {
            const res = await axios.get(yearUrl.getAll);
            console.log(res.data.data);
            setYears(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchCountry();
        fetchYear();
    }, []);

    const handleApplyFilters = () => {
        const params = new URLSearchParams();
        if (currentSearch) params.set('search', currentSearch);
        if (selectedCountry) params.set('country', selectedCountry);
        if (selectedYear) params.set('year', selectedYear);

        navigate(`/search?${params.toString()}`);
    };

    return (

        <div className="rounded md:p-6 p-3 mt-5 md:mt-2">

            <h2 className="md:mb-6 mb-3 border-b md:pb-3 pb-1 text-2xl libertinus-serif-semibold">
                Filter News
            </h2>

            <div className="space-y-5">

                <div>
                    <label className="mb-2 block font-semibold ">
                        Country
                    </label>

                    <select
                        className="w-full rounded border md:p-3 p-2 text-gray-500"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                        <option value="">All Countries</option>
                        {countries.map((country) => (
                            <option key={country._id} value={country._id}>{country.name}</option>
                        ))}
                    </select>

                </div>
                <div>

                    <label className="mb-2 block font-semibold">
                        Year
                    </label>

                    <select
                        className="w-full rounded border p-2 md:p-3 text-gray-500"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">All Years</option>
                        {
                            years.map((year) => (
                                <option key={year._id} value={year}>{year}</option>
                            ))
                        }
                    </select>

                </div>

                {/* <div>

                    <label className="mb-2 block font-semibold">
                        Category
                    </label>

                    <select className="w-full rounded border p-3 text-black">
                        {
                            categories.map((category) => (
                                <option key={category._id}>{category.name}</option>
                            ))
                        }
                    </select>

                </div> */}

                <Button className="w-full cursor-pointer libertinus-serif-semibold" onClick={handleApplyFilters}>
                    Apply Filters
                </Button>

            </div>

        </div>

    );
};

export default FilterSidebar;