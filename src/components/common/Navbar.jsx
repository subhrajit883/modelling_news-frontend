import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { categoryUrl } from "../../../config/config";
import axios from "axios";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(categoryUrl.getAll);
            setCategories(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-black text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold uppercase md:text-3xl"
                >
                    Modelling News
                </Link>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-8 lg:flex playfair-display-regular tracking-wider">
                    {categories.map((category) => (
                        <Link
                            key={category._id}
                            to={`/category/${category.slug}`}
                            className="transition hover:text-red-500"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {/* Search */}
                    <div className="hidden md:block">
                        <SearchBar />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-3xl lg:hidden"
                    >
                        {isMenuOpen ? (
                            <HiOutlineX />
                        ) : (
                            <HiOutlineMenuAlt3 />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden bg-zinc-950 transition-all duration-300 lg:hidden ${isMenuOpen ? "max-h-[600px]" : "max-h-0"
                    }`}
            >
                <div className="border-t border-zinc-800 px-5 py-4">

                    {/* Search */}
                    <div className="mb-5 md:hidden">
                        <SearchBar />
                    </div>

                    <div className="flex flex-col">
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                to={`/category/${category.slug}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="border-b border-zinc-800 py-4 text-lg transition hover:text-red-500 libertinus-serif-regular"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;