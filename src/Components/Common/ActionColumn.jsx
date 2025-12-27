import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

const ActionColumn = ({ row, handleEdit, handleDelete, handleView }) => {
  const [isVisible, setIsVisible] = useState(false); // State for toggle visibility

  const handleSwitchChange = () => {
    setIsVisible(prevState => !prevState); // Toggle the visibility
  };

  return (
    <div className="flex flex-col items-start">
      {/* Switch Button */}
      <label className="inline-flex items-center cursor-pointer">
        <span className="mr-2 text-gray-700">{isVisible ? "Actions Visible" : "Actions Hidden"}</span>
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={isVisible}
            onChange={handleSwitchChange}
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full shadow-inner"></div>
          <div
            className={`w-6 h-6 bg-blue-500 rounded-full absolute top-0 left-0 transition-all ${
              isVisible ? 'transform translate-x-6' : ''
            }`}
          ></div>
        </div>
      </label>

      {/* Action Buttons */}
      {isVisible && (
        <div className="flex space-x-4 mt-2">
          {/* Edit Button with Icon */}
          <button
            onClick={() => handleEdit(row)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center space-x-2"
          >
            <FaEdit /> {/* Edit Icon */}
          </button>

          {/* Delete Button with Icon */}
          <button
            onClick={() => handleDelete(row)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center space-x-2"
          >
            <FaTrashAlt /> {/* Delete Icon */}
          </button>

          {/* View Button with Icon */}
          <button
            onClick={() => handleView(row)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center space-x-2"
          >
            <FaEye /> {/* View Icon */}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionColumn;
