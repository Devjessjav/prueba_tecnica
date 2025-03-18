import React, { useState, useEffect } from 'react';
// styles
import styles from './style.module.css'

export default function Pagination({ dataSource, setCurrentData, pagesShow, itemsShow }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = itemsShow;
    const pagesToShow = pagesShow;
    const totalPages = Math.ceil(dataSource.length / itemsPerPage);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentData(dataSource.slice(startIndex, startIndex + itemsPerPage));
    }, [currentPage, dataSource, setCurrentData]);

    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const visiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    return (
        <div className="flex justify-end items-center mt-5 space-x-2">
            <button
                className={`w-8 h-8 flex justify-center items-center rounded-full border ${currentPage === 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white hover:bg-blue-100 text-gray-700'
                    }`}
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                </svg>
            </button>

            {startPage > 1 && (
                <>
                    <button
                        className={`w-8 h-8 flex justify-center items-center rounded-full border bg-white hover:bg-blue-100 text-gray-700`}
                        onClick={() => setCurrentPage(1)}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="w-8 h-8 flex justify-center items-center text-gray-500">...</span>}
                </>
            )}
            {visiblePages.map((page, index) => (
                <button
                    key={index}
                    className={`w-8 h-8 flex justify-center items-center rounded-full border ${currentPage === page ? styles.active_item_table : 'bg-white hover:bg-blue-100 text-gray-700'
                        }`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="w-8 h-8 flex justify-center items-center text-gray-500">...</span>}
                    <button
                        className={`w-8 h-8 flex justify-center items-center rounded-full border bg-white hover:bg-blue-100 text-gray-700`}
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}
            <button
                className={`w-8 h-8 flex justify-center items-center rounded-full border ${currentPage === totalPages
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white hover:bg-blue-100 text-gray-700'
                    }`}
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                </svg>
            </button>
        </div>
    );
}