import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import {
    FiHome,
    FiFileText,
    FiPlusSquare,
    FiTag,
    FiGlobe,
    FiCalendar,
    FiImage,
    FiUsers,
    FiSettings,
    FiLogOut
} from 'react-icons/fi';

import logo from "../../assets/MODELLING (2).png";


const Sidebar = ({ isOpen }) => {
    const navItems = [
        { title: 'CONTENT' },
        { name: 'Dashboard', path: '/admin', icon: <FiHome />, isExact: true },
        { name: 'News Posts', path: '/admin/news', icon: <FiFileText /> },
        { name: 'Add New Post', path: '/admin', icon: <FiPlusSquare /> },
        { name: 'Categories', path: '/admin', icon: <FiTag /> },
        { name: 'Countries', path: '/admin', icon: <FiGlobe /> },
        { name: 'Years', path: '/admin', icon: <FiCalendar /> },
        // { title: 'MEDIA' },
        // { name: 'Media Library', path: '/admin', icon: <FiImage /> },
        { title: 'USERS & SETTINGS' },
        { name: 'Users', path: '/admin', icon: <FiUsers /> },
        { name: 'Settings', path: '/admin', icon: <FiSettings /> },
    ];

    const logout = () => {
        localStorage.removeItem('token');
        Navigate('/');
    };

    return (
        <aside className={`${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out bg-[#1A1C23] text-gray-300 h-full flex flex-col overflow-hidden shadow-xl z-20`}>
            <div className="flex items-center justify-center h-16 bg-[#15171C] border-b border-gray-800 shrink-0 px-4">
               <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>

            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                <nav className="space-y-1">
                    {navItems.map((item, index) => {
                        if (item.title) {
                            return (
                                <div key={index} className="px-6 mt-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {item.title}
                                </div>
                            );
                        }
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.isExact}
                                className={({ isActive }) =>
                                    `flex items-center px-6 py-3 text-sm font-medium transition-colors ${isActive
                                        ? ' text-gray-500 border-l-4 border-white'
                                        : 'hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
                                    }`
                                }
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        );
                    })}

                </nav>
            </div>

            <div className="p-4 border-t border-gray-800 shrink-0">
                <button onClick={logout} className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                    <FiLogOut className="mr-3 text-lg" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
