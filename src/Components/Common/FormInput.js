import Image from "next/image";
import { useState } from "react";

const FormInput = ({
    label,
    name,
    value = [],
    error,
    onChange,
    required,
    placeholder,
    type = "text",
    options = [],
    isActive = true,
    disabled = false,
    multiSelect = false, // Multi-select enable/disable control
    handleFileChange, // Function to handle file input changes
    imagePreview = [], // Ensure imagePreview is always an array
    handleDeleteImage, // Function to handle image deletion
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    if (!isActive) return null;

    const handleCheckboxChange = (optionValue) => {
        let newValue = Array.isArray(value) ? [...value] : [];
        if (newValue.includes(optionValue)) {
            newValue = newValue.filter(item => item !== optionValue);
        } else {
            newValue.push(optionValue);
        }
        onChange({ target: { name, value: newValue } });
    };

    return (
        <div className="w-full relative">
            <label className="block text-gray-500 font-serif mb-1" htmlFor={name}>
                {label}
            </label>

            {type === "select" ? (
                multiSelect ? (
                    <div className="relative">
                        <div
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer bg-white"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            {value.length > 0 ? `${value.length} selected` : placeholder}
                        </div>

                        {showDropdown && (
                            <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-auto">
                                {options.map((option, i) => (
                                    <label
                                        key={i}
                                        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={value.includes(option.value || option)}
                                            onChange={() => {
                                                handleCheckboxChange(option.value || option);
                                                setShowDropdown(false); // Close dropdown after selection
                                            }}
                                        />
                                        {option.label || option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <select
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">{placeholder}</option>
                        {options.map((option, i) => (
                            <option key={i} value={option.value || option}>
                                {option.label || option}
                            </option>
                        ))}
                    </select>
                )
            ) : type === "file" ? (
                <>
                    <input
                        type="file"
                        id={name}
                        name={name}
                        onChange={handleFileChange} // Use the handleFileChange function
                        required={required}
                        disabled={disabled}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {Array.isArray(imagePreview) && imagePreview.length > 0 && (
                        <div className="flex mt-2 flex-wrap gap-2">
                            {imagePreview.map((preview, index) => (
                                <div key={index} className="relative">
                                    <Image
                                        width={200}
                                        height={200}
                                        src={preview}
                                        alt={`Attachment ${index + 1}`}
                                        className="rounded-md"
                                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(index)} // Call handleDeleteImage with the index
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        style={{ transform: "translate(50%, -50%)" }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    required={required}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                />
            )}

            
               {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
};

export default FormInput;