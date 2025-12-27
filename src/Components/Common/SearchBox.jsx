import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ searchQuery, handleSearch }) => {
    return (
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-2 w-full md:w-64">
            <input
                type="text"
                className="bg-transparent outline-none px-4 w-full text-gray-600 dark:text-gray-200"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
            />
            {/* <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300" /> */}
        </div>
    );
};

export default SearchBox;

