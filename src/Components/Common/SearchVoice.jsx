"use client";

import { useState, useEffect } from 'react';


import SearchBox from './VoiceSearchBox/SearchBox';
import VoiceSearch from './VoiceSearchBox/VoiceSearch';

const SearchVoice = ({ searchActive, setActive }) => {
    const [searchQuery, setSearchQuery] = useState("");
   
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === "") {

            setActive(false)
        } else {
            setActive(true)

        }
    };

    console.log("searchActivesearchActivesearchActive", searchActive)


    return (
        <div className={`relative w-full sm:w-auto sm:block`}>

            <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
            />
            <VoiceSearch
                setSearchQuery={setSearchQuery}

            />


        </div>
    );
};

export default SearchVoice;
