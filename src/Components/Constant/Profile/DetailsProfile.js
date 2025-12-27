import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { investordata } from '../../data/data';

const DetailsProfile = () => {
    const nav = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProfiles = investordata.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNavigate = () => {
        nav('/investor/Addinvestor');
    };

    return (
        <div className="profile-container">
           
            <div className="profile-item">
                <div className="active-investments">
                    <h3>Active Investment</h3>
                    <ol>
                        <li>
                            <span className="profile-amount">Investment amount: $2000</span>
                            <span className="profile-amount">Investment Duration: 2 years</span>
                            <span className="profile-amount">Interest rate: 20%</span>
                            <span className="profile-amount">Investment date: 10-05-2024</span>
                            <span className="profile-amount">Release date: 10-05-2025</span>
                        </li>
                        <li>
                            <span className="profile-amount">Investment amount: $2000</span>
                            <span className="profile-amount">Investment Duration: 2 years</span>
                            <span className="profile-amount">Interest rate: 20%</span>
                            <span className="profile-amount">Investment date: 10-05-2024</span>
                            <span className="profile-amount">Release date: 10-05-2025</span>
                        </li>
                    </ol>
                </div>
                <div className="inactive-investments">
                    <h3>Inactive Investment</h3>
                    <ol>
                        <li>
                            <span className="profile-amount">Investment amount: $2000</span>
                            <span className="profile-amount">Investment Duration: 2 years</span>
                            <span className="profile-amount">Interest rate: 20%</span>
                            <span className="profile-amount">Investment date: 10-05-2024</span>
                            <span className="profile-amount">Release date: 10-05-2025</span>
                        </li>
                        <li>
                            <span className="profile-amount">Investment amount: $2000</span>
                            <span className="profile-amount">Investment Duration: 2 years</span>
                            <span className="profile-amount">Interest rate: 20%</span>
                            <span className="profile-amount">Investment date: 10-05-2024</span>
                            <span className="profile-amount">Release date: 10-05-2025</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default DetailsProfile;
