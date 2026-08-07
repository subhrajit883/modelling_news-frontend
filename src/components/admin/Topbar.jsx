import React from 'react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';

const Topbar = ({ toggleSidebar }) => {
    return (
        <header className="flex items-center justify-between h-16 px-6 bg-[#1A1C23] border-b border-gray-800 z-10 shrink-0">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-400 hover:text-white focus:outline-none focus:text-white transition-colors"
                >
                    <FiMenu className="text-2xl" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="flex items-center cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white mr-3 overflow-hidden">
                        {/* Placeholder for User Avatar */}
                        <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <div className="hidden md:flex md:flex-col md:items-start md:justify-center mr-2">
                        <span className="text-sm font-semibold text-white group-hover:text-gray-200 transition-colors">Admin</span>
                        {/* <span className="text-xs text-gray-400">Super Admin</span> */}
                    </div>
                    <FiChevronDown className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
            </div>
        </header>
    );
};

export default Topbar;
