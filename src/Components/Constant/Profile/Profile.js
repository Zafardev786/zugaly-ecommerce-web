import React from 'react';
import Image from 'next/image';

const Profile = ({ name, image, email, username, mobile, address, postalCode, investments, amount, inactiveInvestments, activeInvestments, totalAmount, profitAmount, interestRate }) => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <h3>{name}</h3>
            </div>
            <div className="profile-avatar">
                <Image src={image} alt='Investor' />
            </div>

            <div className="profile-item">
                <div className="profile-left">
                    <h3>Personal Details</h3>
                    <div className="profile-data">
                        <p className="profile-date">{name}</p>
                        <p className="profile-date">{username}</p>
                        <p className="profile-amount">{email}</p>
                        <p className="profile-date">{mobile}</p>
                        <p className="profile-date">{address}</p>
                        <p className="profile-date">{postalCode}</p>
                    </div>
                </div>
                <div className="profile-right">
                    <h3>Loan Details</h3>
                    <div>
                        <p className="profile-amount">Investment amount: ${amount}</p>
                        <p className="profile-amount">Total amount: ${totalAmount}</p>
                        <p className="profile-amount">Profit amount: ${profitAmount}</p>
                        <p className="profile-amount">Interest rate: {interestRate}%</p>
                        <p className="profile-amount">Number of active investments: {activeInvestments}</p>
                        <p className="profile-amount">Number of inactive investments: {inactiveInvestments}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
