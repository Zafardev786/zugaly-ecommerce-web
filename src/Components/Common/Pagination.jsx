import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null; // Hide pagination if there's only one page

    const MAX_VISIBLE_PAGES = 5; // Maximum number of visible page numbers

    const getPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
        let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

        if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
            startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (startPage > 1) {
            if (startPage > 2) {
                pages.unshift('...');
            }
            pages.unshift(1);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex justify-end mt-4">
            <div className="flex space-x-2">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-sm border rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-blue-100'} text-gray-600`}
                >
                    &laquo; Prev
                </button>

                {/* Page Numbers */}
                {pageNumbers.map((number, index) => (
                    <button
                        key={index}
                        onClick={() => typeof number === 'number' && onPageChange(number)}
                        disabled={number === '...'}
                        className={`px-3 py-1 text-sm border rounded ${
                            currentPage === number
                                ? 'bg-blue-500 text-white'
                                : number === '...'
                                ? 'bg-transparent cursor-default'
                                : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                        }`}
                    >
                        {number}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 text-sm border rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-blue-100'} text-gray-600`}
                >
                    Next &raquo;
                </button>
            </div>
        </div>
    );
};

export default Pagination;