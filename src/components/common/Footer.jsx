import { useEffect, useState } from "react";
import axios from "axios";
import { categoryUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import logo from "../../assets/MODELLING (2).png"
const Footer = () => {
    const [categories, setCategories] = useState([]);

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
        <footer className="mt-16 bg-black text-white">

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

                    {/* Left - About */}
                    <div>
                        {/* <h2 className="mb-5 text-3xl font-bold tracking-tight playfair-display-regular">
                            Modelling<span className="text-red-600">News</span>
                        </h2> */}
                        <img src={logo} alt="logo image" className="h-20 w-full object-contain" />

                        <p className="max-w-md text-sm leading-7 text-gray-400">
                            Modelling News brings you the latest stories,
                            trends, people and developments from the world
                            of modelling and fashion.
                        </p>
                        {/* 
                        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gray-600">
                            Fashion • People • Culture • Industry
                        </p> */}
                    </div>

                    {/* Center - Categories */}
                    <div>
                        <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white playfair-display-regular">
                            Categories
                        </h3>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                            {categories.map((category) => (
                                <Link
                                    key={category._id}
                                    to={`/category/${category.slug}`}
                                    className="group text-sm manrope-regular text-gray-400 transition-colors duration-300 hover:text-red-600"
                                >
                                    <span className="mr-2 text-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        —
                                    </span>

                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right - Contact */}
                    <div>
                        <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white playfair-display-regular">
                            Contact
                        </h3>

                        <div className="space-y-5">

                            {/* Email */}
                            <div>
                                <a
                                    href="mailto:subhrajit.sportiqofitness@gmail.com"
                                    className="text-md text-gray-400 transition-colors duration-300 hover:text-red-600"
                                >
                                    <span className="flex items-center gap-3"><IoMdMail size={20} /> subhrajit.sportiqofitness@gmail.com</span>
                                </a>
                            </div>

                            {/* Phone */}
                            <div>


                                <a
                                    href="tel:+919903400656"
                                    className="text-md text-gray-400 transition-colors duration-300 hover:text-red-600"
                                >
                                    <span className="flex items-center gap-3"><FaPhoneAlt size={20} />  +91 9903400656</span>
                                </a>
                            </div>

                            {/* Address */}
                            <div>

                                <span className="flex items-center gap-3 text-gray-400 ">
                                    <FaLocationDot size={20} />Atghara, Chinar Park, Kolkata, West Bengal,

                                    India
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-10 h-px bg-white/10 text-gray-400 " />

                {/* Bottom */}
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">

                    <p>
                        © 2026 Modelling News. All Rights Reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link
                            to="/about"
                            className="transition-colors hover:text-white"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="transition-colors hover:text-white"
                        >
                            Contact
                        </Link>

                        {/* <a
                            href="/privacy-policy"
                            className="transition-colors hover:text-white"
                        >
                            Privacy Policy
                        </a> */}
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;