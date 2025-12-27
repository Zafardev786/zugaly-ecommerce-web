import React from "react";

const SelectBox = ({ label, selectedItem, id, onChange, options, placeholder, name }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label text-gray-700"> {/* Change to a lighter text color */}
        {label}
      </label>
      <select
        id={id}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600" // Lighter color for text
        value={selectedItem}
        onChange={onChange}
        name={name}
      >
        <option value="" className="text-gray-400">{placeholder}</option> {/* Placeholder in lighter gray */}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-600"> {/* Lighter color for options */}
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
