import { useState, useEffect } from "react";

const useLocalStorage = (storeName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  // Check if localStorage is available
  useEffect(() => {
    const checkSupport = () => {
      if (!window.localStorage) {
        console.warn("localStorage is not supported on this device.");
        setIsSupported(false);
      }
    };
    checkSupport();
  }, []);

  // Fetch data from localStorage
  const fetchDataFromLocalStorage = () => {
    if (!isSupported) return [];
    try {
      setLoading(true);
      const storedData = JSON.parse(localStorage.getItem(storeName)) || [];
      setData(storedData);
      setLoading(false);
      return storedData;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return [];
    }
  };

  // Save data to localStorage
  const saveDataToLocalStorage = (newData) => {
    if (!isSupported) return;
    try {
      const dataWithIds = newData.map((item, index) => ({
        ...item,
        id: item._id || item.id || `generated-id-${index}`,
      }));

      localStorage.setItem(storeName, JSON.stringify(dataWithIds));
      setData(dataWithIds);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete a record by ID
  const deleteById = (id) => {
    if (!isSupported) return;
    try {
      const updatedData = data.filter((item) => item.id !== id);
      localStorage.setItem(storeName, JSON.stringify(updatedData));
      setData(updatedData);
    } catch (error) {
      setError(error.message);
    }
  };

  // Update a record by ID
  const updateById = (id, updatedFields) => {
    if (!isSupported) return;
    try {
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      );
      localStorage.setItem(storeName, JSON.stringify(updatedData));
      setData(updatedData);
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    data,
    loading,
    error,
    isSupported, // Expose this for UI logic if needed
    fetchDataFromLocalStorage,
    saveDataToLocalStorage,
    deleteById,
    updateById,
  };
};

export default useLocalStorage;
