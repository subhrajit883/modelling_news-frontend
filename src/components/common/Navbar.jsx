import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { categoryUrl } from "../../../config/config";
import axios from "axios";

const Navbar = () => {

    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        try {
            const res = await axios.get(categoryUrl.getAll);
            console.log(res.data);
            setCategories(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <nav className="bg-black text-white">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

                <Link
                    to="/"
                    className="text-3xl font-bold uppercase"
                >
                    Modelling News
                </Link>

                <div className="hidden gap-8 lg:flex">

                    {
                        categories.map((category) => (
                            <Link key={category._id} to={`/category/${category.slug}`}>
                                {category.name}
                            </Link>
                        ))
                    }


                </div>
                <div>
                    <SearchBar />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;