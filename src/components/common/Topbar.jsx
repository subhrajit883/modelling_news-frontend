import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Topbar = () => {

    const date = new Date().toDateString();

    return (
        <div className="bg-red-600 text-white">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2">

                <p>{date}</p>
                <div className="flex gap-4">

                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </div>
                {/* <div className="flex gap-4">

                    <FaFacebookF />

                    <FaInstagram />

                    <FaTwitter />

                    <FaYoutube />

                </div> */}

            </div>

        </div>
    );
};

export default Topbar;