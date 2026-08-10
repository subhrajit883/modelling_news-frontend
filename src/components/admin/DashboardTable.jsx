import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const DashboardTable = ({ title, columns, data, onAdd, onEdit, onDelete, addText }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {onAdd && addText && (
                    <button
                        onClick={onAdd}
                        className="bg-[#DC2626] hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center"
                    >
                        + {addText}
                    </button>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            {columns.map((col, index) => (
                                <th key={index} className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {col.header}
                                </th>
                            ))}
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="p-4 text-sm text-gray-700">
                                            {/* Render column value based on key or custom render function */}
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                    <td className="p-4 text-sm text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            {/* {onEdit && (
                                                <button onClick={() => onEdit(row)} className="p-2 text-gray-500 hover:text-blue-600 border border-gray-200 rounded hover:border-blue-600 transition-colors">
                                                    <FiEdit2 size={14} />
                                                </button>
                                            )} */}
                                            {onDelete && (
                                                <button onClick={() => onDelete(row)} className="p-2 text-gray-500 hover:text-red-600 border border-gray-200 rounded hover:border-red-600 transition-colors">
                                                    <FiTrash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="p-8 text-center text-gray-500 text-sm">
                                    No data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* <div className="p-4 border-t border-gray-100 text-center">
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    View all {title.toLowerCase()} &rarr;
                </button>
            </div> */}
        </div>
    );
};

export default DashboardTable;
