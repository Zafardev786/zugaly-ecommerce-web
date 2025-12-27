import React, { useState } from "react";

function SearchBox({ searchTerm, setSearchTerm , title}) {

    return (
        <div className="flex justify-between">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className=" mb-4">
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBox