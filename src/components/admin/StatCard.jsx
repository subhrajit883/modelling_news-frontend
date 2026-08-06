import React from 'react';

const StatCard = ({ icon, value, label, actionText, onClickAction }) => {
    return (
        <div className="bg-white py-3 px-5 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-1">
                <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
                    <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
                </div>
                <div className=" bg-red-50 text-red-600 rounded-lg">
                    {icon}
                </div>
            </div>
            {/* {actionText && (
                <button 
                    onClick={onClickAction}
                    className="text-sm text-gray-500 hover:text-red-600 transition-colors text-left"
                >
                    {actionText}
                </button>
            )} */}
        </div>
    );
};

export default StatCard;
