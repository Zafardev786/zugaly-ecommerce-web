import React from "react";
import Image from "next/image";

const ListCard = ({ image, status, Investment_amount, Investment_release, Investment_rate, Investment_time, name, email, centerGroup, address, mobile, amount, date, time, username, handleEdit }) => {
    return (

        <div className="transaction-item" onClick={handleEdit}>
            <div className="transaction-left">
                {
                    image ? (
                        <div className="transaction-avatar">
                            <Image src={image} alt={name} />
                        </div>
                    ) : null
                }


                <div className="transaction_data">
                    <p className="transaction-name">{name || Investment_time}</p>
                    <p className="transaction-date">{username || Investment_rate}</p>

                </div>
            </div>

            <div className="transaction">
                <p className="transaction-amount">{email || Investment_release}</p>
                <p className="transaction-amount">{mobile || status}</p>
            </div>



            {
                centerGroup && address ? (
                    <div className="transaction">
                        <p className="transaction-amount">Center Group: {centerGroup}</p>
                        <p className="transaction-date">{address}</p>
                    </div>
                ) : null
            }




            <div className="transaction">
                <p className="transaction-amount">${amount || Investment_amount}</p>
                <p className="transaction-amount">{date} {time}</p>

            </div>
        </div>
    );
};

export default ListCard;
