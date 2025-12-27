import Image from "next/image";
import React from "react";
import Link from "next/link";

const SearchBox = ({ searchQuery, handleSearch }) => {
    return (
        <div className="flex items-center space-x-2">
            <input
                type="text"
                className="pl-5 pr-10 py-2 w-full border rounded-[30px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-[16px]"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
            />
            <Link href="/vender-pannel/profile-setting" passHref>
                <Image
                    src={`https://res.cloudinary.com/dybuoihqn/image/upload/v1742781287/uploads/naolg8scswrs11ppudlr.jpg`}
                    alt="Profile"
                    width={30}
                    height={30}
                    className="w-8 h-8 rounded-full object-cover"
                    priority // Optional: if this image is above the fold
                />
            </Link>
        </div>
    );
};

export default SearchBox;