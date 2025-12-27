import { useState, useEffect } from "react";
import { openDB } from "idb";

const useIndexedDB = (dbName, storeName, version = 2) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSupported, setIsSupported] = useState(true);

    // Check if IndexedDB is available (disable on mobile)
 

    // Open the IndexedDB
    const openDatabase = async () => {
        if (!isSupported) return null;
        return openDB(dbName, version, {
            upgrade(db, oldVersion, newVersion) {
                if (oldVersion < version) {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, { keyPath: "id" });
                    }
                }
            },
        });
    };

    // Function to fetch data from IndexedDB
    const fetchDataFromDB = async () => {
        if (!isSupported) return [];
        try {
            setLoading(true);
            const db = await openDatabase();
            if (!db) return [];
            const storedData = await db.getAll(storeName);
            setData(storedData);
            setLoading(false);
            return storedData;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return [];
        }
    };

    // Function to save data to IndexedDB
    const saveDataToDB = async (newData) => {
        if (!isSupported) return;
        try {
            const db = await openDatabase();
            if (!db) return;

            const dataWithIds = newData.map((item, index) => ({
                ...item,
                id: item._id || item.id || `generated-id-${index}`,
            }));

            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);

            for (const item of dataWithIds) {
                const existingItem = await store.get(item.id);
                if (!existingItem) {
                    await store.put(item);
                } else {
                    await store.put({ ...existingItem, ...item });
                }
            }

            await tx.done;
            setData(dataWithIds);
        } catch (error) {
            setError(error.message);
        }
    };

    // Function to delete a record by ID
    const deleteById = async (id) => {
        if (!isSupported) return;
        try {
            const db = await openDatabase();
            if (!db) return;
            await db.delete(storeName, id);
            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    // Function to update a record by ID
    const updateById = async (id, updatedFields) => {
        if (!isSupported) return;
        try {
            const db = await openDatabase();
            if (!db) return;
            const existingItem = await db.get(storeName, id);
            if (!existingItem) throw new Error("Item not found in IndexedDB.");

            const updatedItem = { ...existingItem, ...updatedFields };
            await db.put(storeName, updatedItem);

            setData((prevData) =>
                prevData.map((item) => (item.id === id ? updatedItem : item))
            );
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        data,
        loading,
        error,
        isSupported, // Expose this for UI logic if needed
        fetchDataFromDB,
        saveDataToDB,
        deleteById,
        updateById,
    };
};

export default useIndexedDB;
