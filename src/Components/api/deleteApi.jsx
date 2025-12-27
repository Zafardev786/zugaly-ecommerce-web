import { useState } from 'react';
import axios from 'axios';
import { IP } from './Contant';

// Function to make the delete API call
const deleteApi = async ({ endpoint, setData, setError, setLoading }) => {
    try {
        setLoading(true);
        const token = localStorage.getItem("user");
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = token;
        }

        const url = `${IP}/${endpoint}`;

        const response = await axios.delete(url, { headers });
        setData(response.data); // Set the response data
    } catch (error) {
        setError(error.message); // Handle errors
    } finally {
        setLoading(false); // End loading
    }
};

// Custom hook for using deleteApi
const useDeleteApi = ({ endpoint, id, setError, setLoading,setData ,setSuccess}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const triggerDelete = async () => {
        if (!id) {
            console.error("ID is required for deletion");
            return;
        }
        setIsDeleting(true);
        await deleteApi({
            endpoint: `${endpoint}/${id}`,
            setData,
            setError,
            setLoading
        });
        setIsDeleting(false);
        // setSuccess(true)
    };

    return { triggerDelete, isDeleting ,setSuccess };
};

export { useDeleteApi };
