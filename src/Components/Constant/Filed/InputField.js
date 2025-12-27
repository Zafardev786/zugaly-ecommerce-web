import React from "react";

const InputField = ({ label, inputdata, id, placeholder, Press, name, type, required }) => (
    <div className="mb-2">
        <label htmlFor={id} className="block text-gray-500 font-serif mb-1">
            {label}
        </label>
        {type === 'file' ? (
            <input
                id={id}
                name={name}
                type={type}
                onChange={Press}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={required}
            />
        ) : (
            <input
                id={id}
                name={name}
                type={type}
                value={inputdata}
                onChange={Press}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={required}
            />
        )}
    </div>
);

export default InputField;
