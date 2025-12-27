import React, { useState } from 'react';
import { useApi } from '../../../api/getApi/getApi'; // Ensure this import path is correct
import { AddModal } from './AddModal';
import Tablecard from '../../layouts/Table/Tablecard';
import { useDeleteApi } from '../../../api/deleteApi';

const ListPolling = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedData, setSelectedData] = useState([]);
    const [toggle, setToggle] = useState([]);
    const [success, setSuccess] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);  // Current page state
    const [totalItems, setTotalItems] = useState(0);    // Total number of items
    const itemsPerPage = 10;

    // Ensure currentPage is included in params for API request
    const params = {
        limit: itemsPerPage,
        page: currentPage
    };

    // Fetch data
    useApi({
        endpoint: 'admin/get-polling-stations',
        params: params,  // Pass the dynamic params object
        setData: (response) => {
            setUserList(response?.data || []);
            setTotalItems(response?.total || 0); // Assuming the API returns the total count
        },
        setError,
        currentPage,
        setLoading,
        success,
        deleteItem,
    });

    // Handle delete
    useDeleteApi({
        endpoint: 'admin/delete-polling-stations',
        id: deleteItem?._id,
        setData: (response) => {
            console.log("Delete successful:", response);
            setUserList((prevData) => prevData.filter(item => item._id !== deleteItem._id));
            setDeleteItem(null);
        },
        setError,
        setLoading,
        success,
    });

    const handlePageClick = (page) => {
        setCurrentPage(page); // Update the current page
    };

    const columns = [
        'Polling Station Name',
        'Polling Station Code',
        'Area Name',
        'Area Code',
        'Voting Date',
        'Election Name',
        'Election Year',
        'Created At',
        'Actions'
    ];

    return (
        <div className="col-10 auto" id="dashboard-container">
            <div className="col-12 container spacebtw row">
                <div className="area col-9 start row">
                    {loading ? (
                        <div className="spinner"></div>
                    ) : error ? (
                        <p className="error-message">Error: {error}</p>
                    ) : (
                        <Tablecard
                            data={userList}
                            title="Polling List"
                            openBtn="Create Polling"
                            columns={columns}
                            setSelecteddata={setSelectedData}
                            setToogle={setToggle}
                            setDeleteItem={setDeleteItem}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageClick={handlePageClick}
                        />
                    )}
                    <AddModal
                        name="create admin"
                        state="closed"
                        initialData={selectedData}
                        setSuccess={setSuccess}
                        toggle={toggle}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListPolling;
