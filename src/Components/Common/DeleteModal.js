"use client";

import React from "react";
import NotificationModal from "../Constant/NotificationModal/NotificationModal";

const DeleteModal = ({ isVisible, onClose, onDelete, title, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title || "Confirm Delete"}</h2>
        <p className="text-gray-600 mb-6">{message || "Are you sure you want to delete this item? This action cannot be undone."}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onDelete} // Call the onDelete function
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
